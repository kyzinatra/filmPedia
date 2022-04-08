import Button from "@mui/material/Button/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { FC } from "react";
import { useAuth } from "../../../hooks/UseAuth";
import { AlertColor } from "../../../types/color";

interface IResetPassword {
  setInform: React.Dispatch<
    React.SetStateAction<{
      text: string;
      color: AlertColor;
    } | null>
  >;
}

const ResetPassword: FC<IResetPassword> = ({ setInform }) => {
  const resetPass = useAuth((auth, user) => {
    if (auth && user?.email) {
      sendPasswordResetEmail(auth, user.email)
        .then(() =>
          setInform({
            text: "Email for reset password is sent!",
            color: "info",
          })
        )
        .catch((e) =>
          setInform({ text: "Something went wrong!", color: "error" })
        );
    } else setInform({ text: "Something went wrong!", color: "error" });
  });

  return (
    <Button
      onClick={() => {
        if (resetPass) resetPass();
      }}
    >
      Reset password
    </Button>
  );
};

export default ResetPassword;
