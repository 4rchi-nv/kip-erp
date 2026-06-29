"use client";

import { GuestGuard, LoginForm } from "#/features/auth";

export function AuthPage() {
	return (
		<GuestGuard>
			<LoginForm />
		</GuestGuard>
	);
}
