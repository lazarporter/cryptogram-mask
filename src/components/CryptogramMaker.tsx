import {
  Box,
  Card,
  CardContent,
  CardHeader,
  SxProps,
  TextField,
  Theme,
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

export const CryptogramMaker = () => {
  const [input, setInput] = React.useState("");
  const [key] = React.useState(() => makeKey());
  const cryptogramOutput = React.useMemo(
    () => makeCryptogram(input, key),
    [input, key]
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
      <Card sx={{ width: "80%", maxWidth: "500px" }}>
        <CardHeader title="Output" />
        <CardContent>
          <Typography>{cryptogramOutput}</Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5">Key</Typography>
          <Typography>{JSON.stringify(key, null, 4)}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
