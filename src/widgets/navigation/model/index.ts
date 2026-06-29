import { createEvent, createStore } from "effector";

export const sidebarToggled = createEvent();
export const sidebarOpened = createEvent();
export const sidebarClosed = createEvent();

export const $sidebarOpen = createStore(true)
	.on(sidebarToggled, (state) => !state)
	.on(sidebarOpened, () => true)
	.on(sidebarClosed, () => false);
