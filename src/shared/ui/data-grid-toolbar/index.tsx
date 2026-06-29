"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { type Action, Can, type Subject } from "#/shared/lib";

export type DataGridToolbarProps = {
	search: string;
	onSearchChange: (value: string) => void;
	searchPlaceholder?: string;
	onCreate: () => void;
	createLabel: string;
	onExport: () => void;
	exportLabel?: string;
	loading?: boolean;
	createPermission?: { subject: Subject; action: Action };
};

export function DataGridToolbar({
	search,
	onSearchChange,
	searchPlaceholder = "Поиск...",
	onCreate,
	createLabel,
	onExport,
	exportLabel = "Экспорт",
	loading = false,
	createPermission,
}: DataGridToolbarProps) {
	const createButton = (
		<Button variant="contained" startIcon={<AddRoundedIcon />} onClick={onCreate}>
			{createLabel}
		</Button>
	);

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 2,
				flexWrap: "wrap",
			}}
		>
			<TextField
				value={search}
				onChange={(event) => onSearchChange(event.target.value)}
				placeholder={searchPlaceholder}
				size="small"
				sx={{ minWidth: { xs: "100%", sm: 320 }, flex: { sm: 1 }, maxWidth: 480 }}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">
								<SearchRoundedIcon fontSize="small" color="action" />
							</InputAdornment>
						),
					},
				}}
			/>

			<Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
				<Button
					variant="outlined"
					startIcon={<FileDownloadOutlinedIcon />}
					onClick={onExport}
					disabled={loading}
				>
					{exportLabel}
				</Button>
				{createPermission ? (
					<Can subject={createPermission.subject} action={createPermission.action}>
						{createButton}
					</Can>
				) : (
					createButton
				)}
			</Box>
		</Box>
	);
}
