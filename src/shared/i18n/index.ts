import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { KIP_ERP_STORAGE_KEYS } from "#/shared/config";

const LANGUAGE_STORAGE_KEY = KIP_ERP_STORAGE_KEYS.language;

const resources = {
	ru: {
		common: {
			appName: "KIP Engineering ERP",
			appShortName: "KIP ERP",
			companyName: "KIP Engineering",
			appSubtitle: "Industrial Automation & ERP Platform",
			authTitle: "KIP Engineering ERP",
			authSubtitle:
				"Корпоративная ERP-система для управления проектами, складом, персоналом и отчётностью",
			signIn: "Войти в KIP Engineering ERP",
			modules: "Модули",
			version: "KIP Engineering ERP v0.1",
			platformTagline: "Industrial Automation & ERP Platform",
			notifications: "Уведомления",
			profile: "Профиль",
			settings: "Настройки",
			logout: "Выйти",
		},
		navigation: {
			dashboard: "Панель управления",
			finance: "Финансы",
			warehouse: "Склад",
			hr: "Сотрудники",
			certificates: "Сертификаты",
			reports: "Отчёты",
			users: "Пользователи",
			projects: "Проекты",
			service: "Сервис",
			equipment: "Оборудование",
		},
	},
	en: {
		common: {
			appName: "KIP Engineering ERP",
			appShortName: "KIP ERP",
			companyName: "KIP Engineering",
			appSubtitle: "Industrial Automation & ERP Platform",
			authTitle: "KIP Engineering ERP",
			authSubtitle:
				"Corporate ERP platform for projects, warehouse, HR and reporting",
			signIn: "Sign in to KIP Engineering ERP",
			modules: "Modules",
			version: "KIP Engineering ERP v0.1",
			platformTagline: "Industrial Automation & ERP Platform",
			notifications: "Notifications",
			profile: "Profile",
			settings: "Settings",
			logout: "Log out",
		},
		navigation: {
			dashboard: "Dashboard",
			finance: "Finance",
			warehouse: "Warehouse",
			hr: "Employees",
			certificates: "Certificates",
			reports: "Reports",
			users: "Users",
			projects: "Projects",
			service: "Service",
			equipment: "Equipment",
		},
	},
};

void i18n.use(initReactI18next).init({
	resources,
	lng:
		typeof window !== "undefined"
			? (localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? "ru")
			: "ru",
	fallbackLng: "ru",
	defaultNS: "common",
	interpolation: {
		escapeValue: false,
	},
});

export { i18n, LANGUAGE_STORAGE_KEY };
