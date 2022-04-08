import React, { FC, useEffect, useState } from "react";
import "./Settings.sass";
import EditIcon from "@mui/icons-material/Edit";

import Field from "./Filed/Field";
import Button from "@mui/material/Button/Button";
import { useUserData } from "../../hooks/UseUserData";
import { useAuth } from "../../hooks/UseAuth";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  updateEmail,
} from "firebase/auth";
import InfoAlert from "../InfoAlert/InfoAlert";
import { AlertColor } from "../../types/color";

import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import TextField from "@mui/material/TextField/TextField";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import LogOut from "./LogOut/LogOut";
import ResetPassword from "./ResetPassword/ResetPassword";
import Email from "./Email/Email";
import Photo from "./Photo/Photo";

import { usePhoto } from "../../hooks/UsePhoto";
import Username from "./Username/Username";
interface IVisual {
  displayName?: string | null;
  photoURL?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  phoneNumber?: string | null;
}

const Settings: FC = () => {
  const data = useUserData();
  const [visualize, setVisual] = useState<IVisual>({});
  const [inform, setInform] = useState<{
    text: string;
    color: AlertColor;
  } | null>(null);

  // get Photo
  usePhoto((link?: string) => setVisual((a) => ({ ...a, photoURL: link })));

  // Dialog
  const [dialog, setDialog] = useState<boolean | string>(false);
  const [passConfirm, setPassConfirm] = useState("");
  function handleCloseDialog() {
    setDialog(false);
  }

  function handleConfirm() {
    switch (dialog) {
      case "password":
        if (deleteUserHook) deleteUserHook();
        break;
      case "email":
        if (resetEmail) resetEmail();
        break;
    }
  }

  // delete user
  const deleteUserHook = useAuth((auth, user) => {
    if (user)
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email || "", passConfirm)
      )
        .then(() => deleteUser(user))
        .then((a) => location.replace("/"))
        .catch(() => {
          setDialog(false);
          setInform({
            text: "Account deleting is prevent! Check password or try again later.",
            color: "error",
          });
        });
  });

  // Email reset:
  const resetEmail = useAuth((auth, user) => {
    if (user)
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(user.email || "", passConfirm)
      )
        .then(() =>
          updateEmail(
            user,
            (document.getElementById("Email") as HTMLInputElement)?.value || ""
          )
        )
        .then((a) => {
          setDialog(false);
          setInform({
            text: "Success! Email chenged!",
            color: "success",
          });
          location.reload();
        })
        .catch(() => {
          setDialog(false);
          setInform({
            text: "Email changing is prevent! Check password or try again later.",
            color: "error",
          });
        });
  });

  // check user
  const isLogIn = useAuth((_, user) => {
    if (!user) {
      window.location.replace("/");
    }
  });

  useEffect(() => {
    if (isLogIn) isLogIn();
  }, [isLogIn]);

  useEffect(() => {
    if (data instanceof Object) {
      setVisual({
        displayName: data.displayName,
        email: data.email,
        emailVerified: data.emailVerified,
        phoneNumber: data.phoneNumber,
      });
    }
  }, [data]);
  return (
    <div className="settings">
      <Photo
        displayName={visualize.displayName}
        photoURL={visualize.photoURL}
        setInform={setInform}
      />
      <section className="settings__content">
        <Username name={visualize.displayName} setInform={setInform} />
        <Field
          value={visualize.email}
          label="Email"
          warning={!visualize.emailVerified}
          warningLabel="Email is not verified!"
          icon={EditIcon}
          onBlur={() => setDialog("email")}
        />
      </section>
      <section className="settings__control">
        <Button color="error" onClick={() => setDialog("delete")}>
          Delete account
        </Button>
        <LogOut setInform={setInform} />
        <ResetPassword setInform={setInform} />
        <Email setInform={setInform} isVerify={visualize.emailVerified} />
      </section>

      <InfoAlert
        onClose={() => setInform(null)}
        text={inform?.text}
        color={inform?.color}
      />
      <Dialog open={!!dialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Window</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action requires additional confirmation, please enter your
            password below
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="passConfirm"
            label="Password"
            value={passConfirm}
            onChange={(e) => setPassConfirm(e.target.value)}
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={() => handleConfirm()}>Comfirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Settings;
