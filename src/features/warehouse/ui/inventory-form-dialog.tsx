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
import type { InventoryItem } from "#/types";
import { type InventoryItemFormValues, inventoryItemSchema } from "../model/schema";

export type InventoryFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: InventoryItemFormValues) => void;
	editingItem: InventoryItem | null;
	categories: string[];
	warehouses: string[];
	responsiblePersons: string[];
};

const defaultValues: InventoryItemFormValues = {
	name: "",
	category: "",
	warehouse: "",
	quantity: 0,
	unit: "шт",
	responsiblePerson: "",
	minQuantity: 10,
};

export function InventoryFormDialog({
	open,
	onClose,
	onSubmit,
	editingItem,
	categories,
	warehouses,
	responsiblePersons,
}: InventoryFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<InventoryItemFormValues>({
		resolver: zodResolver(inventoryItemSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!open) return;
		if (editingItem) {
			reset({
				name: editingItem.name,
				category: editingItem.category,
				warehouse: editingItem.warehouse,
				quantity: editingItem.quantity,
				unit: editingItem.unit,
				responsiblePerson: editingItem.responsiblePerson,
				minQuantity: editingItem.minQuantity,
			});
			return;
		}
		reset(defaultValues);
	}, [editingItem, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>{editingItem ? "Редактировать позицию" : "Новая позиция на складе"}</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="inventory-form"
					spacing={2.5}
					sx={{ pt: 1 }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						label="Наименование"
						fullWidth
						{...register("name")}
						error={Boolean(errors.name)}
						helperText={errors.name?.message}
					/>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Controller
							name="category"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Категория"
									fullWidth
									error={Boolean(errors.category)}
									helperText={errors.category?.message}
								>
									{categories.map((category) => (
										<MenuItem key={category} value={category}>
											{category}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<Controller
							name="warehouse"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Склад"
									fullWidth
									error={Boolean(errors.warehouse)}
									helperText={errors.warehouse?.message}
								>
									{warehouses.map((warehouse) => (
										<MenuItem key={warehouse} value={warehouse}>
											{warehouse}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</Stack>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Controller
							name="quantity"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Количество"
									type="number"
									fullWidth
									onChange={(event) => field.onChange(Number(event.target.value) || 0)}
									error={Boolean(errors.quantity)}
									helperText={errors.quantity?.message}
								/>
							)}
						/>
						<TextField
							label="Ед. изм."
							fullWidth
							{...register("unit")}
							error={Boolean(errors.unit)}
							helperText={errors.unit?.message}
						/>
						<Controller
							name="minQuantity"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Мин. остаток"
									type="number"
									fullWidth
									onChange={(event) => field.onChange(Number(event.target.value) || 0)}
									error={Boolean(errors.minQuantity)}
									helperText={errors.minQuantity?.message}
								/>
							)}
						/>
					</Stack>
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
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onClose}>
					Отмена
				</Button>
				<Button type="submit" form="inventory-form">
					{editingItem ? "Сохранить" : "Добавить"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
