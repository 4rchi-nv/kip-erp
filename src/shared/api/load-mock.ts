/** Dynamic import keeps mock seed data out of the initial bundle until first mock API call. */
export function loadMockApi() {
	return import("#/shared/api/mock");
}
