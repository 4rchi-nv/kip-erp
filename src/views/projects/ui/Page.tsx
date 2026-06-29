"use client";

import { ModuleOverviewPage } from "#/views/_shared";

export function ProjectsPage() {
	return (
		<ModuleOverviewPage
			title="Проекты"
			subtitle="Промышленная автоматизация, SCADA, MES и внедрение КИПиА"
			subject="project"
			emptyTitle="Обзор проектов"
			emptyDescription="Модуль проектов доступен в демо-режиме. Детальная витрина проектов подключается к API."
		/>
	);
}
