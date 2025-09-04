import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from 'next-themes';

interface MuiThemeProviderProps {
  children: React.ReactNode;
}

const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({ children }) => {
  const { theme } = useTheme();

  const muiTheme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: theme === 'dark' ? 'dark' : 'light',
        primary: {
          main: '#ffffff', // Adjust to match your theme
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: theme === 'dark' ? '#121212' : '#ffffff',
          paper: theme === 'dark' ? '#1e1e1e' : '#f5f5f5',
        },
      },
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      },
    });
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;