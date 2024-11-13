import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Define the color mode configuration
const config: ThemeConfig = {
  initialColorMode: 'dark', // Set the initial color mode to 'light'
  useSystemColorMode: false, // Use the system color mode preference
};

// Extend the default theme with the color mode configuration
const theme = extendTheme({ config });

export default theme;