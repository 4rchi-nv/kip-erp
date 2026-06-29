"use client";

import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { paths } from "#/shared/routing";
import { Loader } from "#/shared/ui/loader";
import { $isAuthenticated, $isSessionHydrated } from "../model/session";

type AuthGuardProps = {
	children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
	const router = useRouter();
	const [isHydrated, isAuthenticated] = useUnit([$isSessionHydrated, $isAuthenticated]);

	useEffect(() => {
		if (isHydrated && !isAuthenticated) {
			router.replace(paths.auth);
		}
	}, [isAuthenticated, isHydrated, router]);

	if (!isHydrated) {
		return <Loader />;
	}

	if (!isAuthenticated) {
		return null;
	}

	return children;
}
