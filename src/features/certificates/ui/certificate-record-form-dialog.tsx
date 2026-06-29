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
import type { CertificateRecord } from "#/entities/certificate/api/contracts";
import {
	certificateLanguageLabels,
	certificateTypeLabels,
} from "#/entities/certificate/lib/labels";
import type { Employee } from "#/types";
import {
	type CertificateRecordFormValues,
	certificateRecordSchema,
	certificateStatusLabels,
} from "../model/certificate-record-schema";

export type CertificateRecordFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: CertificateRecordFormValues) => void;
	editingCertificate?: CertificateRecord | null;
	employees: Employee[];
};

const defaultValues: CertificateRecordFormValues = {
	type: "safety_training",
	language: "ru",
	employeeId: "",
	employeeName: "",
	issueDate: new Date().toISOString().split("T")[0],
	status: "draft",
};

export function CertificateRecordFormDialog({
	open,
	onClose,
	onSubmit,
	editingCertificate = null,
	employees,
}: CertificateRecordFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		watch,
		formState: { errors },
	} = useForm<CertificateRecordFormValues>({
		resolver: zodResolver(certificateRecordSchema),
		defaultValues,
	});

	const employeeId = watch("employeeId");

	useEffect(() => {
		if (!employeeId) return;
		const employee = employees.find((entry) => entry.id === employeeId);
		if (employee) {
			setValue("employeeName", employee.fullName, { shouldValidate: true });
		}
	}, [employeeId, employees, setValue]);

	useEffect(() => {
		if (!open) return;

		if (editingCertificate) {
			reset({
				type: editingCertificate.type,
				language: editingCertificate.language,
				employeeId: editingCertificate.employeeId,
				employeeName: editingCertificate.employeeName,
				issueDate: editingCertificate.issueDate,
				status: editingCertificate.status,
			});
			return;
		}

		reset({
			...defaultValues,
			issueDate: new Date().toISOString().split("T")[0],
		});
	}, [editingCertificate, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>{editingCertificate ? "Редактирование сертификата" : "Новый сертификат"}</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="certificate-record-form"
					spacing={2.5}
					sx={{ pt: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<TextField {...field} select label="Тип сертификата" fullWidth>
								{Object.entries(certificateTypeLabels).map(([value, label]) => (
									<MenuItem key={value} value={value}>
										{label}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
					<Controller
						name="language"
						control={control}
						render={({ field }) => (
							<TextField {...field} select label="Язык" fullWidth>
								{Object.entries(certificateLanguageLabels).map(([value, label]) => (
									<MenuItem key={value} value={value}>
										{label}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
					<Controller
						name="employeeId"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								select
								label="Сотрудник"
								fullWidth
								error={Boolean(errors.employeeId)}
								helperText={errors.employeeId?.message}
							>
								{employees.map((employee) => (
									<MenuItem key={employee.id} value={employee.id}>
										{employee.fullName}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
					<TextField
						label="Дата выпуска"
						type="date"
						fullWidth
						slotProps={{ inputLabel: { shrink: true } }}
						{...register("issueDate")}
						error={Boolean(errors.issueDate)}
						helperText={errors.issueDate?.message}
					/>
					<Controller
						name="status"
						control={control}
						render={({ field }) => (
							<TextField {...field} select label="Статус" fullWidth>
								{Object.entries(certificateStatusLabels).map(([value, label]) => (
									<MenuItem key={value} value={value}>
										{label}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onClose}>
					Отмена
				</Button>
				<Button type="submit" form="certificate-record-form">
					{editingCertificate ? "Сохранить" : "Создать"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
