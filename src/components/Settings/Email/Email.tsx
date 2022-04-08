import Button from "@mui/material/Button/Button";
import { sendEmailVerification } from "firebase/auth";
import React, { FC } from "react";
import { useAuth } from "../../../hooks/UseAuth";
import { AlertColor } from "../../../types/color";

interface IEmail {
  setInform: React.Dispatch<
    React.SetStateAction<{
      text: string;
      color: AlertColor;
    } | null>
  >;
  isVerify?: boolean;
}

const Email: FC<IEmail> = ({ setInform, isVerify }) => {
  // Verify send function
  const veifyEmail = useAuth((auth, user) => {
    if (user && user.emailVerified == false) {
      sendEmailVerification(user)
        .then(() =>
          setInform({ text: "Verification email is sent!", color: "info" })
        )
        .catch((e) =>
          setInform({ text: "Something went wrong!", color: "error" })
        );
    } else setInform({ text: "Something went wrong!", color: "error" });
  });

  return (
    <>
      {!isVerify && (
        <Button
          color="success"
          onClick={() => {
            if (veifyEmail) veifyEmail();
          }}
        >
          Veify Email
        </Button>
      )}
    </>
  );
};

export default Email;
