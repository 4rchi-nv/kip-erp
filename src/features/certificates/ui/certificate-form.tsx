"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button, Card, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { certificateLanguageLabels, certificateTypeLabels } from "#/entities/certificate";
import type { Employee } from "#/types";
import { type CertificateFormValues, certificateSchema } from "../model/schema";

export type CertificateFormProps = {
	activeEmployees: Employee[];
	loading: boolean;
	onSubmit: (values: CertificateFormValues) => void;
};

export function CertificateForm({ activeEmployees, loading, onSubmit }: CertificateFormProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CertificateFormValues>({
		resolver: zodResolver(certificateSchema),
		defaultValues: {
			type: "safety_training",
			employeeId: "",
			language: "ru",
		},
	});

	return (
		<Card sx={{ p: 3, maxWidth: 420, width: "100%" }}>
			<Typography variant="h3" sx={{ mb: 2 }}>
				Параметры сертификата
			</Typography>
			<Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="type"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							select
							label="Тип сертификата"
							fullWidth
							error={Boolean(errors.type)}
							helperText={errors.type?.message}
						>
							{Object.entries(certificateTypeLabels).map(([value, label]) => (
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
							{activeEmployees.map((employee) => (
								<MenuItem key={employee.id} value={employee.id}>
									{employee.fullName}
								</MenuItem>
							))}
						</TextField>
					)}
				/>
				<Controller
					name="language"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							select
							label="Язык"
							fullWidth
							error={Boolean(errors.language)}
							helperText={errors.language?.message}
						>
							{Object.entries(certificateLanguageLabels).map(([value, label]) => (
								<MenuItem key={value} value={value}>
									{label}
								</MenuItem>
							))}
						</TextField>
					)}
				/>
				<Button
					type="submit"
					variant="contained"
					startIcon={<VisibilityOutlinedIcon />}
					disabled={loading}
				>
					Сформировать предпросмотр
				</Button>
			</Stack>
		</Card>
	);
}
