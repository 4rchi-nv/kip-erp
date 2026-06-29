"use client";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { IconButton, Tooltip } from "@mui/material";
import type { Employee } from "#/types";

type ViewCellProps = {
	employee: Employee;
	onView: (employee: Employee) => void;
};

export function ViewCell({ employee, onView }: ViewCellProps) {
	return (
		<Tooltip title="Открыть карточку">
			<IconButton size="small" onClick={() => onView(employee)} aria-label="Открыть карточку">
				<VisibilityOutlinedIcon fontSize="small" />
			</IconButton>
		</Tooltip>
	);
}
