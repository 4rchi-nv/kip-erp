import type { Metadata } from "next";
import { Providers } from "#/app/providers";
import { GlobalSvgDefs } from "#/shared/ui/global-svg-defs";
import { montserrat } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
	title: "KIP Engineering ERP",
	description:
		"Corporate ERP platform for industrial automation projects, warehouse, HR and reporting — KIP Engineering Turkmenistan",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" className={montserrat.className}>
			<body>
			<GlobalSvgDefs />
			<Providers>{children}</Providers>
		</body>
		</html>
	);
}
