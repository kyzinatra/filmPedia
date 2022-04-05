import Alert from "@mui/material/Alert/Alert";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import React, { FC, useEffect, useState } from "react";

interface IError {
  err: { [key: string]: any } | null;
}

const Error: FC<IError> = ({ err }) => {
  const [isErrWindowOpen, setErrorWindowState] = useState(false);
  useEffect(() =>
    err ? setErrorWindowState(true) : setErrorWindowState(false)
  );
  return (
    <Snackbar
      open={isErrWindowOpen}
      autoHideDuration={4000}
      onClose={(e, r) => r == "timeout" && setErrorWindowState(false)}
    >
      <Alert
        onClose={() => setErrorWindowState(false)}
        severity="error"
        sx={{ width: "100%" }}
      >
        Received an Error {err?.status}
        {err?.statusText ? ` (${err.statusText})` : ""}
      </Alert>
    </Snackbar>
  );
};

export default Error;
