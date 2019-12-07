import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

const MyThemeProvider = (props) => <ThemeProvider theme={theme} {...props} />;

export default MyThemeProvider;