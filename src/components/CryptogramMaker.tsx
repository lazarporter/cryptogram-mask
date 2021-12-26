import { Close as CloseIcon, ContentCopy } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  SxProps,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { makeCryptogram, makeKey } from "../util/cryptmogrify";

const layout: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  flexGrow: 1,
  alignItems: "center",
  padding: 3,
};

const inputStyles: SxProps<Theme> = {
  width: "80%",
  maxWidth: "500px",
};

const cardStyles: SxProps<Theme> = {
  width: "80%",
  maxWidth: "500px",
  padding: 3,
  marginTop: 2,
  "&.MuiCard-root": {
    boxSizing: "border-box",
  },
};
const cardHeaderStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

export const CryptogramMaker = () => {
  const [input, setInput] = React.useState("");
  const [key] = React.useState(() => makeKey());
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const cryptogramOutput = React.useMemo(
    () => makeCryptogram(input, key),
    [input, key]
  );

  const handleCopyCryptogram = React.useCallback(() => {
    navigator.clipboard.writeText(cryptogramOutput);
    setSnackbarMessage("Cryptogram copied!");
    setSnackbarOpen(true);
  }, [cryptogramOutput, setSnackbarMessage, setSnackbarOpen]);

  const handleCopyKey = React.useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(key));
    setSnackbarMessage("Key copied!");
    setSnackbarOpen(true);
  }, [key, setSnackbarMessage, setSnackbarOpen]);

  const handleClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  const closeActionComponent = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  return (
    <Box sx={layout}>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        placeholder="Enter some text to be cryptmogrified"
        sx={inputStyles}
      />
      <Card sx={cardStyles}>
        <Box sx={cardHeaderStyles}>
          <Typography>Cryptogram</Typography>
          <Tooltip title="Copy cryptogram">
            <span>
              <IconButton
                disabled={cryptogramOutput.length === 0}
                onClick={handleCopyCryptogram}
              >
                <ContentCopy />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <CardContent>
          <Typography>{cryptogramOutput}</Typography>
        </CardContent>
      </Card>

      <Card sx={cardStyles}>
        <Box sx={cardHeaderStyles}>
          <Typography>Key</Typography>
          <Tooltip title="Copy key">
            <span>
              <IconButton onClick={handleCopyKey}>
                <ContentCopy />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <CardContent>
          <Typography>{`Format: {"Original":"Masked"}`}</Typography>
          <Typography>{JSON.stringify(key, null, 4)}</Typography>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={snackbarMessage}
        action={closeActionComponent}
      />
    </Box>
  );
};
