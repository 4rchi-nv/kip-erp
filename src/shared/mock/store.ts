import { computeInventoryStatus } from "#/entities/warehouse";
import type {
	CashOperation,
	Employee,
	Equipment,
	InventoryItem,
	Project,
	ReportDefinition,
	ServiceRequest,
	SystemUser,
} from "#/types";
import {
	createActivityItem,
	createSeedDatabase,
	prependActivity,
	refreshDashboard,
} from "./database";
import { createMockId, MOCK_DATABASE_STORAGE_KEY } from "./helpers";
import type { MockCertificateRecord, MockDatabase } from "./types";

type StoreListener = () => void;

let memoryStore: MockDatabase | null = null;
const listeners = new Set<StoreListener>();

function isClient(): boolean {
	return typeof window !== "undefined";
}

function loadFromStorage(): MockDatabase | null {
	if (!isClient()) {
		return null;
	}

	try {
		const raw = localStorage.getItem(MOCK_DATABASE_STORAGE_KEY);
		if (!raw) {
			return null;
		}
		const parsed = JSON.parse(raw) as Partial<MockDatabase>;
		// Backfill collections added after the stored snapshot was created so that
		// older persisted databases stay compatible with new modules.
		return { ...createSeedDatabase(), ...parsed } as MockDatabase;
	} catch {
		return null;
	}
}

function persist(database: MockDatabase): void {
	if (!isClient()) {
		return;
	}

	localStorage.setItem(MOCK_DATABASE_STORAGE_KEY, JSON.stringify(database));
}

function commit(database: MockDatabase): void {
	memoryStore = database;
	persist(database);

	for (const listener of listeners) {
		listener();
	}
}

function mutate(mutator: (database: MockDatabase) => void): MockDatabase {
	const database = structuredClone(getMockDatabase());
	mutator(database);
	commit(database);
	return database;
}

export function getMockDatabase(): MockDatabase {
	if (!memoryStore) {
		memoryStore = loadFromStorage() ?? createSeedDatabase();
	}

	return memoryStore;
}

export function subscribeMockDatabase(listener: StoreListener): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function resetMockDatabase(): void {
	if (isClient()) {
		localStorage.removeItem(MOCK_DATABASE_STORAGE_KEY);
	}

	commit(createSeedDatabase());
}

export const mockStore = {
	// Transactions
	createTransaction(payload: Omit<CashOperation, "id">): CashOperation {
		const operation: CashOperation = { id: createMockId("op"), ...payload };
		mutate((database) => {
			database.transactions = [operation, ...database.transactions];
			const label = payload.type === "income" ? "поступление" : "расход";
			prependActivity(
				database,
				`Добавлена кассовая операция: ${label} ${payload.amount.toLocaleString("en-TM", {
					style: "currency",
					currency: "TMT",
				})} TMT`,
				"Финансы",
			);
			refreshDashboard(database);
		});
		return operation;
	},

	updateTransaction(id: string, payload: Partial<Omit<CashOperation, "id">>): CashOperation {
		let updated!: CashOperation;
		mutate((database) => {
			database.transactions = database.transactions.map((operation) => {
				if (operation.id !== id) {
					return operation;
				}
				updated = { ...operation, ...payload };
				return updated;
			});
			prependActivity(database, "Обновлена кассовая операция", "Финансы");
			refreshDashboard(database);
		});
		return updated;
	},

	deleteTransaction(id: string): void {
		mutate((database) => {
			database.transactions = database.transactions.filter((operation) => operation.id !== id);
			prependActivity(database, "Удалена кассовая операция", "Финансы");
			refreshDashboard(database);
		});
	},

	// Inventory
	createInventoryItem(payload: Omit<InventoryItem, "id" | "status">): InventoryItem {
		const status = computeInventoryStatus(payload.quantity, payload.minQuantity);
		const item: InventoryItem = { id: createMockId("inv"), ...payload, status };
		mutate((database) => {
			database.inventory = [item, ...database.inventory];
			prependActivity(database, `Добавлена складская позиция: «${payload.name}»`, "Склад");
			refreshDashboard(database);
		});
		return item;
	},

	updateInventoryItem(id: string, payload: Partial<Omit<InventoryItem, "id">>): InventoryItem {
		let updated!: InventoryItem;
		mutate((database) => {
			database.inventory = database.inventory.map((item) => {
				if (item.id !== id) {
					return item;
				}
				const merged = { ...item, ...payload };
				merged.status = computeInventoryStatus(merged.quantity, merged.minQuantity);
				updated = merged;
				return updated;
			});
			prependActivity(database, `Обновлена складская позиция: «${updated.name}»`, "Склад");
			refreshDashboard(database);
		});
		return updated;
	},

	deleteInventoryItem(id: string): void {
		mutate((database) => {
			const item = database.inventory.find((entry) => entry.id === id);
			database.inventory = database.inventory.filter((entry) => entry.id !== id);
			prependActivity(
				database,
				`Удалена складская позиция${item ? `: «${item.name}»` : ""}`,
				"Склад",
			);
			refreshDashboard(database);
		});
	},

	moveInventoryStock(id: string, delta: number): InventoryItem | null {
		let updated: InventoryItem | null = null;
		mutate((database) => {
			database.inventory = database.inventory.map((item) => {
				if (item.id !== id) {
					return item;
				}
				const quantity = Math.max(0, item.quantity + delta);
				const status = computeInventoryStatus(quantity, item.minQuantity);
				updated = { ...item, quantity, status };
				return updated;
			});

			if (updated) {
				const direction = delta > 0 ? "Приход" : "Расход";
				prependActivity(
					database,
					`${direction}: ${Math.abs(delta)} ${updated.unit} — «${updated.name}»`,
					"Склад",
				);
				refreshDashboard(database);
			}
		});
		return updated;
	},

	// Employees
	createEmployee(payload: Omit<Employee, "id">): Employee {
		const employee: Employee = { id: createMockId("emp"), ...payload };
		mutate((database) => {
			database.employees = [employee, ...database.employees];
			prependActivity(database, `Принят на работу новый сотрудник: ${employee.fullName}`, "HR");
			refreshDashboard(database);
		});
		return employee;
	},

	updateEmployee(id: string, payload: Partial<Omit<Employee, "id">>): Employee {
		let updated!: Employee;
		mutate((database) => {
			database.employees = database.employees.map((employee) => {
				if (employee.id !== id) {
					return employee;
				}
				updated = { ...employee, ...payload };
				return updated;
			});
			prependActivity(database, `Обновлены данные сотрудника: ${updated.fullName}`, "HR");
			refreshDashboard(database);
		});
		return updated;
	},

	deleteEmployee(id: string): void {
		mutate((database) => {
			const employee = database.employees.find((entry) => entry.id === id);
			database.employees = database.employees.filter((entry) => entry.id !== id);
			prependActivity(
				database,
				`Удалён сотрудник${employee ? `: ${employee.fullName}` : ""}`,
				"HR",
			);
			refreshDashboard(database);
		});
	},

	// Users
	createUser(payload: Omit<SystemUser, "id">): SystemUser {
		const user: SystemUser = { id: createMockId("u"), ...payload };
		mutate((database) => {
			database.users = [user, ...database.users];
			prependActivity(database, `Добавлен пользователь: ${user.name}`, "Пользователи");
		});
		return user;
	},

	updateUser(id: string, payload: Partial<Omit<SystemUser, "id">>): SystemUser {
		let updated!: SystemUser;
		mutate((database) => {
			database.users = database.users.map((user) => {
				if (user.id !== id) {
					return user;
				}
				updated = { ...user, ...payload };
				return updated;
			});
			prependActivity(database, `Обновлён пользователь: ${updated.name}`, "Пользователи");
		});
		return updated;
	},

	deleteUser(id: string): void {
		mutate((database) => {
			const user = database.users.find((entry) => entry.id === id);
			database.users = database.users.filter((entry) => entry.id !== id);
			prependActivity(
				database,
				`Удалён пользователь${user ? `: ${user.name}` : ""}`,
				"Пользователи",
			);
		});
	},

	// Reports
	createReport(payload: Omit<ReportDefinition, "id">): ReportDefinition {
		const report: ReportDefinition = { id: createMockId("rpt"), ...payload };
		mutate((database) => {
			database.reports = [report, ...database.reports];
			prependActivity(database, `Добавлен отчёт: «${report.title}»`, "Отчёты");
		});
		return report;
	},

	updateReport(id: string, payload: Partial<Omit<ReportDefinition, "id">>): ReportDefinition {
		let updated!: ReportDefinition;
		mutate((database) => {
			database.reports = database.reports.map((report) => {
				if (report.id !== id) {
					return report;
				}
				updated = { ...report, ...payload };
				return updated;
			});
			prependActivity(database, `Обновлён отчёт: «${updated.title}»`, "Отчёты");
		});
		return updated;
	},

	deleteReport(id: string): void {
		mutate((database) => {
			const report = database.reports.find((entry) => entry.id === id);
			database.reports = database.reports.filter((entry) => entry.id !== id);
			prependActivity(database, `Удалён отчёт${report ? `: «${report.title}»` : ""}`, "Отчёты");
		});
	},

	// Certificates
	createCertificate(
		payload: Omit<MockCertificateRecord, "id" | "status"> & {
			status?: MockCertificateRecord["status"];
		},
	): MockCertificateRecord {
		const certificate: MockCertificateRecord = {
			...payload,
			id: createMockId("cert"),
			status: payload.status ?? "issued",
		};
		mutate((database) => {
			database.certificates = [certificate, ...database.certificates];
			prependActivity(
				database,
				`Сформирован сертификат для ${certificate.employeeName}`,
				"Сертификаты",
			);
			refreshDashboard(database);
		});
		return certificate;
	},

	updateCertificate(
		id: string,
		payload: Partial<Omit<MockCertificateRecord, "id">>,
	): MockCertificateRecord {
		let updated!: MockCertificateRecord;
		mutate((database) => {
			database.certificates = database.certificates.map((certificate) => {
				if (certificate.id !== id) {
					return certificate;
				}
				updated = { ...certificate, ...payload };
				return updated;
			});
			prependActivity(database, `Обновлён сертификат для ${updated.employeeName}`, "Сертификаты");
			refreshDashboard(database);
		});
		return updated;
	},

	deleteCertificate(id: string): void {
		mutate((database) => {
			const certificate = database.certificates.find((entry) => entry.id === id);
			database.certificates = database.certificates.filter((entry) => entry.id !== id);
			prependActivity(
				database,
				`Удалён сертификат${certificate ? ` для ${certificate.employeeName}` : ""}`,
				"Сертификаты",
			);
			refreshDashboard(database);
		});
	},

	// Projects
	createProject(payload: Omit<Project, "id">): Project {
		const project: Project = { id: createMockId("prj"), ...payload };
		mutate((database) => {
			database.projects = [project, ...database.projects];
			prependActivity(database, `Добавлен проект: «${project.name}»`, "Проекты");
			refreshDashboard(database);
		});
		return project;
	},

	updateProject(id: string, payload: Partial<Omit<Project, "id">>): Project {
		let updated!: Project;
		mutate((database) => {
			database.projects = database.projects.map((project) => {
				if (project.id !== id) {
					return project;
				}
				updated = { ...project, ...payload };
				return updated;
			});
			prependActivity(database, `Обновлён проект: «${updated.name}»`, "Проекты");
			refreshDashboard(database);
		});
		return updated;
	},

	deleteProject(id: string): void {
		mutate((database) => {
			const project = database.projects.find((entry) => entry.id === id);
			database.projects = database.projects.filter((entry) => entry.id !== id);
			prependActivity(database, `Удалён проект${project ? `: «${project.name}»` : ""}`, "Проекты");
			refreshDashboard(database);
		});
	},

	// Equipment
	createEquipment(payload: Omit<Equipment, "id">): Equipment {
		const equipment: Equipment = { id: createMockId("eqp"), ...payload };
		mutate((database) => {
			database.equipment = [equipment, ...database.equipment];
			prependActivity(database, `Добавлено оборудование: «${equipment.name}»`, "Оборудование");
		});
		return equipment;
	},

	updateEquipment(id: string, payload: Partial<Omit<Equipment, "id">>): Equipment {
		let updated!: Equipment;
		mutate((database) => {
			database.equipment = database.equipment.map((equipment) => {
				if (equipment.id !== id) {
					return equipment;
				}
				updated = { ...equipment, ...payload };
				return updated;
			});
			prependActivity(database, `Обновлено оборудование: «${updated.name}»`, "Оборудование");
		});
		return updated;
	},

	deleteEquipment(id: string): void {
		mutate((database) => {
			const equipment = database.equipment.find((entry) => entry.id === id);
			database.equipment = database.equipment.filter((entry) => entry.id !== id);
			prependActivity(
				database,
				`Удалено оборудование${equipment ? `: «${equipment.name}»` : ""}`,
				"Оборудование",
			);
		});
	},

	// Service requests
	createServiceRequest(payload: Omit<ServiceRequest, "id">): ServiceRequest {
		const request: ServiceRequest = { id: createMockId("srv"), ...payload };
		mutate((database) => {
			database.serviceRequests = [request, ...database.serviceRequests];
			prependActivity(database, `Создана сервисная заявка: «${request.title}»`, "Сервис");
			refreshDashboard(database);
		});
		return request;
	},

	updateServiceRequest(id: string, payload: Partial<Omit<ServiceRequest, "id">>): ServiceRequest {
		let updated!: ServiceRequest;
		mutate((database) => {
			database.serviceRequests = database.serviceRequests.map((request) => {
				if (request.id !== id) {
					return request;
				}
				updated = { ...request, ...payload };
				return updated;
			});
			prependActivity(database, `Обновлена сервисная заявка: «${updated.title}»`, "Сервис");
			refreshDashboard(database);
		});
		return updated;
	},

	deleteServiceRequest(id: string): void {
		mutate((database) => {
			const request = database.serviceRequests.find((entry) => entry.id === id);
			database.serviceRequests = database.serviceRequests.filter((entry) => entry.id !== id);
			prependActivity(
				database,
				`Удалена сервисная заявка${request ? `: «${request.title}»` : ""}`,
				"Сервис",
			);
			refreshDashboard(database);
		});
	},

	// Notifications
	markNotificationRead(id: string): void {
		mutate((database) => {
			database.notifications = database.notifications.map((notification) =>
				notification.id === id ? { ...notification, read: true } : notification,
			);
		});
	},

	markAllNotificationsRead(): void {
		mutate((database) => {
			database.notifications = database.notifications.map((notification) => ({
				...notification,
				read: true,
			}));
		});
	},

	// Activity
	addActivity(description: string, module: string): void {
		mutate((database) => {
			prependActivity(database, description, module);
		});
	},
};

export { createActivityItem };
