import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { ACCENT, HOVER_BG, LABEL_COLOR } from "./tokens";

export { themeTokens } from "./tokens";

declare module "@mui/material/styles" {
	interface TypographyVariants {
		large: React.CSSProperties;
		buttonMd: React.CSSProperties;
		buttonXs: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		large?: React.CSSProperties;
		buttonMd?: React.CSSProperties;
		buttonXs?: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		large: true;
		buttonMd: true;
		buttonXs: true;
	}
}

const breakpoints = {
	values: {
		xxxs: 320,
		xxs: 400,
		xs: 0,
		sm: 450,
		md: 900,
		lg: 1440,
		xl: 1600,
		xxl: 1760,
		xxxl: 1920,
	},
};

const typography: ThemeOptions["typography"] = {
	fontFamily: "Montserrat, sans-serif",
	large: {
		fontSize: "2.5rem",
		fontWeight: 600,
		lineHeight: 1.2,
	},
	h1: {
		fontSize: "2rem",
		fontWeight: 600,
		lineHeight: 1.3,
	},
	h2: {
		fontSize: "1.5rem",
		fontWeight: 600,
		lineHeight: 1.35,
	},
	h3: {
		fontSize: "1.25rem",
		fontWeight: 600,
		lineHeight: 1.4,
	},
	body1: {
		fontSize: "1rem",
		fontWeight: 400,
		lineHeight: 1.5,
	},
	body2: {
		fontSize: "0.875rem",
		fontWeight: 400,
		lineHeight: 1.5,
	},
	button: {
		fontSize: "0.9375rem",
		fontWeight: 600,
		textTransform: "none",
	},
	buttonMd: {
		fontSize: "0.9375rem",
		fontWeight: 600,
		lineHeight: 1.5,
	},
	buttonXs: {
		fontSize: "0.75rem",
		fontWeight: 600,
		lineHeight: 1.5,
	},
};

export const theme = createTheme({
	breakpoints,
	palette: {
		mode: "light",
		primary: {
			main: "#000000",
			contrastText: "#FFFFFF",
		},
		background: {
			default: "#F6F8FE",
			paper: "#FFFFFF",
		},
		error: {
			main: "#D32F2F",
			light: "#FFEEEE",
		},
		success: {
			main: "#12B76A",
			light: "#E9FFF6",
		},
		warning: {
			main: "#F47A00",
			light: "#FFF0D7",
		},
		divider: "#E6E6E6",
		text: {
			primary: "#000000",
			secondary: LABEL_COLOR,
		},
	},
	shape: {
		borderRadius: 12,
	},
	typography,
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: "#F6F8FE",
				},
				"input, textarea, select": {
					borderRadius: 12,
				},
				".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
					borderColor: ACCENT,
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 99,
					textTransform: "none",
					fontWeight: 600,
					boxShadow: "none",
					"&:hover": {
						boxShadow: "none",
					},
				},
				contained: {
					backgroundColor: "#000000",
					color: "#FFFFFF",
					"&:hover": {
						backgroundColor: "#1a1a1a",
					},
				},
				outlined: {
					borderColor: "#E6E6E6",
					"&:hover": {
						backgroundColor: HOVER_BG,
						borderColor: ACCENT,
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 24,
					boxShadow: "none",
					border: "1px solid #E6E6E6",
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 24,
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: "outlined",
			},
			styleOverrides: {
				root: {
					"& .MuiOutlinedInput-root": {
						borderRadius: 12,
						"&.Mui-focused fieldset": {
							borderColor: ACCENT,
						},
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: ACCENT,
					},
				},
			},
		},
		MuiCheckbox: {
			styleOverrides: {
				root: {
					"&.Mui-checked:not(.Mui-disabled)": {
						color: "transparent",
					},
					"&.Mui-disabled.Mui-checked": {
						color: "transparent",
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					"&:hover": {
						backgroundColor: HOVER_BG,
					},
					"&:focus-visible": {
						outline: `2px solid ${ACCENT}`,
						outlineOffset: 2,
					},
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					"&:hover": {
						backgroundColor: HOVER_BG,
					},
					"&.Mui-selected": {
						backgroundColor: HOVER_BG,
						"&:hover": {
							backgroundColor: HOVER_BG,
						},
					},
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				option: {
					"&:hover": {
						backgroundColor: HOVER_BG,
					},
					'&[aria-selected="true"]': {
						backgroundColor: HOVER_BG,
					},
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				select: {
					"&:focus": {
						backgroundColor: "transparent",
					},
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					borderRight: "1px solid #E6E6E6",
					boxShadow: "none",
				},
			},
		},
	},
});

export { muiGlobalStyles } from "./global-styles";
