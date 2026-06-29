"use client";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
	Box,
	Button,
	Card,
	Divider,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MOCK_AUTH_PASSWORD, MOCK_DEMO_ACCOUNTS } from "#/shared/api/mock/demo-accounts";
import { isMockMode } from "#/shared/config";
import { paths } from "#/shared/routing";
import { themeTokens } from "#/shared/theme";
import { $authError, $isAuthenticated, $isAuthPending, loginSubmitted } from "../model/session";

const QUICK_LOGIN_ACCOUNTS = MOCK_DEMO_ACCOUNTS.filter((account) =>
	["admin", "director", "accountant"].includes(account.role),
);

export function LoginForm() {
	const { t } = useTranslation("common");
	const router = useRouter();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [submit, authError, isPending, isAuthenticated] = useUnit([
		loginSubmitted,
		$authError,
		$isAuthPending,
		$isAuthenticated,
	]);

	useEffect(() => {
		if (isAuthenticated) {
			router.replace(paths.dashboard);
		}
	}, [isAuthenticated, router]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		submit({ login, password });
	};

	const handleQuickLogin = (email: string) => {
		setLogin(email);
		setPassword(MOCK_AUTH_PASSWORD);
		submit({ login: email, password: MOCK_AUTH_PASSWORD });
	};

	return (
		<Box
			sx={{
				minHeight: "100dvh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: themeTokens.contentBackground,
				p: 3,
			}}
		>
			<Card
				className={authError ? "animate-shake" : undefined}
				sx={{ width: "100%", maxWidth: 440, p: 4 }}
			>
				<Stack spacing={3} component="form" onSubmit={handleSubmit}>
					<Box sx={{ textAlign: "center" }}>
						<Typography
							variant="h2"
							sx={{
								background: themeTokens.gradientAccent,
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								mb: 0.5,
								fontSize: { xs: "1.5rem", sm: "1.75rem" },
							}}
						>
							{t("authTitle")}
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
							{t("authSubtitle")}
						</Typography>
						<Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
							{t("platformTagline")}
						</Typography>
					</Box>

					<TextField
						label="Email"
						value={login}
						onChange={(event) => setLogin(event.target.value)}
						autoComplete="username"
						fullWidth
						required
					/>

					<TextField
						label="Пароль"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						autoComplete="current-password"
						fullWidth
						required
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
											onClick={() => setShowPassword((value) => !value)}
											edge="end"
										>
											{showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>

					{authError && (
						<Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
							{authError}
						</Typography>
					)}

					<Button
						type="submit"
						variant="contained"
						size="large"
						disabled={isPending}
						fullWidth
						sx={{ borderRadius: 9999, py: 1.25 }}
					>
						{isPending ? "Вход..." : t("signIn")}
					</Button>

					{isMockMode() && (
						<>
							<Divider>
								<Typography variant="caption" color="text.secondary">
									Быстрый вход
								</Typography>
							</Divider>

							<Stack spacing={1}>
								{QUICK_LOGIN_ACCOUNTS.map((account) => (
									<Button
										key={account.email}
										variant="outlined"
										size="small"
										disabled={isPending}
										onClick={() => handleQuickLogin(account.email)}
										sx={{ justifyContent: "flex-start" }}
									>
										Login as {account.label}
									</Button>
								))}
							</Stack>

							<Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
								Демо: *@kip.tm · пароль «{MOCK_AUTH_PASSWORD}»
							</Typography>
						</>
					)}
				</Stack>
			</Card>
		</Box>
	);
}
