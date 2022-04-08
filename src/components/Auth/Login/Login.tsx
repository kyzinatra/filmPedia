import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Link from "@mui/material/Link/Link";
import TextField from "@mui/material/TextField/TextField";
import React, { FC, useState } from "react";
import { useAuth } from "../../../hooks/UseAuth";
import "./Login.sass";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import Dialog from "@mui/material/Dialog/Dialog";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import InfoAlert from "../../InfoAlert/InfoAlert";
import { AlertColor } from "../../../types/color";

interface ILogin {
  changeState: () => void;
}

interface ILogInFrom {
  email: string;
  password: string;
}
const Login: FC<ILogin> = ({ changeState }) => {
  // auth
  const [form, setForm] = useState<ILogInFrom>({ email: "", password: "" });
  const [error, setError] = useState("");

  // reset pass
  const [dialog, setDialog] = useState(false);
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [isValid, setValid] = useState(true);
  const [alert, setAlert] = useState<{
    text: string;
    color: AlertColor;
  } | null>(null);

  const LogInhook = useAuth((auth) => {
    signInWithEmailAndPassword(auth, form.email, form.password).catch((err) => {
      setError(err.message);
    });
  });

  const resetPass = useAuth((auth) => {
    if (auth && resetEmail) {
      sendPasswordResetEmail(auth, resetEmail)
        .then(() => {
          setAlert({
            text: "Email for reset password is sent!",
            color: "info",
          });
        })
        .catch(() => {
          setAlert({
            text: "Something went wrong! Check email and try again!",
            color: "error",
          });
        });
    }
  });

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (form.email && form.password) {
      if (LogInhook) LogInhook();
    }
  }

  function onChangeHandler(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: "email" | "password"
  ) {
    const el = e.target;
    if (el instanceof HTMLInputElement)
      setForm((a) => ({ ...a, [type]: el.value }));
  }

  function resetPasswordHandler() {
    if (!/.+@.+\..*/iu.test(resetEmail || "")) {
      setValid(false);
      return;
    }
    setDialog(false);
    if (resetPass) resetPass();
  }
  function hadleDialogClose() {
    setDialog(false);
  }
  return (
    <>
      <form className="auth" onSubmit={(e) => onSubmitHandler(e)}>
        <h1 className="auth__title">Log in</h1>
        <span className="auth__error">{error}</span>
        <div className="auth__email">
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            value={form.email}
            onChange={(e) => onChangeHandler(e, "email")}
          />
        </div>

        <div className="auth__password">
          <TextField
            fullWidth
            label="Password"
            type="password"
            autoComplete="false"
            variant="outlined"
            value={form.password}
            onChange={(e) => onChangeHandler(e, "password")}
          />
        </div>

        <div className="auth__submit">
          <Button
            variant="contained"
            size="large"
            sx={{ padding: "5px 25%" }}
            type="submit"
            disabled={!Object.values(form).every((a) => !!a)}
          >
            Log in
          </Button>
          <Box sx={{ mt: "10px" }}>
            <Link className="auth__link" href="#" onClick={() => changeState()}>
              I haven't an account yet
            </Link>
          </Box>
          <Box sx={{ mt: "10px" }}>
            <Link
              className="auth__link"
              href="#"
              onClick={() => setDialog(true)}
            >
              I forgot the password
            </Link>
          </Box>
        </div>
      </form>
      <Dialog open={dialog} onClose={hadleDialogClose}>
        <DialogTitle>Reset password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To reset your password, please enter your email address below and if
            we find your account, we will send you a reset email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={resetEmail || ""}
            onChange={(e) => {
              if (e.target instanceof HTMLInputElement) {
                setResetEmail(e.target.value);
              }
            }}
            error={!isValid}
            onKeyPress={(e) => e.key == "Enter" && resetPasswordHandler()}
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={hadleDialogClose}>Cancel</Button>
          <Button onClick={resetPasswordHandler}>Send</Button>
        </DialogActions>
      </Dialog>
      <InfoAlert text={alert?.text} color={alert?.color} />
    </>
  );
};

export default Login;
