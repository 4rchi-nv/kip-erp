"use client";

import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { registerTokenGetter, registerUnauthorizedHandler } from "#/shared/api/auth";
import { isMockMode } from "#/shared/config";
import { paths } from "#/shared/routing";
import { $isSessionHydrated, $session, logout, sessionHydrated } from "../model/session";

export function SessionInit() {
	const router = useRouter();
	const isHydrated = useUnit($isSessionHydrated);
	const markHydrated = useUnit(sessionHydrated);
	const handleLogout = useUnit(logout);

	useEffect(() => {
		registerTokenGetter(() => $session.getState()?.token ?? null);
		registerUnauthorizedHandler(() => {
			handleLogout();
			router.replace(paths.auth);
		});
	}, [handleLogout, router]);

	useEffect(() => {
		if (!isHydrated) {
			markHydrated();
		}
	}, [isHydrated, markHydrated]);

	useEffect(() => {
		if (!isMockMode()) {
			return;
		}

		let unsubscribe: (() => void) | undefined;

		void import("#/shared/api/mock").then(({ mockAuthApi }) => {
			mockAuthApi.setSession($session.getState());
			unsubscribe = $session.watch((session) => {
				mockAuthApi.setSession(session);
			});
		});

		return () => {
			unsubscribe?.();
		};
	}, []);

	return null;
}
