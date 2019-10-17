import React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import preset from '@rebass/preset';
import PropTypes from 'prop-types';

const ThemeProvider = ({ children }) => (
    <EmotionThemeProvider theme={preset}>
        {children}
    </EmotionThemeProvider>
);

ThemeProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};

export default ThemeProvider;