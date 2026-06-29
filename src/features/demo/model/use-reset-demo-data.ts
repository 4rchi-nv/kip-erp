"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { demoApi } from "#/entities/demo";
import { isMockMode } from "#/shared/config";
import { getErrorMessage } from "#/shared/lib";

export function useResetDemoData() {
	const queryClient = useQueryClient();
	const [isResetting, setIsResetting] = useState(false);

	const reset = useCallback(async () => {
		if (!isMockMode()) {
			return;
		}

		setIsResetting(true);

		try {
			await demoApi.resetDatabase();
			await queryClient.invalidateQueries();
			toast.success("Демо-данные сброшены");
		} catch (error) {
			toast.error(getErrorMessage(error, "Не удалось сбросить демо-данные"));
		} finally {
			setIsResetting(false);
		}
	}, [queryClient]);

	return { reset, isResetting, canReset: isMockMode() };
}
