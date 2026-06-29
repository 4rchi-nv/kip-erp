"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
	Avatar,
	Box,
	Drawer,
	IconButton,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tabs,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { EmploymentStatusChip } from "#/entities/employee";
import { formatDate } from "#/shared/lib";
import { EmptyState } from "#/shared/ui";
import type { Employee } from "#/types";

type EmployeeDetailDrawerProps = {
	employee: Employee | null;
	onClose: () => void;
};

export function EmployeeDetailDrawer({ employee, onClose }: EmployeeDetailDrawerProps) {
	const [tab, setTab] = useState("documents");

	return (
		<Drawer
			anchor="right"
			open={Boolean(employee)}
			onClose={onClose}
			slotProps={{ paper: { sx: { width: { xs: "100%", sm: 480 } } } }}
		>
			{employee && (
				<Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
						<Typography variant="h3">Карточка сотрудника</Typography>
						<IconButton onClick={onClose} aria-label="Закрыть">
							<CloseRoundedIcon />
						</IconButton>
					</Box>

					<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
						<Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
							{employee.fullName
								.split(" ")
								.map((part) => part[0])
								.slice(0, 2)
								.join("")}
						</Avatar>
						<Box>
							<Typography variant="h3" sx={{ fontSize: "1.125rem" }}>
								{employee.fullName}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{employee.position}
							</Typography>
							<Box sx={{ mt: 0.5 }}>
								<EmploymentStatusChip status={employee.employmentStatus} />
							</Box>
						</Box>
					</Box>

					<Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
						<InfoItem label="Отдел" value={employee.department} />
						<InfoItem label="Дата приёма" value={formatDate(employee.hireDate)} />
						<InfoItem label="Телефон" value={employee.phone} />
						<InfoItem label="Email" value={employee.email} />
					</Box>

					<Tabs value={tab} onChange={(_, value) => setTab(value)}>
						<Tab value="documents" label="Документы" />
						<Tab value="vacations" label="Отпуска" />
						<Tab value="contracts" label="Договоры" />
					</Tabs>

					<Box sx={{ flex: 1, overflow: "auto" }}>
						{tab === "documents" && (
							<RecordsTable
								emptyTitle="Нет документов"
								headers={["Документ", "Дата"]}
								rows={(employee.documents ?? []).map((doc) => [doc.name, formatDate(doc.date)])}
							/>
						)}
						{tab === "vacations" && (
							<RecordsTable
								emptyTitle="Нет записей об отпусках"
								headers={["С", "По", "Дней"]}
								rows={(employee.vacations ?? []).map((vacation) => [
									formatDate(vacation.from),
									formatDate(vacation.to),
									String(vacation.days),
								])}
							/>
						)}
						{tab === "contracts" && (
							<RecordsTable
								emptyTitle="Нет договоров"
								headers={["Номер", "Тип", "Дата"]}
								rows={(employee.contracts ?? []).map((contract) => [
									contract.number,
									contract.type,
									formatDate(contract.date),
								])}
							/>
						)}
					</Box>
				</Box>
			)}
		</Drawer>
	);
}

function InfoItem({ label, value }: { label: string; value: string }) {
	return (
		<Box>
			<Typography variant="buttonXs" color="text.secondary">
				{label}
			</Typography>
			<Typography variant="body2">{value}</Typography>
		</Box>
	);
}

function RecordsTable({
	headers,
	rows,
	emptyTitle,
}: {
	headers: string[];
	rows: string[][];
	emptyTitle: string;
}) {
	if (rows.length === 0) return <EmptyState title={emptyTitle} />;

	return (
		<Table size="small">
			<TableHead>
				<TableRow>
					{headers.map((header) => (
						<TableCell key={header}>{header}</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{rows.map((row) => (
					<TableRow key={row.join("|")}>
						{row.map((cell) => (
							<TableCell key={cell}>{cell}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
