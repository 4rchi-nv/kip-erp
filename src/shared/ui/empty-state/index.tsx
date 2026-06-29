"use client";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { themeTokens } from "#/shared/theme";

export type EmptyStateProps = {
	title: string;
	description?: string;
	icon?: ReactNode;
	action?: ReactNode;
};

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				py: 5,
				gap: 1,
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: 56,
					height: 56,
					borderRadius: "50%",
					backgroundColor: themeTokens.hoverBg,
					color: themeTokens.labelColor,
					mb: 0.5,
				}}
			>
				{icon ?? <InboxOutlinedIcon sx={{ fontSize: 28 }} />}
			</Box>
			<Typography variant="body1" sx={{ fontWeight: 600 }}>
				{title}
			</Typography>
			{description && (
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ textAlign: "center", maxWidth: 400 }}
				>
					{description}
				</Typography>
			)}
			{action && <Box sx={{ mt: 1 }}>{action}</Box>}
		</Box>
	);
}
