import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";


const theme = createTheme({
  palette: {
    primary: {
      main: "#125b70",
    },
    secondary: {
      main: "#702612",
    },
  },
});

export const AppThemeProvider: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
