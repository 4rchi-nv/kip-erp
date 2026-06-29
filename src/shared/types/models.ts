import type {
	CertificateLanguage,
	CertificateType,
	EmploymentStatus,
	InventoryStatus,
	OperationType,
	UserRole,
	UserStatus,
} from "./enums";

export interface CurrentUser {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	avatarInitials: string;
}

export interface CashOperation {
	id: string;
	date: string;
	type: OperationType;
	amount: number;
	project: string;
	responsiblePerson: string;
	comment: string;
}

export interface InventoryItem {
	id: string;
	name: string;
	category: string;
	warehouse: string;
	quantity: number;
	unit: string;
	responsiblePerson: string;
	status: InventoryStatus;
	minQuantity: number;
}

export interface Employee {
	id: string;
	fullName: string;
	position: string;
	department: string;
	employmentStatus: EmploymentStatus;
	hireDate: string;
	phone: string;
	email: string;
	documents?: { name: string; date: string }[];
	vacations?: { from: string; to: string; days: number }[];
	contracts?: { number: string; type: string; date: string }[];
}

export interface SystemUser {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
}

export interface ActivityItem {
	id: string;
	timestamp: string;
	description: string;
	module: string;
}

export interface ReportDefinition {
	id: string;
	title: string;
	description: string;
	category: string;
}

export interface DashboardStats {
	activeProjects: number;
	monthlyRevenue: number;
	monthlyExpenses: number;
	warehouseStockValue: number;
	pendingCertificates: number;
	openMaintenanceTasks: number;
}

export interface ChartDataPoint {
	month: string;
	income: number;
	expenses: number;
}

export interface ProjectDataPoint {
	project: string;
	amount: number;
}

export interface RolePermission {
	role: UserRole;
	label: string;
	permissions: string[];
}

export type { CertificateLanguage, CertificateType };
