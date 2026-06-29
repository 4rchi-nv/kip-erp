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
import type { CashOperation } from "#/types";
import { type OperationFormValues, operationSchema } from "../model/schema";

export type OperationFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: OperationFormValues) => void;
	editingOperation: CashOperation | null;
	projects: string[];
	responsiblePersons: string[];
};

const defaultValues: OperationFormValues = {
	date: new Date().toISOString().split("T")[0],
	type: "income",
	amount: 0,
	project: "",
	responsiblePerson: "",
	comment: "",
};

export function OperationFormDialog({
	open,
	onClose,
	onSubmit,
	editingOperation,
	projects,
	responsiblePersons,
}: OperationFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<OperationFormValues>({
		resolver: zodResolver(operationSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!open) return;

		if (editingOperation) {
			reset({
				date: editingOperation.date,
				type: editingOperation.type,
				amount: editingOperation.amount,
				project: editingOperation.project,
				responsiblePerson: editingOperation.responsiblePerson,
				comment: editingOperation.comment,
			});
			return;
		}

		reset({
			...defaultValues,
			date: new Date().toISOString().split("T")[0],
		});
	}, [editingOperation, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>
				{editingOperation ? "Редактировать операцию" : "Новая кассовая операция"}
			</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="operation-form"
					spacing={2.5}
					sx={{ pt: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<TextField
							label="Дата"
							type="date"
							fullWidth
							slotProps={{ inputLabel: { shrink: true } }}
							{...register("date")}
							error={Boolean(errors.date)}
							helperText={errors.date?.message}
						/>
						<Controller
							name="type"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Тип"
									fullWidth
									error={Boolean(errors.type)}
									helperText={errors.type?.message}
								>
									<MenuItem value="income">Поступление</MenuItem>
									<MenuItem value="expense">Расход</MenuItem>
								</TextField>
							)}
						/>
					</Stack>

					<Controller
						name="amount"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Сумма, ₽"
								type="number"
								fullWidth
								onChange={(event) => field.onChange(Number(event.target.value) || 0)}
								error={Boolean(errors.amount)}
								helperText={errors.amount?.message}
							/>
						)}
					/>

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
						name="responsiblePerson"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								select
								label="Ответственный"
								fullWidth
								error={Boolean(errors.responsiblePerson)}
								helperText={errors.responsiblePerson?.message}
							>
								{responsiblePersons.map((person) => (
									<MenuItem key={person} value={person}>
										{person}
									</MenuItem>
								))}
							</TextField>
						)}
					/>

					<TextField
						label="Комментарий"
						multiline
						minRows={2}
						fullWidth
						{...register("comment")}
						error={Boolean(errors.comment)}
						helperText={errors.comment?.message}
					/>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onClose}>
					Отмена
				</Button>
				<Button type="submit" form="operation-form">
					{editingOperation ? "Сохранить" : "Добавить"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
