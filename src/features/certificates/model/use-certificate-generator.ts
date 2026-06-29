"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { useGenerateCertificateMutation } from "#/entities/certificate";
import { useEmployeesQuery } from "#/entities/employee";
import type { CertificateFormValues } from "./schema";

export function useCertificateGenerator() {
	const { data: employeesData } = useEmployeesQuery({ page: 0, pageSize: 200 });
	const [preview, setPreview] = useState<CertificateFormValues | null>(null);
	const generateMutation = useGenerateCertificateMutation();

	const employees = employeesData?.data ?? [];

	const generatePreview = useCallback(
		(values: CertificateFormValues) => {
			const employee = employees.find((entry) => entry.id === values.employeeId);

			if (!employee) {
				toast.error("Сотрудник не найден");
				return;
			}

			generateMutation.mutate(
				{
					type: values.type,
					language: values.language,
					employeeId: employee.id,
					employeeName: employee.fullName,
					position: employee.position,
					department: employee.department,
					issueDate: new Date().toISOString().slice(0, 10),
				},
				{
					onSuccess: () => {
						setPreview(values);
						toast.success("Предпросмотр готов");
					},
					onError: (error) => {
						toast.error(error instanceof Error ? error.message : "Ошибка генерации");
					},
				},
			);
		},
		[employees, generateMutation],
	);

	const downloadPdf = useCallback(() => {
		toast.info("Файл будет скачан после подключения генерации PDF");
	}, []);

	const getEmployee = useCallback(
		(employeeId: string) => employees.find((employee) => employee.id === employeeId),
		[employees],
	);

	const activeEmployees = useMemo(
		() =>
			employees.filter(
				(employee) =>
					employee.employmentStatus === "active" || employee.employmentStatus === "on_leave",
			),
		[employees],
	);

	return {
		preview,
		loading: generateMutation.isPending,
		activeEmployees,
		generatePreview,
		downloadPdf,
		getEmployee,
	};
}
