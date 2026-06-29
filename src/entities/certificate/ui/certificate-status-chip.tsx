"use client";

import { StatusChip } from "#/shared/ui";
import type { CertificateRecord } from "../api/contracts";
import { certificateStatusColors, certificateStatusLabels } from "../lib/status";

type CertificateStatusChipProps = {
	status: CertificateRecord["status"];
};

export function CertificateStatusChip({ status }: CertificateStatusChipProps) {
	return (
		<StatusChip status={certificateStatusLabels[status]} colorMap={certificateStatusColors} />
	);
}
