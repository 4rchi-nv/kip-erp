import type { CSSObject } from "@mui/material/styles";
import { themeTokens } from "./tokens";

export const muiGlobalStyles: CSSObject = {
	".MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: themeTokens.accent,
	},
	".MuiButton-root:focus-visible, .MuiIconButton-root:focus-visible": {
		outline: `2px solid ${themeTokens.accent}`,
		outlineOffset: 2,
	},
	".MuiCheckbox-root.Mui-checked:not(.Mui-disabled) .MuiSvgIcon-root": {
		fill: "url(#checkbox-gradient)",
		color: "transparent",
	},
	".MuiCheckbox-root.Mui-disabled.Mui-checked .MuiSvgIcon-root": {
		fill: "url(#checkbox-disabled-gradient)",
		color: "transparent",
	},
};
