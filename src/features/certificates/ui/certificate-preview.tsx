"use client";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Box, Button, Card, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { certificateTitles } from "#/entities/certificate";
import { formatDate } from "#/shared/lib";
import type { Employee } from "#/types";
import type { CertificateFormValues } from "../model/schema";

export type CertificatePreviewProps = {
	preview: CertificateFormValues | null;
	employee: Employee | null;
	loading: boolean;
	onDownload: () => void;
};

export function CertificatePreview({
	preview,
	employee,
	loading,
	onDownload,
}: CertificatePreviewProps) {
	return (
		<Card sx={{ p: 3, flex: 1, minHeight: 480, bgcolor: "background.default" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
				<Typography variant="h3">Предпросмотр документа</Typography>
				{preview && (
					<Button variant="outlined" startIcon={<FileDownloadOutlinedIcon />} onClick={onDownload}>
						Скачать PDF
					</Button>
				)}
			</Box>

			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 360 }}>
					<CircularProgress />
				</Box>
			) : preview && employee ? (
				<Box
					sx={{
						bgcolor: "background.paper",
						p: 4,
						border: "1px solid",
						borderColor: "divider",
						maxWidth: 600,
						mx: "auto",
						fontFamily: "Georgia, serif",
					}}
				>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: "center" }}>
						KIP Engineering · Ashgabat, Turkmenistan · kip.tm
					</Typography>
					<Typography
						variant="body1"
						sx={{ fontWeight: 700, mb: 3, textTransform: "uppercase", textAlign: "center" }}
					>
						{certificateTitles[preview.type][preview.language]}
					</Typography>
					<Divider sx={{ mb: 2 }} />
					<Stack spacing={1}>
						<Typography variant="body2">
							{preview.language === "ru" ? "Выдана" : "Issued to"}:{" "}
							<strong>{employee.fullName}</strong>
						</Typography>
						<Typography variant="body2">
							{preview.language === "ru" ? "Должность" : "Position"}: {employee.position}
						</Typography>
						<Typography variant="body2">
							{preview.language === "ru" ? "Отдел" : "Department"}: {employee.department}
						</Typography>
						<Typography variant="body2">
							{preview.language === "ru" ? "Дата приёма на работу" : "Hire date"}:{" "}
							{formatDate(employee.hireDate)}
						</Typography>
						<Typography variant="body2" sx={{ mt: 1 }}>
							{preview.language === "ru"
								? "Настоящим подтверждаем прохождение обучения / квалификацию сотрудника в соответствии с программой KIP Engineering."
								: "This certifies that the employee has completed the training / qualification program per KIP Engineering standards."}
						</Typography>
					</Stack>
					<Divider sx={{ my: 3 }} />
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Box>
							<Typography variant="buttonXs" color="text.secondary">
								{preview.language === "ru" ? "Дата выдачи" : "Issue date"}
							</Typography>
							<Typography variant="body2">{formatDate(new Date().toISOString())}</Typography>
						</Box>
						<Box sx={{ textAlign: "right" }}>
							<Typography variant="buttonXs" color="text.secondary">
								{preview.language === "ru" ? "Генеральный директор" : "CEO"}
							</Typography>
							<Typography variant="body2">А.В. Смирнов</Typography>
							<Typography variant="buttonXs" color="text.secondary" sx={{ mt: 0.5 }}>
								М.П.
							</Typography>
						</Box>
					</Box>
				</Box>
			) : (
				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 360 }}>
					<Typography color="text.secondary">
						Выберите параметры и нажмите «Сформировать предпросмотр»
					</Typography>
				</Box>
			)}
		</Card>
	);
}
