export const paths = {
	home: "/",
	auth: "/auth",
	dashboard: "/dashboard",
	projects: "/projects",
	finance: "/finance",
	warehouse: "/warehouse",
	hr: "/hr",
	certificates: "/certificates",
	reports: "/reports",
	service: "/service",
	equipment: "/equipment",
	users: "/users",
} as const;

/** Routes rendered inside `src/app/(main)` with BaseLayout */
export const mainAppPaths = [
	paths.dashboard,
	paths.projects,
	paths.finance,
	paths.warehouse,
	paths.hr,
	paths.certificates,
	paths.reports,
	paths.service,
	paths.equipment,
	paths.users,
] as const;

export type AppPath = (typeof paths)[keyof typeof paths];
export type MainAppPath = (typeof mainAppPaths)[number];
