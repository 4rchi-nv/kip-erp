import type { CertificateLanguage, CertificateType } from "#/types";

export const certificateTypeLabels: Record<CertificateType, string> = {
	safety_training: "Обучение по охране труда",
	siemens_plc: "Обучение Siemens PLC",
	instrumentation_calibration: "Калибровка КИПиА",
	electrical_safety: "Электробезопасность",
	scada_hmi: "Обучение SCADA/HMI",
	site_access: "Допуск на объект",
};

export const certificateLanguageLabels: Record<CertificateLanguage, string> = {
	ru: "Русский",
	en: "English",
};

export const certificateTitles: Record<CertificateType, Record<CertificateLanguage, string>> = {
	safety_training: {
		ru: "СЕРТИФИКАТ ОБ ОБУЧЕНИИ ПО ОХРАНЕ ТРУДА",
		en: "OCCUPATIONAL SAFETY TRAINING CERTIFICATE",
	},
	siemens_plc: {
		ru: "СЕРТИФИКАТ ОБ ОБУЧЕНИИ SIEMENS PLC",
		en: "SIEMENS PLC TRAINING CERTIFICATE",
	},
	instrumentation_calibration: {
		ru: "СЕРТИФИКАТ КАЛИБРОВКИ СРЕДСТВ ИЗМЕРЕНИЯ",
		en: "INSTRUMENTATION CALIBRATION CERTIFICATE",
	},
	electrical_safety: {
		ru: "СЕРТИФИКАТ ПО ЭЛЕКТРОБЕЗОПАСНОСТИ",
		en: "ELECTRICAL SAFETY CERTIFICATE",
	},
	scada_hmi: {
		ru: "СЕРТИФИКАТ ОБУЧЕНИЯ SCADA/HMI",
		en: "SCADA/HMI TRAINING CERTIFICATE",
	},
	site_access: {
		ru: "ДОПУСК НА ПРОМЫШЛЕННЫЙ ОБЪЕКТ",
		en: "INDUSTRIAL SITE ACCESS CERTIFICATE",
	},
};
