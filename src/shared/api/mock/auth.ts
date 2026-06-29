import { getMockDatabase } from "#/shared/mock";
import type { CurrentUser } from "#/types";
import { toItemResponse, toVoidResponse } from "./list-utils";
import { withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";
import { MockApiError } from "./types";

import { KIP_ERP_STORAGE_KEYS } from "#/shared/config";
import {
	MOCK_AUTH_PASSWORD,
	MOCK_DEMO_ACCOUNTS,
} from "./demo-accounts";

export type { MockDemoAccount } from "./demo-accounts";
export { MOCK_AUTH_PASSWORD, MOCK_DEMO_ACCOUNTS } from "./demo-accounts";
export const MOCK_SESSION_STORAGE_KEY = KIP_ERP_STORAGE_KEYS.session;

export type MockLoginPayload = {
	login: string;
	password: string;
};

export type MockAuthSession = {
	user: CurrentUser;
	token: string;
};

let currentSession: MockAuthSession | null = null;

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((part) => part[0])
		.filter(Boolean)
		.slice(0, 2)
		.join("");
}

function readPersistedSession(): MockAuthSession | null {
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const raw = localStorage.getItem(MOCK_SESSION_STORAGE_KEY);
		if (!raw) {
			return null;
		}

		const parsed = JSON.parse(raw) as MockAuthSession;
		if (parsed?.user && parsed?.token) {
			return parsed;
		}
	} catch {
		return null;
	}

	return null;
}

function writePersistedSession(session: MockAuthSession | null): void {
	if (typeof window === "undefined") {
		return;
	}

	if (!session) {
		localStorage.removeItem(MOCK_SESSION_STORAGE_KEY);
		return;
	}

	localStorage.setItem(MOCK_SESSION_STORAGE_KEY, JSON.stringify(session));
}

function getActiveSession(): MockAuthSession | null {
	if (currentSession) {
		return currentSession;
	}

	const persisted = readPersistedSession();
	if (persisted) {
		currentSession = persisted;
	}

	return currentSession;
}

function resolveUser(login: string) {
	const normalizedLogin = login.trim().toLowerCase();

	return getMockDatabase().users.find(
		(candidate) =>
			candidate.status === "active" &&
			(candidate.email.toLowerCase() === normalizedLogin ||
				candidate.email.split("@")[0]?.toLowerCase() === normalizedLogin),
	);
}

export const mockAuthApi = {
	login(
		payload: MockLoginPayload,
		options?: MockRequestOptions,
	): Promise<MockApiResponse<MockAuthSession>> {
		return withMockRequest(() => {
			if (payload.password !== MOCK_AUTH_PASSWORD) {
				throw new MockApiError("Неверный логин или пароль", "AUTH_INVALID_CREDENTIALS");
			}

			const user = resolveUser(payload.login);

			if (!user) {
				throw new MockApiError("Неверный логин или пароль", "AUTH_INVALID_CREDENTIALS");
			}

			currentSession = {
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					avatarInitials: getInitials(user.name),
				},
				token: `mock-token-${user.id}`,
			};

			writePersistedSession(currentSession);

			return toItemResponse(currentSession);
		}, options);
	},

	logout(options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			currentSession = null;
			writePersistedSession(null);
			return toVoidResponse();
		}, options);
	},

	getCurrentUser(options?: MockRequestOptions): Promise<MockApiResponse<CurrentUser | null>> {
		return withMockRequest(() => ({ data: getActiveSession()?.user ?? null }), options);
	},

	setSession(session: MockAuthSession | null): void {
		currentSession = session;
		writePersistedSession(session);
	},
};
