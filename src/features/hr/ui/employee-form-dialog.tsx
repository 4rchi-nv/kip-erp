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
import { departments } from "#/entities/employee";
import type { Employee } from "#/types";
import { type EmployeeFormValues, employeeSchema } from "../model/schema";

export type EmployeeFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: EmployeeFormValues) => void;
	editingEmployee?: Employee | null;
};

const defaultValues: EmployeeFormValues = {
	fullName: "",
	position: "",
	department: "",
	employmentStatus: "active",
	hireDate: new Date().toISOString().split("T")[0],
	phone: "",
	email: "",
};

export function EmployeeFormDialog({
	open,
	onClose,
	onSubmit,
	editingEmployee = null,
}: EmployeeFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<EmployeeFormValues>({
		resolver: zodResolver(employeeSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!open) return;

		if (editingEmployee) {
			reset({
				fullName: editingEmployee.fullName,
				position: editingEmployee.position,
				department: editingEmployee.department,
				employmentStatus: editingEmployee.employmentStatus,
				hireDate: editingEmployee.hireDate,
				phone: editingEmployee.phone,
				email: editingEmployee.email,
			});
			return;
		}

		reset({
			...defaultValues,
			hireDate: new Date().toISOString().split("T")[0],
		});
	}, [editingEmployee, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>{editingEmployee ? "Редактирование сотрудника" : "Новый сотрудник"}</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="employee-form"
					spacing={2.5}
					sx={{ pt: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						label="ФИО"
						fullWidth
						{...register("fullName")}
						error={Boolean(errors.fullName)}
						helperText={errors.fullName?.message}
					/>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<TextField
							label="Должность"
							fullWidth
							{...register("position")}
							error={Boolean(errors.position)}
							helperText={errors.position?.message}
						/>
						<Controller
							name="department"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Отдел"
									fullWidth
									error={Boolean(errors.department)}
									helperText={errors.department?.message}
								>
									{departments.map((department) => (
										<MenuItem key={department} value={department}>
											{department}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</Stack>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Controller
							name="employmentStatus"
							control={control}
							render={({ field }) => (
								<TextField {...field} select label="Статус" fullWidth>
									<MenuItem value="active">Работает</MenuItem>
									<MenuItem value="on_leave">В отпуске</MenuItem>
									<MenuItem value="terminated">Уволен</MenuItem>
								</TextField>
							)}
						/>
						<TextField
							label="Дата приёма"
							type="date"
							fullWidth
							slotProps={{ inputLabel: { shrink: true } }}
							{...register("hireDate")}
							error={Boolean(errors.hireDate)}
							helperText={errors.hireDate?.message}
						/>
					</Stack>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<TextField
							label="Телефон"
							fullWidth
							{...register("phone")}
							error={Boolean(errors.phone)}
							helperText={errors.phone?.message}
						/>
						<TextField
							label="Email"
							fullWidth
							{...register("email")}
							error={Boolean(errors.email)}
							helperText={errors.email?.message}
						/>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onClose}>
					Отмена
				</Button>
				<Button type="submit" form="employee-form">
					{editingEmployee ? "Сохранить" : "Добавить"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
