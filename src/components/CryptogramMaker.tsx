import { ContentCopy } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  IconButton,
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

const cardStyles: SxProps<Theme> = {
  width: "80%",
  maxWidth: "500px",
  padding: 3,
};
const cardHeaderStyles: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

export const CryptogramMaker = () => {
  const [input, setInput] = React.useState("");
  const [key] = React.useState(() => makeKey());
  const cryptogramOutput = React.useMemo(
    () => makeCryptogram(input, key),
    [input, key]
  );

  const handleCopyCryptogram = React.useCallback(
    () => navigator.clipboard.writeText(cryptogramOutput),
    [cryptogramOutput]
  );
  const handleCopyKey = React.useCallback(
    () => navigator.clipboard.writeText(JSON.stringify(key)),
    [key]
  );

  return (
    <Box sx={layout}>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        multiline
        placeholder="Enter some text to be cryptmogrified"
        sx={{ width: "80%", maxWidth: "500px" }}
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
    </Box>
  );
};
