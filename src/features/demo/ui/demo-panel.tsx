"use client";

import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import {
	Box,
	Button,
	Chip,
	IconButton,
	Popover,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { apiMode, isMockMode } from "#/shared/config";
import type { UserRole } from "#/types";
import { demoRoleLabels } from "../lib/role-labels";
import { useResetDemoData } from "../model/use-reset-demo-data";

export type DemoPanelProps = {
	role: UserRole;
};

export function DemoPanel({ role }: DemoPanelProps) {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const { reset, isResetting } = useResetDemoData();

	if (!isMockMode()) {
		return null;
	}

	const open = Boolean(anchorEl);
	const modeLabel = apiMode === "mock" ? "Mock" : "API";

	return (
		<>
			<Tooltip title="Demo panel">
				<IconButton
					aria-label="Demo panel"
					onClick={(event) => setAnchorEl(event.currentTarget)}
					sx={{
						color: "rgba(255,255,255,0.75)",
						"&:hover": { color: "#FFFFFF", backgroundColor: "rgba(255,255,255,0.08)" },
					}}
				>
					<ScienceOutlinedIcon sx={{ fontSize: 20 }} />
				</IconButton>
			</Tooltip>

			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				slotProps={{
					paper: {
						sx: {
							mt: 1,
							width: 240,
							borderRadius: 2,
							boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
						},
					},
				}}
			>
				<Box sx={{ px: 2, py: 1.5 }}>
					<Typography variant="caption" color="text.secondary" sx={{ letterSpacing: "0.06em" }}>
						DEMO
					</Typography>

					<Stack spacing={1.25} sx={{ mt: 1.25 }}>
						<Stack
							direction="row"
							sx={{ justifyContent: "space-between", alignItems: "center" }}
						>
							<Typography variant="body2" color="text.secondary">
								Mode
							</Typography>
							<Chip
								label={modeLabel}
								size="small"
								color={apiMode === "mock" ? "primary" : "default"}
								variant="outlined"
								sx={{ height: 22, fontSize: "0.7rem" }}
							/>
						</Stack>

						<Stack
							direction="row"
							sx={{ justifyContent: "space-between", alignItems: "center", gap: 1 }}
						>
							<Typography variant="body2" color="text.secondary">
								Role
							</Typography>
							<Typography variant="body2" sx={{ fontWeight: 600, textAlign: "right" }}>
								{demoRoleLabels[role]}
							</Typography>
						</Stack>

						<Button
							variant="outlined"
							size="small"
							fullWidth
							disabled={isResetting}
							loading={isResetting}
							onClick={() => {
								void reset();
							}}
							sx={{ mt: 0.5, textTransform: "none" }}
						>
							Reset demo data
						</Button>
					</Stack>
				</Box>
			</Popover>
		</>
	);
}
