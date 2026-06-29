"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export type PageHeaderProps = {
	title: string;
	subtitle?: string;
	rightSection?: ReactNode;
};

export function PageHeader({ title, subtitle, rightSection }: PageHeaderProps) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "flex-start",
				justifyContent: "space-between",
				flexWrap: "wrap",
				gap: 2,
				mb: 3,
			}}
		>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
				<Typography variant="h2" component="h1">
					{title}
				</Typography>
				{subtitle && (
					<Typography variant="body2" color="text.secondary">
						{subtitle}
					</Typography>
				)}
			</Box>
			{rightSection && (
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, flexShrink: 0 }}>
					{rightSection}
				</Box>
			)}
		</Box>
	);
}
