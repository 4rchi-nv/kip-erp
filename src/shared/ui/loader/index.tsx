"use client";

import { Box, CircularProgress, Typography } from "@mui/material";
import { themeTokens } from "#/shared/theme";

export type LoaderProps = {
	label?: string;
	fullScreen?: boolean;
};

export function Loader({ label = "Загрузка...", fullScreen = true }: LoaderProps) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				...(fullScreen
					? {
							height: "100dvh",
							width: "100%",
							backgroundColor: "background.default",
						}
					: {
							py: 6,
							width: "100%",
						}),
				gap: 2,
			}}
		>
			<CircularProgress
				size={48}
				sx={{
					color: themeTokens.accent,
				}}
			/>
			<Typography variant="body2" color="text.secondary">
				{label}
			</Typography>
		</Box>
	);
}
