import { createEffect, createEvent, createStore, sample } from "effector";
import { persist } from "effector-storage/local";
import { KIP_ERP_STORAGE_KEYS } from "#/shared/config";
import { authApi } from "#/entities/auth";
import type { AuthSession, LoginPayload } from "./types";

export const logout = createEvent();
export const loginSubmitted = createEvent<LoginPayload>();
export const sessionHydrated = createEvent();

export const loginFx = createEffect<LoginPayload, AuthSession, Error>(async (payload) => {
	try {
		return await authApi.login(payload);
	} catch {
		throw new Error("Неверный логин или пароль");
	}
});

export const logoutFx = createEffect(async () => {
	await authApi.logout();
});

export const $session = createStore<AuthSession | null>(null)
	.on(loginFx.doneData, (_, session) => session)
	.reset(logout);

export const $isAuthenticated = $session.map((session) => session !== null);

export const $authError = createStore<string | null>(null)
	.on(loginFx.failData, (_, error) => error.message)
	.reset([loginSubmitted, loginFx.done, logout]);

export const $isAuthPending = loginFx.pending;

export const $isSessionHydrated = createStore(false).on(sessionHydrated, () => true);

sample({
	clock: loginSubmitted,
	target: loginFx,
});

sample({
	clock: logout,
	target: logoutFx,
});

if (typeof window !== "undefined") {
	persist({
		store: $session,
		key: KIP_ERP_STORAGE_KEYS.session,
	});
}
