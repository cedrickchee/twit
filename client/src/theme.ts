// A theme object to include custom color, typography, and layout values.
// Chakra UI comes with a default theme, so this step is optional.

import { theme } from "@chakra-ui/core";

// Extend the theme to add your custom colors, fonts, etc.
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac"
    },
    brightblue: {
      500: "#6458f5",
      600: "#4c3ef3"
    }
  },
};

export default customTheme;
