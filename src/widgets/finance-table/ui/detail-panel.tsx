"use client";

import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency, formatDate } from "#/shared/lib";
import type { CashOperation } from "#/types";
import { OperationTypeCell } from "./cells";

type FinanceDetailPanelProps = {
	row: CashOperation;
};

export function FinanceDetailPanel({ row }: FinanceDetailPanelProps) {
	return (
		<Box sx={{ px: 3, py: 2, backgroundColor: "background.default" }}>
			<Typography variant="buttonXs" color="text.secondary" sx={{ mb: 1.5, display: "block" }}>
				Детали операции
			</Typography>
			<Stack spacing={1.25}>
				<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
					<Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
						Тип:
					</Typography>
					<OperationTypeCell type={row.type} />
				</Box>
				<DetailRow label="Дата" value={formatDate(row.date)} />
				<DetailRow label="Сумма" value={formatCurrency(row.amount)} />
				<DetailRow label="Проект" value={row.project} />
				<DetailRow label="Ответственный" value={row.responsiblePerson} />
				<DetailRow label="Комментарий" value={row.comment} />
			</Stack>
		</Box>
	);
}

function DetailRow({ label, value }: { label: string; value: string }) {
	return (
		<Box sx={{ display: "flex", gap: 1 }}>
			<Typography variant="body2" color="text.secondary" sx={{ minWidth: 140 }}>
				{label}:
			</Typography>
			<Typography variant="body2">{value}</Typography>
		</Box>
	);
}
