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
import { equipmentStatusLabels } from "#/entities/equipment";
import { EQUIPMENT_STATUSES, type Equipment } from "#/types";
import { type EquipmentFormValues, equipmentSchema } from "../model/schema";

export type EquipmentFormDialogProps = {
	open: boolean;
	onClose: () => void;
	onSubmit: (values: EquipmentFormValues) => void;
	editingItem: Equipment | null;
	types: string[];
	locations: string[];
	responsiblePersons: string[];
};

const defaultValues: EquipmentFormValues = {
	name: "",
	type: "",
	serialNumber: "",
	location: "",
	responsiblePerson: "",
	status: "operational",
	commissionDate: "",
};

export function EquipmentFormDialog({
	open,
	onClose,
	onSubmit,
	editingItem,
	types,
	locations,
	responsiblePersons,
}: EquipmentFormDialogProps) {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<EquipmentFormValues>({
		resolver: zodResolver(equipmentSchema),
		defaultValues,
	});

	useEffect(() => {
		if (!open) return;
		if (editingItem) {
			reset({
				name: editingItem.name,
				type: editingItem.type,
				serialNumber: editingItem.serialNumber,
				location: editingItem.location,
				responsiblePerson: editingItem.responsiblePerson,
				status: editingItem.status,
				commissionDate: editingItem.commissionDate,
			});
			return;
		}
		reset(defaultValues);
	}, [editingItem, open, reset]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>{editingItem ? "Редактировать оборудование" : "Новое оборудование"}</DialogTitle>
			<DialogContent>
				<Stack
					component="form"
					id="equipment-form"
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
									{types.map((type) => (
										<MenuItem key={type} value={type}>
											{type}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
						<TextField
							label="Серийный номер"
							fullWidth
							{...register("serialNumber")}
							error={Boolean(errors.serialNumber)}
							helperText={errors.serialNumber?.message}
						/>
					</Stack>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<Controller
							name="location"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									select
									label="Расположение"
									fullWidth
									error={Boolean(errors.location)}
									helperText={errors.location?.message}
								>
									{locations.map((location) => (
										<MenuItem key={location} value={location}>
											{location}
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
									{EQUIPMENT_STATUSES.map((status) => (
										<MenuItem key={status} value={status}>
											{equipmentStatusLabels[status]}
										</MenuItem>
									))}
								</TextField>
							)}
						/>
					</Stack>
					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
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
							label="Дата ввода в эксплуатацию"
							type="date"
							fullWidth
							slotProps={{ inputLabel: { shrink: true } }}
							{...register("commissionDate")}
							error={Boolean(errors.commissionDate)}
							helperText={errors.commissionDate?.message}
						/>
					</Stack>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ px: 3, pb: 3 }}>
				<Button variant="outlined" onClick={onClose}>
					Отмена
				</Button>
				<Button type="submit" form="equipment-form">
					{editingItem ? "Сохранить" : "Добавить"}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
