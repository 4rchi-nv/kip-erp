import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Move .next to a local disk when the project lives on a slow/network drive (see .env.example).
	...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
	allowedDevOrigins: ["172.28.80.1", "127.0.0.1"],
	experimental: {
		optimizePackageImports: ["@mui/x-data-grid", "@mui/material", "@mui/icons-material"],
	},
	turbopack: {
		resolveAlias: {
			"#": path.join(process.cwd(), "src"),
		},
	},
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			"#": path.join(process.cwd(), "src"),
		};
		return config;
	},
};

export default nextConfig;
