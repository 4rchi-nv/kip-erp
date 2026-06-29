import type { ListEmployeesParams } from "../api/contracts";
import { employeesApi } from "../api/employees.api";
import { employeesQueryKeys } from "./query-keys";

export const employeesListQuery = {
	queryKey: employeesQueryKeys.list,
	queryFn: (params: ListEmployeesParams) => employeesApi.getList(params),
};

export {
	useCreateEmployeeMutation,
	useDeleteEmployeeMutation,
	useEmployeeQuery,
	useEmployeesQuery,
	useUpdateEmployeeMutation,
} from "./hooks";
export { employeesQueryKeys } from "./query-keys";
