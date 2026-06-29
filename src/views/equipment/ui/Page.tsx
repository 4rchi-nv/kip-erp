"use client";

import { ModuleOverviewPage } from "#/views/_shared";

export function EquipmentPage() {
	return (
		<ModuleOverviewPage
			title="Оборудование"
			subtitle="Учёт PLC, SCADA, КИПиА, сетевого и серверного оборудования"
			subject="equipment"
			emptyTitle="Реестр оборудования"
			emptyDescription="Каталог оборудования на объектах и на складе. В демо используйте модуль «Склад»."
		/>
	);
}
