export function formatCurrency(value: number): string {
	return new Intl.NumberFormat("ru-RU", {
		style: "currency",
		currency: "TMT",
		maximumFractionDigits: 0,
	}).format(value);
}

export function formatDate(date: string): string {
	return new Intl.DateTimeFormat("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(new Date(date));
}

export function formatDateTime(date: string): string {
	return new Intl.DateTimeFormat("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(date));
}

export function generateId(prefix: string): string {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
