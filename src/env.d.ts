export {};

/* eslint-disable @typescript-eslint/no-unused-vars -- ambient ProcessEnv augmentation */
declare namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_API_URL?: string;
		readonly NEXT_PUBLIC_API_MODE?: "mock" | "api";
		readonly NODE_ENV: "development" | "production" | "test";
	}
}
