import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupsIcon from "@mui/icons-material/Groups";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import type { Action, Subject } from "#/shared/lib";
import { paths } from "#/shared/routing";

type NavItem = {
	href: string;
	labelKey: string;
	Icon: typeof DashboardIcon;
	subject: Subject;
	action: Action;
};

export const navItems: NavItem[] = [
	{
		href: paths.dashboard,
		labelKey: "dashboard",
		Icon: DashboardIcon,
		subject: "dashboard",
		action: "read",
	},
	{
		href: paths.projects,
		labelKey: "projects",
		Icon: WorkOutlineOutlinedIcon,
		subject: "project",
		action: "read",
	},
	{
		href: paths.finance,
		labelKey: "finance",
		Icon: AccountBalanceWalletIcon,
		subject: "transaction",
		action: "read",
	},
	{
		href: paths.warehouse,
		labelKey: "warehouse",
		Icon: WarehouseIcon,
		subject: "inventory",
		action: "read",
	},
	{
		href: paths.equipment,
		labelKey: "equipment",
		Icon: PrecisionManufacturingOutlinedIcon,
		subject: "equipment",
		action: "read",
	},
	{
		href: paths.hr,
		labelKey: "hr",
		Icon: GroupsIcon,
		subject: "employee",
		action: "read",
	},
	{
		href: paths.certificates,
		labelKey: "certificates",
		Icon: DescriptionIcon,
		subject: "certificate",
		action: "read",
	},
	{
		href: paths.service,
		labelKey: "service",
		Icon: BuildCircleOutlinedIcon,
		subject: "service",
		action: "read",
	},
	{
		href: paths.reports,
		labelKey: "reports",
		Icon: AssessmentIcon,
		subject: "report",
		action: "read",
	},
	{
		href: paths.users,
		labelKey: "users",
		Icon: AdminPanelSettingsIcon,
		subject: "user",
		action: "read",
	},
];
