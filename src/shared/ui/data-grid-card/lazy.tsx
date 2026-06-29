"use client";

import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import type { DataGridCardProps } from "./index";

const DataGridCardImpl = dynamic(() => import("./index").then((module) => module.DataGridCard), {
	ssr: false,
	loading: () => <Skeleton variant="rounded" height={480} sx={{ borderRadius: "12px" }} />,
});

export function LazyDataGridCard(props: DataGridCardProps) {
	return <DataGridCardImpl {...props} />;
}
