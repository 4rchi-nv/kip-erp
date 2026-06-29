"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import type { GridLoadingOverlayProps } from "@mui/x-data-grid";
import { themeTokens } from "#/shared/theme";

export function GridLoadingOverlay(_props: GridLoadingOverlayProps) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				minHeight: 240,
				gap: 1.5,
				backgroundColor: "rgba(255, 255, 255, 0.6)",
			}}
		>
			<CircularProgress size={40} sx={{ color: themeTokens.accent }} />
			<Typography variant="body2" color="text.secondary">
				Загрузка данных...
			</Typography>
		</Box>
	);
}
