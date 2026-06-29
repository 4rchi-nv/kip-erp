export const certificateStatusLabels = {
	draft: "Черновик",
	issued: "Выпущена",
	sent: "Отправлена",
} as const;

export const certificateStatusColors = {
	Черновик: { color: "#69788F", backgroundColor: "#F0F2F8" },
	Выпущена: { color: "#1B7A4E", backgroundColor: "#E8F5EE" },
	Отправлена: { color: "#1565C0", backgroundColor: "#E3F2FD" },
} as const;
