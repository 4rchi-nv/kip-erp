import type {
	ActivityItem,
	CashOperation,
	CertificateLanguage,
	CertificateType,
	ChartDataPoint,
	DashboardStats,
	Employee,
	Equipment,
	InventoryItem,
	Project,
	ProjectDataPoint,
	ReportDefinition,
	RolePermission,
	ServiceRequest,
	SystemUser,
} from "#/types";

export interface MockNotification {
	id: string;
	title: string;
	message: string;
	module: string;
	timestamp: string;
	read: boolean;
}

export interface MockCertificateRecord {
	id: string;
	type: CertificateType;
	language: CertificateLanguage;
	employeeId: string;
	employeeName: string;
	issueDate: string;
	status: "draft" | "issued" | "sent";
}

export interface MockReferenceData {
	projects: string[];
	responsiblePersons: string[];
	warehouses: string[];
	categories: string[];
}

export interface MockDashboardData {
	stats: DashboardStats;
	monthlyChart: ChartDataPoint[];
	projectChart: ProjectDataPoint[];
	recentActivity: ActivityItem[];
}

export interface MockDatabase {
	transactions: CashOperation[];
	inventory: InventoryItem[];
	employees: Employee[];
	certificates: MockCertificateRecord[];
	reports: ReportDefinition[];
	users: SystemUser[];
	rolePermissions: RolePermission[];
	projects: Project[];
	equipment: Equipment[];
	serviceRequests: ServiceRequest[];
	dashboard: MockDashboardData;
	notifications: MockNotification[];
	reference: MockReferenceData;
}
