"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { type Action, type Subject, useCan } from "#/shared/lib";
import { paths } from "#/shared/routing";
import { Loader } from "#/shared/ui/loader";

type PermissionGuardProps = {
	subject: Subject;
	action: Action;
	children: ReactNode;
	redirectTo?: string;
};

export function PermissionGuard({
	subject,
	action,
	children,
	redirectTo = paths.dashboard,
}: PermissionGuardProps) {
	const { can } = useCan();
	const router = useRouter();
	const allowed = can(subject, action);

	useEffect(() => {
		if (!allowed) {
			router.replace(redirectTo);
		}
	}, [allowed, redirectTo, router]);

	if (!allowed) {
		return <Loader fullScreen={false} />;
	}

	return children;
}
