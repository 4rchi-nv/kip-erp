"use client";

import {
	Box,
	Card,
	FormControl,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { UserStatusChip } from "#/entities/user";
import type { RolePermission, SystemUser, UserRole } from "#/types";

type RolePermissionsPanelProps = {
	users: SystemUser[];
	rolePermissions: RolePermission[];
};

export function RolePermissionsPanel({ users, rolePermissions }: RolePermissionsPanelProps) {
	const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
	const selectedPermissions = rolePermissions.find((role) => role.role === selectedRole);
	const usersWithRole = users.filter((user) => user.role === selectedRole);

	return (
		<Card sx={{ p: 3 }}>
			<Typography variant="h3" sx={{ mb: 2 }}>
				Права доступа по ролям
			</Typography>

			<FormControl size="small" sx={{ minWidth: 280, mb: 3 }}>
				<InputLabel>Роль</InputLabel>
				<Select
					label="Роль"
					value={selectedRole}
					onChange={(event) => setSelectedRole(event.target.value as UserRole)}
				>
					{rolePermissions.map((role) => (
						<MenuItem key={role.role} value={role.role}>
							{role.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			{selectedPermissions && (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
						gap: 3,
					}}
				>
					<Box>
						<Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
							{selectedPermissions.label}
						</Typography>
						<List dense>
							{selectedPermissions.permissions.map((permission) => (
								<ListItem key={permission} disablePadding sx={{ py: 0.25 }}>
									<ListItemText
										primary={permission}
										slotProps={{ primary: { variant: "body2" } }}
									/>
								</ListItem>
							))}
						</List>
					</Box>

					<Card variant="outlined" sx={{ p: 2, bgcolor: "background.default" }}>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
							Пользователи с этой ролью
						</Typography>
						{usersWithRole.length > 0 ? (
							<List dense>
								{usersWithRole.map((user) => (
									<ListItem
										key={user.id}
										disablePadding
										sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}
									>
										<ListItemText
											primary={user.name}
											slotProps={{ primary: { variant: "body2" } }}
										/>
										<UserStatusChip status={user.status} />
									</ListItem>
								))}
							</List>
						) : (
							<Typography variant="body2" color="text.secondary">
								Нет пользователей с выбранной ролью
							</Typography>
						)}
					</Card>
				</Box>
			)}
		</Card>
	);
}
