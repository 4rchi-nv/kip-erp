import { redirect } from "next/navigation";
import { paths } from "#/shared/routing";

export default function HomePage() {
	redirect(paths.dashboard);
}
