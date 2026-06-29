import { MainLayoutClient } from "./layout-client";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <MainLayoutClient>{children}</MainLayoutClient>;
}
