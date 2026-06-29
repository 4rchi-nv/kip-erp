import axios, { type AxiosError, isAxiosError } from "axios";
import { config } from "#/shared/config";
import { getAccessToken, handleUnauthorized } from "./auth";

export const apiClient = axios.create({
	baseURL: config.api.url,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	timeout: 30_000,
});

apiClient.interceptors.request.use((requestConfig) => {
	const token = getAccessToken();

	if (token) {
		requestConfig.headers.Authorization = `Bearer ${token}`;
	}

	return requestConfig;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (isAxiosError(error) && error.response?.status === 401) {
			handleUnauthorized();
		}

		return Promise.reject(error);
	},
);
