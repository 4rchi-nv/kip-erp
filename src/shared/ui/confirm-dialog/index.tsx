"use client";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

export type ConfirmDialogProps = {
	open: boolean;
	title: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	loading?: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};

export function ConfirmDialog({
	open,
	title,
	description,
	confirmLabel = "Удалить",
	cancelLabel = "Отмена",
	loading = false,
	onConfirm,
	onCancel,
}: ConfirmDialogProps) {
	return (
		<Dialog open={open} onClose={loading ? undefined : onCancel} maxWidth="xs" fullWidth>
			<DialogTitle>{title}</DialogTitle>
			{description && (
				<DialogContent>
					<DialogContentText>{description}</DialogContentText>
				</DialogContent>
			)}
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onCancel} disabled={loading}>
					{cancelLabel}
				</Button>
				<Button color="error" onClick={onConfirm} loading={loading}>
					{confirmLabel}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
