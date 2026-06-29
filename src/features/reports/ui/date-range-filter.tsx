"use client";

import { Card, Stack, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import type { DateRange } from "../model/use-reports";

type DateRangeFilterProps = {
	value: DateRange;
	onChange: (value: DateRange) => void;
};

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
	return (
		<Card sx={{ p: 2 }}>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				spacing={2}
				sx={{ alignItems: { sm: "flex-end" } }}
			>
				<TextField
					label="Период с"
					type="date"
					size="small"
					value={value.from}
					onChange={(event) => onChange({ ...value, from: event.target.value })}
					slotProps={{ inputLabel: { shrink: true } }}
					sx={{ minWidth: 180 }}
				/>
				<TextField
					label="Период по"
					type="date"
					size="small"
					value={value.to}
					onChange={(event) => onChange({ ...value, to: event.target.value })}
					slotProps={{ inputLabel: { shrink: true } }}
					sx={{ minWidth: 180 }}
				/>
				<Typography variant="body2" color="text.secondary" sx={{ pb: { sm: 1 } }}>
					{value.from && value.to
						? `${dayjs(value.from).format("DD.MM.YYYY")} — ${dayjs(value.to).format("DD.MM.YYYY")}`
						: "Укажите период для формирования отчётов"}
				</Typography>
			</Stack>
		</Card>
	);
}
