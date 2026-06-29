"use client";

import { Typography } from "@mui/material";
import { formatCurrency } from "#/shared/lib";
import type { OperationType } from "#/types";

type AmountCellProps = {
	amount: number;
	type: OperationType;
};

export function AmountCell({ amount, type }: AmountCellProps) {
	return (
		<Typography
			variant="body2"
			sx={{
				fontWeight: 600,
				color: type === "income" ? "success.main" : "error.main",
			}}
		>
			{formatCurrency(amount)}
		</Typography>
	);
}
