import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import React from 'react';
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material';

const MUIProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = createTheme();

  const responsiveTheme = responsiveFontSizes(theme);

  // Create rtl cache
  // https://mui.com/guides/right-to-left/#3-install-the-rtl-plugin
  const cache = createCache({
    key: 'muiltr',
    prepend: true,
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={responsiveTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MUIProvider;
