"use client";

import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { PermissionGuard } from "#/features/auth";
import { useUsers } from "#/features/users";
import { themeTokens } from "#/shared/theme";
import { ConfirmDialog, PageHeader } from "#/shared/ui";
import { UsersTable } from "#/widgets/users-table";

const RolePermissionsPanel = dynamic(
	() =>
		import("#/features/users/ui/role-permissions-panel").then((module) => ({
			default: module.RolePermissionsPanel,
		})),
	{ ssr: false },
);

const UserFormDialog = dynamic(
	() =>
		import("#/features/users/ui/user-form-dialog").then((module) => ({
			default: module.UserFormDialog,
		})),
	{ ssr: false },
);

export function UsersPage() {
	const usersState = useUsers();

	return (
		<PermissionGuard subject="user" action="read">
			<Box sx={{ display: "flex", flexDirection: "column", gap: themeTokens.dashboardGap }}>
				<PageHeader title="Пользователи и роли" subtitle="Управление доступом к модулям системы" />

				<UsersTable
					rows={usersState.rows}
					rowCount={usersState.rowCount}
					loading={usersState.loading}
					paginationModel={usersState.paginationModel}
					sortModel={usersState.sortModel}
					filterModel={usersState.filterModel}
					search={usersState.search}
					onPaginationModelChange={usersState.onPaginationModelChange}
					onSortModelChange={usersState.onSortModelChange}
					onFilterModelChange={usersState.onFilterModelChange}
					onSearchChange={usersState.onSearchChange}
					onCreate={usersState.openCreate}
					onEdit={usersState.openEdit}
					onDelete={usersState.requestDelete}
					onExport={usersState.handleExport}
				/>

				<RolePermissionsPanel
					users={usersState.users}
					rolePermissions={usersState.rolePermissions}
				/>

				{usersState.dialogOpen ? (
					<UserFormDialog
						open={usersState.dialogOpen}
						onClose={usersState.closeDialog}
						onSubmit={usersState.handleSubmit}
						rolePermissions={usersState.rolePermissions}
						editingUser={usersState.editingUser}
					/>
				) : null}

				<ConfirmDialog
					open={usersState.deleteConfirmOpen}
					title="Удалить пользователя?"
					description={`Вы уверены, что хотите удалить «${usersState.deleteConfirmLabel}»? Это действие нельзя отменить.`}
					loading={usersState.deleteConfirmLoading}
					onConfirm={usersState.confirmDelete}
					onCancel={usersState.cancelDelete}
				/>
			</Box>
		</PermissionGuard>
	);
}
