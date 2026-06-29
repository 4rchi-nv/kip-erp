"use client";

import { useSyncExternalStore } from "react";
import { createSeedDatabase } from "./database";
import { getMockDatabase, subscribeMockDatabase } from "./store";
import type { MockDatabase } from "./types";

function getServerSnapshot(): MockDatabase {
	return createSeedDatabase();
}

export function useMockDatabase(): MockDatabase {
	return useSyncExternalStore(subscribeMockDatabase, getMockDatabase, getServerSnapshot);
}

export function useMockDatabaseSlice<T>(selector: (database: MockDatabase) => T): T {
	return useSyncExternalStore(
		subscribeMockDatabase,
		() => selector(getMockDatabase()),
		() => selector(getServerSnapshot()),
	);
}
