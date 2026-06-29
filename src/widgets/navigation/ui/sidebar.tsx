"use client";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
	Box,
	Button,
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { useUnit } from "effector-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { logout } from "#/features/auth";
import { useCan } from "#/shared/lib";
import { paths } from "#/shared/routing";
import { themeTokens } from "#/shared/theme";
import { navItems } from "../lib/nav-items";
import { $sidebarOpen } from "../model";

export function Sidebar() {
	const { t } = useTranslation(["common", "navigation"]);
	const pathname = usePathname();
	const router = useRouter();
	const sidebarOpen = useUnit($sidebarOpen);
	const { can } = useCan();
	const handleLogout = useUnit(logout);

	const visibleNavItems = navItems.filter((item) => can(item.subject, item.action));

	const onLogout = () => {
		handleLogout();
		router.replace(paths.auth);
	};

	return (
		<Drawer
			variant="persistent"
			open={sidebarOpen}
			sx={{
				width: sidebarOpen ? themeTokens.sidebarWidth : 0,
				flexShrink: 0,
				transition: "width 0.2s ease",
				"& .MuiDrawer-paper": {
					width: themeTokens.sidebarWidth,
					boxSizing: "border-box",
					position: "relative",
					height: "100%",
					backgroundColor: "#FFFFFF",
					borderRight: "1px solid #E6E6E6",
					overflowX: "hidden",
					boxShadow: "none",
				},
			}}
		>
			<Box
				sx={{
					p: themeTokens.contentPadding,
					height: "100%",
					display: "flex",
					flexDirection: "column",
					opacity: sidebarOpen ? 1 : 0,
					transition: "opacity 0.2s ease",
				}}
			>
				<Typography
					variant="buttonXs"
					sx={{
						color: "text.secondary",
						textTransform: "uppercase",
						letterSpacing: "0.08em",
						px: 1.5,
						mb: 1,
					}}
				>
					{t("modules")}
				</Typography>

				<List sx={{ flex: 1, py: 0 }}>
					{visibleNavItems.map(({ href, labelKey, Icon }) => {
						const isActive =
							pathname !== null && (pathname === href || pathname.startsWith(`${href}/`));

						return (
							<ListItemButton
								key={href}
								component={Link}
								href={href}
								selected={isActive}
								sx={{
									borderRadius: themeTokens.sidebarItemRadius,
									mb: 0.5,
									px: 1.5,
									py: 1.25,
									"&.Mui-selected": {
										backgroundColor: themeTokens.hoverBg,
										"&:hover": {
											backgroundColor: themeTokens.hoverBg,
										},
									},
									"&:hover": {
										backgroundColor: themeTokens.hoverBg,
									},
								}}
							>
								<ListItemIcon sx={{ minWidth: 40 }}>
									<Icon
										sx={{
											fontSize: 22,
											color: isActive ? "transparent" : themeTokens.iconDefaultColor,
											...(isActive && {
												fill: "url(#sidebar-icon-gradient)",
											}),
										}}
									/>
								</ListItemIcon>
								<ListItemText
									primary={t(labelKey, { ns: "navigation" })}
									slotProps={{
										primary: {
											variant: "body2",
											sx: {
												color: isActive ? "text.primary" : "text.secondary",
												fontWeight: isActive ? 600 : 400,
											},
										},
									}}
								/>
							</ListItemButton>
						);
					})}
				</List>

				<Divider sx={{ my: 1.5 }} />

				<Button
					variant="text"
					color="inherit"
					startIcon={<LogoutOutlinedIcon />}
					onClick={onLogout}
					sx={{
						justifyContent: "flex-start",
						px: 1.5,
						py: 1,
						color: "text.secondary",
						borderRadius: themeTokens.sidebarItemRadius,
						"&:hover": {
							backgroundColor: themeTokens.hoverBg,
						},
					}}
				>
					{t("logout", { defaultValue: "Выйти" })}
				</Button>

				<Typography variant="caption" color="text.secondary" sx={{ px: 1.5, mt: 1 }}>
					{t("version")}
				</Typography>
			</Box>
		</Drawer>
	);
}
