import { resetMockDatabase } from "#/shared/mock";
import { toVoidResponse } from "./list-utils";
import { withMockRequest } from "./request";
import type { MockApiResponse, MockRequestOptions } from "./types";

export const mockDemoApi = {
	resetDatabase(options?: MockRequestOptions): Promise<MockApiResponse<null>> {
		return withMockRequest(() => {
			resetMockDatabase();
			return toVoidResponse();
		}, options);
	},
};
