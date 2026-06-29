"use client";

import { useUnit } from "effector-react";
import type { ReactNode } from "react";
import { BaseLayout } from "#/app/layouts/base-layout";
import { $session, AuthGuard } from "#/features/auth";

type MainLayoutClientProps = {
	children: ReactNode;
};

export function MainLayoutClient({ children }: MainLayoutClientProps) {
	const session = useUnit($session);

	return (
		<AuthGuard>
			{session ? <BaseLayout user={session.user}>{children}</BaseLayout> : null}
		</AuthGuard>
	);
}
