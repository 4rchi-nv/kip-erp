"use client";

import { useCallback, useState } from "react";

export function useConfirmDelete<T>() {
	const [target, setTarget] = useState<T | null>(null);

	const open = useCallback((item: T) => setTarget(item), []);
	const close = useCallback(() => setTarget(null), []);

	return {
		target,
		isOpen: target !== null,
		open,
		close,
	};
}
