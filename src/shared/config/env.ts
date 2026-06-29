import { z } from "zod";

const apiModeSchema = z.enum(["mock", "api"]);

const envSchema = z.object({
	mode: z.enum(["development", "production", "test"]).default("development"),
	api: z.object({
		url: z.url().default("http://localhost:3000"),
	}),
	apiMode: apiModeSchema.default("mock"),
});

export type ApiMode = z.infer<typeof apiModeSchema>;
export type AppConfig = z.infer<typeof envSchema>;

const fallbackConfig: AppConfig = {
	mode: "development",
	api: { url: "http://localhost:3000" },
	apiMode: "mock",
};

function parseEnv(): AppConfig {
	const parsed = envSchema.safeParse({
		mode: process.env.NODE_ENV,
		api: {
			url: process.env.NEXT_PUBLIC_API_URL || undefined,
		},
		apiMode: process.env.NEXT_PUBLIC_API_MODE || undefined,
	});

	if (!parsed.success) {
		console.error("Invalid environment configuration:", parsed.error.flatten());
		return fallbackConfig;
	}

	return parsed.data;
}

export const config = parseEnv();

export const apiMode: ApiMode = config.apiMode;

export const isMockMode = (): boolean => config.apiMode === "mock";
