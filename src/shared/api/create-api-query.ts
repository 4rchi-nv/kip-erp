import type { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { createEffect } from "effector";

export type ApiQueryConfig<TParams, TData> = {
	queryKey: (params: TParams) => QueryKey;
	queryFn: (params: TParams) => Promise<TData>;
};

export function createApiQuery<TParams, TData>({
	queryKey,
	queryFn,
}: ApiQueryConfig<TParams, TData>) {
	const effect = createEffect(queryFn);

	const queryOptions = (
		params: TParams,
		options?: Omit<UseQueryOptions<TData, Error, TData, QueryKey>, "queryKey" | "queryFn">,
	): UseQueryOptions<TData, Error, TData, QueryKey> => ({
		queryKey: queryKey(params),
		queryFn: () => effect(params),
		...options,
	});

	return {
		effect,
		queryOptions,
	};
}
