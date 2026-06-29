"use client";

import { createContext, type ReactNode, useContext } from "react";
import type { UserRole } from "#/types";

export type Action = "read" | "create" | "update" | "delete" | "all";
export type Subject =
	| "dashboard"
	| "transaction"
	| "inventory"
	| "employee"
	| "certificate"
	| "report"
	| "user"
	| "project"
	| "service"
	| "equipment";

const ROLE_PERMISSIONS: Record<UserRole, Record<Subject, Action[]>> = {
	admin: {
		dashboard: ["all"],
		transaction: ["all"],
		inventory: ["all"],
		employee: ["all"],
		certificate: ["all"],
		report: ["all"],
		user: ["all"],
		project: ["all"],
		service: ["all"],
		equipment: ["all"],
	},
	director: {
		dashboard: ["all"],
		transaction: ["read"],
		inventory: ["read"],
		employee: ["read"],
		certificate: ["read"],
		report: ["all"],
		user: ["read"],
		project: ["read"],
		service: ["read"],
		equipment: ["read"],
	},
	accountant: {
		dashboard: ["read"],
		transaction: ["all"],
		inventory: ["read"],
		employee: ["read"],
		certificate: ["read"],
		report: ["all"],
		user: [],
		project: ["read"],
		service: [],
		equipment: [],
	},
	hr_manager: {
		dashboard: ["read"],
		transaction: [],
		inventory: [],
		employee: ["all"],
		certificate: ["all"],
		report: ["read"],
		user: [],
		project: [],
		service: [],
		equipment: [],
	},
	warehouse_manager: {
		dashboard: ["read"],
		transaction: [],
		inventory: ["all"],
		employee: [],
		certificate: [],
		report: ["read"],
		user: [],
		project: ["read"],
		service: ["read"],
		equipment: ["all"],
	},
	project_manager: {
		dashboard: ["read"],
		transaction: ["read"],
		inventory: ["read"],
		employee: ["read"],
		certificate: ["read"],
		report: ["all"],
		user: [],
		project: ["all"],
		service: ["read"],
		equipment: ["read"],
	},
	engineer: {
		dashboard: ["read"],
		transaction: [],
		inventory: ["read"],
		employee: [],
		certificate: ["read"],
		report: ["read"],
		user: [],
		project: ["read"],
		service: ["read"],
		equipment: ["read"],
	},
};

interface AbilityContextValue {
	role: UserRole;
	can: (subject: Subject, action: Action) => boolean;
}

const AbilityContext = createContext<AbilityContextValue>({
	role: "director",
	can: () => true,
});

export function checkAbility(role: UserRole, subject: Subject, action: Action): boolean {
	const permissions = ROLE_PERMISSIONS[role]?.[subject] ?? [];
	return permissions.includes("all") || permissions.includes(action);
}

interface AbilityProviderProps {
	role: UserRole;
	children: ReactNode;
}

export function AbilityProvider({ role, children }: AbilityProviderProps) {
	const value: AbilityContextValue = {
		role,
		can: (subject, action) => checkAbility(role, subject, action),
	};

	return <AbilityContext.Provider value={value}>{children}</AbilityContext.Provider>;
}

export function useCan() {
	return useContext(AbilityContext);
}

interface CanProps {
	subject: Subject;
	action: Action;
	children: ReactNode;
	fallback?: ReactNode;
}

export function Can({ subject, action, children, fallback = null }: CanProps) {
	const { can } = useCan();
	return can(subject, action) ? children : fallback;
}
