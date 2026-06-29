"use client";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useUnit } from "effector-react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { isMockMode } from "#/shared/config";
import { themeTokens } from "#/shared/theme";
import type { CurrentUser } from "#/types";
import { sidebarToggled } from "../model";

const DemoPanel = dynamic(
	() => import("#/features/demo/ui/demo-panel").then((module) => ({ default: module.DemoPanel })),
	{ ssr: false },
);

export type NavbarProps = {
	user: CurrentUser;
};

export function Navbar({ user }: NavbarProps) {
	const { t } = useTranslation("common");
	const toggleSidebar = useUnit(sidebarToggled);

	return (
		<AppBar
			position="static"
			elevation={0}
			sx={{
				flexShrink: 0,
				backgroundColor: themeTokens.navbarBackground,
				height: themeTokens.navbarHeight,
				justifyContent: "center",
				borderRadius: 0,
			}}
		>
			<Toolbar
				disableGutters
				sx={{
					height: themeTokens.navbarHeight,
					minHeight: `${themeTokens.navbarHeight}px !important`,
					px: { xs: 1.5, sm: 2.5, md: 3 },
					py: { xs: 1, md: 1.2 },
					justifyContent: "space-between",
					gap: 1,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, minWidth: 0 }}>
					<IconButton
						onClick={toggleSidebar}
						edge="start"
						aria-label="Переключить боковое меню"
						sx={{ color: "#FFFFFF", flexShrink: 0 }}
					>
						<MenuIcon />
					</IconButton>
					<Box sx={{ minWidth: 0 }}>
						<Typography
							variant="h3"
							noWrap
							sx={{ color: "#FFFFFF", lineHeight: 1.2, fontSize: { xs: "1rem", sm: "1.25rem" } }}
						>
							{t("companyName")}
						</Typography>
						<Typography
							variant="caption"
							noWrap
							sx={{
								color: "rgba(255,255,255,0.7)",
								display: { xs: "none", sm: "block" },
							}}
						>
							{t("appShortName")} · {t("platformTagline")}
						</Typography>
					</Box>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1 } }}>
					{isMockMode() ? <DemoPanel role={user.role} /> : null}

					<IconButton aria-label={t("notifications")} sx={{ color: "#FFFFFF" }}>
						<NotificationsNoneIcon />
					</IconButton>

					<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
						<Avatar
							sx={{
								width: 40,
								height: 40,
								bgcolor: themeTokens.accent,
								fontSize: "0.875rem",
								fontWeight: 600,
							}}
						>
							{user.avatarInitials}
						</Avatar>
						<Box sx={{ display: { xs: "none", md: "block" }, lineHeight: 1.2 }}>
							<Typography variant="body2" sx={{ color: "#FFFFFF", fontWeight: 600 }}>
								{user.name}
							</Typography>
							<Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
								{user.email}
							</Typography>
						</Box>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
}
