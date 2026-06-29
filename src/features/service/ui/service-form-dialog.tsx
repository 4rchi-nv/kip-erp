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
import { servicePriorityLabels, serviceStatusLabels, serviceTypeLabels } from "#/entities/service";
import { SERVICE_PRIORITIES, SERVICE_STATUSES, SERVICE_TYPES, type ServiceRequest } from "#/types";
import { type ServiceRequestFormValues, serviceRequestSchema } from "../model/schema";

export type ServiceFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: ServiceRequestFormValues) => void;
	editingItem: ServiceRequest | null;
	projects: string[];
	assignees: string[];
};

const defaultValues: ServiceRequestFormValues = {
	title: "",
	project: "",
	type: "maintenance",
	priority: "medium",
	status: "new",
	assignee: "",
	requestDate: "",
	dueDate: "",
};

export function ServiceFormDialog({
	open,
	onClose,
	onSubmit,
	editingItem,
	projects,
	assignees,
}: ServiceFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<ServiceRequestFormValues>({
		resolver: zodResolver(serviceRequestSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!open) return;
		if (editingItem) {
			reset({
				title: editingItem.title,
				project: editingItem.project,
				type: editingItem.type,
				priority: editingItem.priority,
				status: editingItem.status,
				assignee: editingItem.assignee,
				requestDate: editingItem.requestDate,
				dueDate: editingItem.dueDate,
			});
			return;
		}
		reset(defaultValues);
	}, [editingItem, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>{editingItem ? "Редактировать заявку" : "Новая сервисная заявка"}</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="service-form"
					spacing={2.5}
					sx={{ pt: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						label="Название заявки"
						fullWidth
						{...register("title")}
						error={Boolean(errors.title)}
						helperText={errors.title?.message}
					/>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Controller
							name="project"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Проект"
									fullWidth
									error={Boolean(errors.project)}
									helperText={errors.project?.message}
								>
									{projects.map((project) => (
										<MenuItem key={project} value={project}>
											{project}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<Controller
							name="type"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Тип работ"
									fullWidth
									error={Boolean(errors.type)}
									helperText={errors.type?.message}
								>
									{SERVICE_TYPES.map((type) => (
										<MenuItem key={type} value={type}>
											{serviceTypeLabels[type]}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</Stack>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Controller
							name="priority"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Приоритет"
									fullWidth
									error={Boolean(errors.priority)}
									helperText={errors.priority?.message}
								>
									{SERVICE_PRIORITIES.map((priority) => (
										<MenuItem key={priority} value={priority}>
											{servicePriorityLabels[priority]}
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
									{SERVICE_STATUSES.map((status) => (
										<MenuItem key={status} value={status}>
											{serviceStatusLabels[status]}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</Stack>
					<Controller
						name="assignee"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								select
								label="Исполнитель"
								fullWidth
								error={Boolean(errors.assignee)}
								helperText={errors.assignee?.message}
							>
								{assignees.map((assignee) => (
									<MenuItem key={assignee} value={assignee}>
										{assignee}
									</MenuItem>
								))}
							</TextField>
						)}
					/>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<TextField
							label="Дата заявки"
							type="date"
							fullWidth
							slotProps={{ inputLabel: { shrink: true } }}
							{...register("requestDate")}
							error={Boolean(errors.requestDate)}
							helperText={errors.requestDate?.message}
						/>
						<TextField
							label="Срок выполнения"
							type="date"
							fullWidth
							slotProps={{ inputLabel: { shrink: true } }}
							{...register("dueDate")}
							error={Boolean(errors.dueDate)}
							helperText={errors.dueDate?.message}
						/>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onClose}>
					Отмена
				</Button>
				<Button type="submit" form="service-form">
					{editingItem ? "Сохранить" : "Создать"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
