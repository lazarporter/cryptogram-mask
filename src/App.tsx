import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { AppThemeProvider } from "./providers/ThemeProvider";

export const App = () => {
  return (
    <AppThemeProvider>
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Typography>Stuff goes here</Typography>
      </Box>
    </AppThemeProvider>
  );
};
