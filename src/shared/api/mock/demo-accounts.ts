import type { CurrentUser } from "#/types";

export const MOCK_AUTH_PASSWORD = "password";

export type MockDemoAccount = {
	label: string;
	email: string;
	role: CurrentUser["role"];
};

export const MOCK_DEMO_ACCOUNTS: MockDemoAccount[] = [
	{ label: "Admin", email: "admin@kip.tm", role: "admin" },
	{ label: "Director", email: "director@kip.tm", role: "director" },
	{ label: "Accountant", email: "accountant@kip.tm", role: "accountant" },
	{ label: "HR Manager", email: "hr@kip.tm", role: "hr_manager" },
	{ label: "Warehouse", email: "warehouse@kip.tm", role: "warehouse_manager" },
	{ label: "Engineer", email: "engineer@kip.tm", role: "engineer" },
];
