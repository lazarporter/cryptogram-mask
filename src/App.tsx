import React from "react";
import { Box, SxProps } from "@mui/system";
import { AppBar, Typography } from "@mui/material";
import { AppThemeProvider } from "./providers/ThemeProvider";
import { CryptogramMaker } from "./components/CryptogramMaker";

const appLayout: SxProps = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const appBarStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
};

export const App = () => {
  return (
    <AppThemeProvider>
      <Box sx={appLayout}>
        <AppBar position="sticky" sx={appBarStyles}>
          <Typography variant="h3">Cryptogram Generator</Typography>
        </AppBar>
        <CryptogramMaker />
      </Box>
    </AppThemeProvider>
  );
};
