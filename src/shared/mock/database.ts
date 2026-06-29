import type {
	ActivityItem,
	CashOperation,
	Employee,
	InventoryItem,
} from "#/types";
import { createMockId } from "./helpers";
import {
	seedCertificates,
	seedEmployees,
	seedInventory,
	seedMonthlyChart,
	seedNotifications,
	seedRecentActivity,
	seedReference,
	seedReports,
	seedRolePermissions,
	seedTransactions,
	seedUsers,
} from "./kip-seed";
import type {
	MockCertificateRecord,
	MockDashboardData,
	MockDatabase,
} from "./types";

const inventoryUnitValue: Record<string, number> = {
	"PLC / Контроллеры": 12_500,
	"HMI панели": 8_400,
	Датчики: 1_200,
	Преобразователи: 2_800,
	RFID: 3_600,
	"Сетевое оборудование": 4_500,
	Серверы: 18_000,
	"Кабельная продукция": 450,
	Электрощиты: 6_200,
	Запчасти: 350,
};

function sumByType(transactions: CashOperation[], type: CashOperation["type"]): number {
	return transactions
		.filter((operation) => operation.type === type)
		.reduce((sum, operation) => sum + operation.amount, 0);
}

function filterByMonth(
	transactions: CashOperation[],
	month: number,
	year: number,
): CashOperation[] {
	return transactions.filter((operation) => {
		const date = new Date(operation.date);
		return date.getMonth() === month && date.getFullYear() === year;
	});
}

export function computeProjectChart(transactions: CashOperation[]) {
	const totals = new Map<string, number>();

	for (const operation of transactions) {
		if (operation.type !== "income") {
			continue;
		}
		totals.set(operation.project, (totals.get(operation.project) ?? 0) + operation.amount);
	}

	return [...totals.entries()]
		.map(([project, amount]) => ({ project, amount }))
		.sort((left, right) => right.amount - left.amount);
}

export function computeDashboardStats(
	transactions: CashOperation[],
	inventory: InventoryItem[],
	_certificates: MockCertificateRecord[],
	notifications: { read: boolean }[],
): MockDashboardData["stats"] {
	const now = new Date();
	const monthTransactions = filterByMonth(transactions, now.getMonth(), now.getFullYear());

	const monthlyRevenue = sumByType(monthTransactions, "income");
	const monthlyExpenses = sumByType(monthTransactions, "expense");
	const activeProjects = new Set(
		transactions
			.map((operation) => operation.project)
			.filter((project) => project !== "Сервисное обслуживание" && project !== "Административные расходы"),
	).size;
	const warehouseStockValue = Math.round(
		inventory.reduce(
			(sum, item) => sum + item.quantity * (inventoryUnitValue[item.category] ?? 500),
			0,
		),
	);
	const pendingCertificates = _certificates.filter(
		(certificate) => certificate.status === "draft" || certificate.status === "issued",
	).length;
	const openMaintenanceTasks = notifications.filter((notification) => !notification.read).length;

	return {
		activeProjects,
		monthlyRevenue,
		monthlyExpenses,
		warehouseStockValue,
		pendingCertificates,
		openMaintenanceTasks,
	};
}

function buildDashboard(
	transactions: CashOperation[],
	inventory: InventoryItem[],
	employees: Employee[],
	certificates: MockCertificateRecord[],
	recentActivity: ActivityItem[],
	notifications: { read: boolean }[],
): MockDashboardData {
	return {
		stats: computeDashboardStats(transactions, inventory, certificates, notifications),
		monthlyChart: seedMonthlyChart,
		projectChart: computeProjectChart(transactions),
		recentActivity,
	};
}

export function createSeedDatabase(): MockDatabase {
	return {
		transactions: structuredClone(seedTransactions),
		inventory: structuredClone(seedInventory),
		employees: structuredClone(seedEmployees),
		certificates: structuredClone(seedCertificates),
		reports: structuredClone(seedReports),
		users: structuredClone(seedUsers),
		rolePermissions: structuredClone(seedRolePermissions),
		notifications: structuredClone(seedNotifications),
		reference: structuredClone(seedReference),
		dashboard: buildDashboard(
			seedTransactions,
			seedInventory,
			seedEmployees,
			seedCertificates,
			seedRecentActivity,
			seedNotifications,
		),
	};
}

export function createActivityItem(description: string, module: string): ActivityItem {
	return {
		id: createMockId("a"),
		timestamp: new Date().toISOString(),
		description,
		module,
	};
}

export function refreshDashboard(db: MockDatabase): void {
	db.dashboard = {
		...db.dashboard,
		stats: computeDashboardStats(
			db.transactions,
			db.inventory,
			db.certificates,
			db.notifications,
		),
		projectChart: computeProjectChart(db.transactions),
	};
}

export function prependActivity(db: MockDatabase, description: string, module: string): void {
	const activity = createActivityItem(description, module);
	db.dashboard.recentActivity = [activity, ...db.dashboard.recentActivity].slice(0, 20);
}

export {
	seedCategories,
	seedProjects,
	seedResponsiblePersons,
	seedWarehouses,
} from "./kip-seed";
