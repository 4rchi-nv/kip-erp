"use client";

import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { themeTokens } from "#/shared/theme";
import type { CurrentUser } from "#/types";
import { Navbar, Sidebar } from "#/widgets/navigation";

export type BaseLayoutProps = {
	children: ReactNode;
	user: CurrentUser;
};

export function BaseLayout({ children, user }: BaseLayoutProps) {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100dvh",
				overflow: "hidden",
			}}
		>
			<Navbar user={user} />
			<Box
				sx={{
					display: "flex",
					flex: 1,
					minHeight: 0,
					overflow: "hidden",
				}}
			>
				<Sidebar />
				<Box
					component="main"
					sx={{
						flex: 1,
						minWidth: 0,
						overflow: "auto",
						backgroundColor: themeTokens.contentBackground,
						p: themeTokens.contentPadding,
					}}
				>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
