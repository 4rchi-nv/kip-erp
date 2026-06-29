"use client";

import { Card, type SxProps, type Theme } from "@mui/material";
import { DataGrid, type DataGridProps } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import type { ReactNode } from "react";
import { themeTokens } from "#/shared/theme";
import { GridLoadingOverlay } from "../grid-loading-overlay";

export type DataGridCardProps = DataGridProps & {
	header?: ReactNode;
	sx?: SxProps<Theme>;
};

const gridSx: SxProps<Theme> = {
	border: "none",
	"& .MuiDataGrid-columnHeaders": {
		borderBottom: "1px solid",
		borderColor: "divider",
		backgroundColor: "background.paper",
	},
	"& .MuiDataGrid-columnHeaderTitle": {
		fontWeight: 600,
		fontSize: "0.75rem",
		textTransform: "uppercase",
		letterSpacing: "0.04em",
		color: "text.secondary",
	},
	"& .MuiDataGrid-row": {
		"&:hover": {
			backgroundColor: themeTokens.hoverBg,
		},
	},
	"& .MuiDataGrid-cell": {
		borderBottom: "1px solid",
		borderColor: "divider",
	},
	"& .MuiDataGrid-footerContainer": {
		borderTop: "1px solid",
		borderColor: "divider",
	},
};

export function DataGridCard({
	header,
	sx,
	paginationMode = "server",
	sortingMode = "server",
	filterMode = "server",
	autoHeight = true,
	disableRowSelectionOnClick = true,
	localeText = ruRU.components.MuiDataGrid.defaultProps.localeText,
	slots,
	...gridProps
}: DataGridCardProps) {
	return (
		<Card
			sx={[
				{
					p: "1.5rem",
					display: "flex",
					flexDirection: "column",
					gap: header ? 2 : 0,
				},
				...(Array.isArray(sx) ? sx : sx ? [sx] : []),
			]}
		>
			{header}
			<DataGrid
				paginationMode={paginationMode}
				sortingMode={sortingMode}
				filterMode={filterMode}
				autoHeight={autoHeight}
				disableRowSelectionOnClick={disableRowSelectionOnClick}
				localeText={localeText}
				slots={{ loadingOverlay: GridLoadingOverlay, ...slots }}
				sx={gridSx}
				{...gridProps}
			/>
		</Card>
	);
}
