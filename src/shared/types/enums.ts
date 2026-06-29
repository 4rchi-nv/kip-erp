export const USER_ROLES = [
	"admin",
	"director",
	"accountant",
	"hr_manager",
	"warehouse_manager",
	"project_manager",
	"engineer",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const USER_STATUSES = ["active", "inactive"] as const;

export type UserStatus = (typeof USER_STATUSES)[number];

export const OPERATION_TYPES = ["income", "expense"] as const;

export type OperationType = (typeof OPERATION_TYPES)[number];

export const EMPLOYMENT_STATUSES = ["active", "on_leave", "terminated"] as const;

export type EmploymentStatus = (typeof EMPLOYMENT_STATUSES)[number];

export const INVENTORY_STATUSES = ["in_stock", "low_stock", "out_of_stock"] as const;

export type InventoryStatus = (typeof INVENTORY_STATUSES)[number];

export const CERTIFICATE_TYPES = [
	"safety_training",
	"siemens_plc",
	"instrumentation_calibration",
	"electrical_safety",
	"scada_hmi",
	"site_access",
] as const;

export type CertificateType = (typeof CERTIFICATE_TYPES)[number];

export const CERTIFICATE_LANGUAGES = ["ru", "en"] as const;

export type CertificateLanguage = (typeof CERTIFICATE_LANGUAGES)[number];

export const PROJECT_STATUSES = ["planning", "in_progress", "on_hold", "completed"] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export const EQUIPMENT_STATUSES = [
	"operational",
	"maintenance",
	"repair",
	"decommissioned",
] as const;

export type EquipmentStatus = (typeof EQUIPMENT_STATUSES)[number];

export const SERVICE_STATUSES = ["new", "in_progress", "completed", "cancelled"] as const;

export type ServiceStatus = (typeof SERVICE_STATUSES)[number];

export const SERVICE_PRIORITIES = ["low", "medium", "high", "urgent"] as const;

export type ServicePriority = (typeof SERVICE_PRIORITIES)[number];

export const SERVICE_TYPES = [
	"installation",
	"commissioning",
	"maintenance",
	"calibration",
	"repair",
	"training",
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];
