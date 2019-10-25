import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme';

const ThemeProvider = (props) => <StyledThemeProvider theme={theme} {...props} />;

export default ThemeProvider;