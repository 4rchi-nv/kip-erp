"use client";

import { Chip } from "@mui/material";

export type StatusChipColor = {
	color: string;
	backgroundColor: string;
};

export type StatusChipProps = {
	status: string;
	colorMap: Record<string, StatusChipColor>;
	fallback?: StatusChipColor;
};

const defaultFallback: StatusChipColor = {
	color: "#69788F",
	backgroundColor: "#F0F2F8",
};

export function StatusChip({ status, colorMap, fallback = defaultFallback }: StatusChipProps) {
	const colors = colorMap[status] ?? fallback;

	return (
		<Chip
			label={status}
			size="small"
			sx={{
				height: 24,
				fontSize: "0.75rem",
				fontWeight: 600,
				color: colors.color,
				backgroundColor: colors.backgroundColor,
				borderRadius: "8px",
				"& .MuiChip-label": {
					px: 1,
				},
			}}
		/>
	);
}
