"use client";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, Button, Card, Link, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { themeTokens } from "#/shared/theme";
import { DeltaChip, type DeltaChipProps } from "../delta-chip";

export type SummaryCardItem = {
	id: string;
	label: string;
	value?: ReactNode;
	href?: string;
	onClick?: () => void;
};

export type SummaryCardProps = {
	title: string;
	icon: ReactNode;
	total: ReactNode;
	delta?: DeltaChipProps;
	items?: SummaryCardItem[];
	onShowAll?: () => void;
	showAllLabel?: string;
};

function DecorativeLines() {
	return (
		<Box
			aria-hidden
			sx={{
				position: "absolute",
				right: 20,
				top: "50%",
				transform: "translateY(-50%)",
				display: "flex",
				flexDirection: "column",
				gap: 0.75,
				height: "55%",
				pointerEvents: "none",
			}}
		>
			{[32, 24, 16].map((width) => (
				<Box
					key={width}
					sx={{
						height: 3,
						width,
						borderRadius: 99,
						background: themeTokens.gradientAccent,
						opacity: width === 32 ? 0.9 : width === 24 ? 0.6 : 0.35,
						alignSelf: "flex-end",
					}}
				/>
			))}
		</Box>
	);
}

export function SummaryCard({
	title,
	icon,
	total,
	delta,
	items,
	onShowAll,
	showAllLabel = "Показать все",
}: SummaryCardProps) {
	return (
		<Card
			sx={{
				position: "relative",
				overflow: "hidden",
				p: 2.5,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				minHeight: 180,
			}}
		>
			<DecorativeLines />

			<Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, pr: 6 }}>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, minWidth: 0 }}>
					<Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								width: 44,
								height: 44,
								borderRadius: "12px",
								backgroundColor: themeTokens.hoverBg,
								color: themeTokens.accent,
								flexShrink: 0,
							}}
						>
							{icon}
						</Box>
						<Typography
							variant="buttonXs"
							sx={{
								color: "text.secondary",
								textTransform: "uppercase",
								letterSpacing: "0.06em",
							}}
						>
							{title}
						</Typography>
					</Box>

					<Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
						<Typography variant="large" component="p" sx={{ lineHeight: 1.2 }}>
							{total}
						</Typography>
						{delta && <DeltaChip value={delta.value} trend={delta.trend} />}
					</Box>

					{onShowAll && (
						<Button
							variant="text"
							size="small"
							onClick={onShowAll}
							endIcon={<ChevronRightRoundedIcon />}
							sx={{
								alignSelf: "flex-start",
								px: 0,
								minWidth: 0,
								color: themeTokens.accent,
								"&:hover": {
									backgroundColor: "transparent",
									opacity: 0.8,
								},
							}}
						>
							{showAllLabel}
						</Button>
					)}
				</Box>

				{items && items.length > 0 && (
					<Box
						component="ul"
						sx={{
							listStyle: "none",
							m: 0,
							p: 0,
							display: "flex",
							flexDirection: "column",
							gap: 1,
							minWidth: 140,
							maxWidth: 200,
						}}
					>
						{items.map((item) => {
							const content = (
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "baseline",
										gap: 1,
									}}
								>
									<Typography variant="body2" color="text.secondary" noWrap>
										{item.label}
									</Typography>
									{item.value !== undefined && (
										<Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
											{item.value}
										</Typography>
									)}
								</Box>
							);

							return (
								<Box component="li" key={item.id}>
									{item.href ? (
										<Link
											href={item.href}
											underline="hover"
											color="inherit"
											onClick={item.onClick}
											sx={{ display: "block" }}
										>
											{content}
										</Link>
									) : item.onClick ? (
										<Box
											component="button"
											type="button"
											onClick={item.onClick}
											sx={{
												display: "block",
												width: "100%",
												border: "none",
												background: "none",
												padding: 0,
												cursor: "pointer",
												textAlign: "left",
												font: "inherit",
												color: "inherit",
												"&:hover": {
													opacity: 0.8,
												},
											}}
										>
											{content}
										</Box>
									) : (
										content
									)}
								</Box>
							);
						})}
					</Box>
				)}
			</Box>
		</Card>
	);
}
