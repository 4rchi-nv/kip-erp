"use client";

import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export type DeltaTrend = "positive" | "negative" | "neutral";

export type DeltaChipProps = {
	value: ReactNode;
	trend: DeltaTrend;
};

const trendStyles: Record<
	DeltaTrend,
	{ color: string; backgroundColor: string; Icon: typeof ArrowUpwardRoundedIcon }
> = {
	positive: {
		color: "#12B76A",
		backgroundColor: "#E9FFF6",
		Icon: ArrowUpwardRoundedIcon,
	},
	negative: {
		color: "#D32F2F",
		backgroundColor: "#FFEEEE",
		Icon: ArrowDownwardRoundedIcon,
	},
	neutral: {
		color: "#69788F",
		backgroundColor: "#F0F2F8",
		Icon: RemoveRoundedIcon,
	},
};

export function DeltaChip({ value, trend }: DeltaChipProps) {
	const { color, backgroundColor, Icon } = trendStyles[trend];

	return (
		<Box
			sx={{
				display: "inline-flex",
				alignItems: "center",
				gap: 0.5,
				px: 1,
				py: 0.25,
				borderRadius: "8px",
				backgroundColor,
			}}
		>
			<Icon sx={{ fontSize: 14, color }} />
			<Typography component="span" variant="buttonXs" sx={{ color, lineHeight: 1.5 }}>
				{value}
			</Typography>
		</Box>
	);
}
