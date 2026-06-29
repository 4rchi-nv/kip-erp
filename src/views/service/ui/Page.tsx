"use client";

import { ModuleOverviewPage } from "#/views/_shared";

export function ServicePage() {
	return (
		<ModuleOverviewPage
			title="Сервис"
			subtitle="Монтаж, пусконаладка, обслуживание и обучение персонала"
			subject="service"
			emptyTitle="Сервисные заявки"
			emptyDescription="Здесь будут заявки на калибровку, ТО и выездное обслуживание оборудования KIP Engineering."
		/>
	);
}
