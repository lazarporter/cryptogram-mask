import React from "react";
import { Box, SxProps } from "@mui/system";
import { AppBar, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { AppThemeProvider } from "./providers/ThemeProvider";
import { CryptogramMaker } from "./components/CryptogramMaker";

const appLayout: SxProps = {
  outline: "3px dashed purple",
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const appBarStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  outline: "3px dashed red",
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
