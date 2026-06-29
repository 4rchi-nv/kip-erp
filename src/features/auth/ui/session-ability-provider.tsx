"use client";

import { useUnit } from "effector-react";
import type { ReactNode } from "react";
import { AbilityProvider } from "#/shared/lib";
import type { UserRole } from "#/types";
import { $session } from "../model/session";

type SessionAbilityProviderProps = {
	children: ReactNode;
	fallbackRole?: UserRole;
};

export function SessionAbilityProvider({
	children,
	fallbackRole = "director",
}: SessionAbilityProviderProps) {
	const session = useUnit($session);
	const role = session?.user.role ?? fallbackRole;

	return <AbilityProvider role={role}>{children}</AbilityProvider>;
}
