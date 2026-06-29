import { toast } from "sonner";
import { MockApiError } from "#/shared/api";

export function getErrorMessage(error: unknown, fallback = "Произошла ошибка"): string {
	if (error instanceof MockApiError) return error.message;
	if (error instanceof Error && error.message) return error.message;
	return fallback;
}

export function mutationFeedback(
	successMessage: string,
	options?: { onSuccess?: () => void },
) {
	return {
		onSuccess: () => {
			toast.success(successMessage);
			options?.onSuccess?.();
		},
		onError: (error: unknown) => {
			toast.error(getErrorMessage(error));
		},
	};
}
