"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	Stack,
	TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import type { RolePermission } from "#/types";
import type { SystemUser } from "#/types";
import { type UserFormValues, userSchema } from "../model/schema";

export type UserFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: UserFormValues) => void;
	rolePermissions: RolePermission[];
	editingUser?: SystemUser | null;
};

const defaultValues: UserFormValues = {
	name: "",
	email: "",
	role: "accountant",
	status: "active",
};

export function UserFormDialog({
	open,
	onClose,
	onSubmit,
	rolePermissions,
	editingUser = null,
}: UserFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<UserFormValues>({
		resolver: zodResolver(userSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!open) return;

		if (editingUser) {
			reset({
				name: editingUser.name,
				email: editingUser.email,
				role: editingUser.role,
				status: editingUser.status,
			});
			return;
		}

		reset(defaultValues);
	}, [editingUser, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>{editingUser ? "Редактирование пользователя" : "Новый пользователь"}</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="user-form"
					spacing={2.5}
					sx={{ pt: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						label="Имя"
						fullWidth
						{...register("name")}
						error={Boolean(errors.name)}
						helperText={errors.name?.message}
					/>
					<TextField
						label="Email"
						fullWidth
						{...register("email")}
						error={Boolean(errors.email)}
						helperText={errors.email?.message}
					/>
					<Controller
						name="role"
						control={control}
						render={({ field }) => (
							<TextField {...field} select label="Роль" fullWidth>
								{rolePermissions.map((role) => (
									<MenuItem key={role.role} value={role.role}>
										{role.label}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
					<Controller
						name="status"
						control={control}
						render={({ field }) => (
							<TextField {...field} select label="Статус" fullWidth>
								<MenuItem value="active">Активен</MenuItem>
								<MenuItem value="inactive">Неактивен</MenuItem>
							</TextField>
						)}
					/>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onClose}>
					Отмена
				</Button>
				<Button type="submit" form="user-form">
					{editingUser ? "Сохранить" : "Добавить"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
