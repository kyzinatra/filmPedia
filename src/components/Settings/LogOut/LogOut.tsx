import React, { FC } from "react";

import { signOut } from "firebase/auth";
import { useAuth } from "../../../hooks/UseAuth";

import InfoAlert from "../../InfoAlert/InfoAlert";
import Button from "@mui/material/Button/Button";
import { AlertColor } from "../../../types/color";

interface ILogOut {
  setInform: React.Dispatch<
    React.SetStateAction<{
      text: string;
      color: AlertColor;
    } | null>
  >;
}

const LogOut: FC<ILogOut> = ({ setInform }) => {
  const logOut = useAuth((auth) => {
    if (auth) {
      signOut(auth)
        .then(() => location.replace("/filmPedia/"))
        .catch((e) =>
          setInform({ text: "Something went wrong!", color: "error" })
        );
    } else setInform({ text: "Something went wrong!", color: "error" });
  });

  return (
    <Button
      onClick={() => {
        if (logOut) logOut();
      }}
    >
      Log out
    </Button>
  );
};

export default LogOut;
