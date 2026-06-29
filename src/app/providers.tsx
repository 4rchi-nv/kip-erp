"use client";

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { type ReactNode, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { SessionAbilityProvider, SessionInit } from "#/features/auth";
import { i18n } from "#/shared/i18n";
import { muiGlobalStyles, theme } from "#/shared/theme";

const Toaster = dynamic(() => import("sonner").then((module) => module.Toaster), { ssr: false });

function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30_000,
				gcTime: 5 * 60_000,
				retry: 1,
				refetchOnWindowFocus: false,
			},
		},
	});
}

interface ProvidersProps {
	children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	const [queryClient] = useState(createQueryClient);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles styles={muiGlobalStyles} />
			<SessionAbilityProvider>
				<SessionInit />
				<I18nextProvider i18n={i18n}>
					<QueryClientProvider client={queryClient}>
						<Toaster position="top-right" richColors closeButton />
						{children}
					</QueryClientProvider>
				</I18nextProvider>
			</SessionAbilityProvider>
		</ThemeProvider>
	);
}
