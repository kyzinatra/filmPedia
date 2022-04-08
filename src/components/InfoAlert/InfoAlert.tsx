import Alert from "@mui/material/Alert/Alert";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import React, { FC, useEffect, useState } from "react";
import { AlertColor } from "../../types/color";

interface IInfoAlert {
  text?: string | null;
  color?: AlertColor | null;
  onClose?: () => void;
}

const InfoAlert: FC<IInfoAlert> = ({ text, color, onClose }) => {
  const [isErrWindowOpen, setErrorWindowState] = useState(false);
  useEffect(
    () => (text ? setErrorWindowState(true) : setErrorWindowState(false)),
    [text]
  );
  return (
    <Snackbar
      open={isErrWindowOpen}
      autoHideDuration={4000}
      onClose={(e, r) => {
        if (r == "timeout") {
          setErrorWindowState(false);
          if (onClose) onClose();
        }
      }}
    >
      <Alert
        onClose={() => {
          setErrorWindowState(false);
          if (onClose) onClose();
        }}
        severity={color || "info"}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default InfoAlert;
