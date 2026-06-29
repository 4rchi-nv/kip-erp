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
import { projectStatusLabels } from "#/entities/project";
import { PROJECT_STATUSES, type Project } from "#/types";
import { type ProjectFormValues, projectSchema } from "../model/schema";

export type ProjectFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: ProjectFormValues) => void;
	editingItem: Project | null;
	managers: string[];
};

const defaultValues: ProjectFormValues = {
	name: "",
	client: "",
	manager: "",
	status: "planning",
	budget: 0,
	progress: 0,
	startDate: "",
	endDate: "",
};

export function ProjectFormDialog({
	open,
	onClose,
	onSubmit,
	editingItem,
	managers,
}: ProjectFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<ProjectFormValues>({
		resolver: zodResolver(projectSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!open) return;
		if (editingItem) {
			reset({
				name: editingItem.name,
				client: editingItem.client,
				manager: editingItem.manager,
				status: editingItem.status,
				budget: editingItem.budget,
				progress: editingItem.progress,
				startDate: editingItem.startDate,
				endDate: editingItem.endDate,
			});
			return;
		}
		reset(defaultValues);
	}, [editingItem, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>{editingItem ? "Редактировать проект" : "Новый проект"}</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="project-form"
					spacing={2.5}
					sx={{ pt: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						label="Название проекта"
						fullWidth
						{...register("name")}
						error={Boolean(errors.name)}
						helperText={errors.name?.message}
					/>
					<TextField
						label="Заказчик"
						fullWidth
						{...register("client")}
						error={Boolean(errors.client)}
						helperText={errors.client?.message}
					/>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Controller
							name="manager"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Руководитель проекта"
									fullWidth
									error={Boolean(errors.manager)}
									helperText={errors.manager?.message}
								>
									{managers.map((manager) => (
										<MenuItem key={manager} value={manager}>
											{manager}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<Controller
							name="status"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Статус"
									fullWidth
									error={Boolean(errors.status)}
									helperText={errors.status?.message}
								>
									{PROJECT_STATUSES.map((status) => (
										<MenuItem key={status} value={status}>
											{projectStatusLabels[status]}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</Stack>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Controller
							name="budget"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Бюджет, TMT"
									type="number"
									fullWidth
									onChange={(event) => field.onChange(Number(event.target.value) || 0)}
									error={Boolean(errors.budget)}
									helperText={errors.budget?.message}
								/>
							)}
						/>
						<Controller
							name="progress"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Прогресс, %"
									type="number"
									fullWidth
									onChange={(event) => field.onChange(Number(event.target.value) || 0)}
									error={Boolean(errors.progress)}
									helperText={errors.progress?.message}
								/>
							)}
						/>
					</Stack>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<TextField
							label="Дата начала"
							type="date"
							fullWidth
							slotProps={{ inputLabel: { shrink: true } }}
							{...register("startDate")}
							error={Boolean(errors.startDate)}
							helperText={errors.startDate?.message}
						/>
						<TextField
							label="Дата завершения"
							type="date"
							fullWidth
							slotProps={{ inputLabel: { shrink: true } }}
							{...register("endDate")}
							error={Boolean(errors.endDate)}
							helperText={errors.endDate?.message}
						/>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onClose}>
					Отмена
				</Button>
				<Button type="submit" form="project-form">
					{editingItem ? "Сохранить" : "Добавить"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
