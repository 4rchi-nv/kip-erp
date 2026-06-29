export function GlobalSvgDefs() {
	return (
		<svg
			width={0}
			height={0}
			style={{ position: "absolute" }}
			aria-hidden
		>
			<title>Gradient definitions</title>
			<defs>
				<linearGradient id="checkbox-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#2E33F7" />
					<stop offset="50%" stopColor="#555AFD" />
					<stop offset="100%" stopColor="#7FB2FF" />
				</linearGradient>
				<linearGradient id="checkbox-disabled-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#C4C4C4" />
					<stop offset="100%" stopColor="#E6E6E6" />
				</linearGradient>
				<linearGradient id="sidebar-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#2E33F7" />
					<stop offset="50%" stopColor="#555AFD" />
					<stop offset="100%" stopColor="#7FB2FF" />
				</linearGradient>
			</defs>
		</svg>
	);
}
