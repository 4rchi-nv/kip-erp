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
