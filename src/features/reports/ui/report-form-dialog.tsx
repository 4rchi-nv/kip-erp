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
import type { ReportDefinition } from "#/types";
import { type ReportFormValues, reportCategories, reportSchema } from "../model/schema";

export type ReportFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: ReportFormValues) => void;
	editingReport?: ReportDefinition | null;
};

const defaultValues: ReportFormValues = {
	title: "",
	description: "",
	category: "Финансы",
};

export function ReportFormDialog({
	open,
	onClose,
	onSubmit,
	editingReport = null,
}: ReportFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<ReportFormValues>({
		resolver: zodResolver(reportSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!open) return;

		if (editingReport) {
			reset({
				title: editingReport.title,
				description: editingReport.description,
				category: editingReport.category,
			});
			return;
		}

		reset(defaultValues);
	}, [editingReport, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
			<DialogTitle>{editingReport ? "Редактирование отчёта" : "Новый отчёт"}</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="report-form"
					spacing={2.5}
					sx={{ pt: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						label="Название"
						fullWidth
						{...register("title")}
						error={Boolean(errors.title)}
						helperText={errors.title?.message}
					/>
					<TextField
						label="Описание"
						fullWidth
						multiline
						minRows={3}
						{...register("description")}
						error={Boolean(errors.description)}
						helperText={errors.description?.message}
					/>
					<Controller
						name="category"
						control={control}
						render={({ field }) => (
							<TextField {...field} select label="Категория" fullWidth>
								{reportCategories.map((category) => (
									<MenuItem key={category} value={category}>
										{category}
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
				<Button type="submit" form="report-form">
					{editingReport ? "Сохранить" : "Создать"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
