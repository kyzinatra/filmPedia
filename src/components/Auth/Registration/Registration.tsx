import React, { FC, InputHTMLAttributes, useState } from "react";
import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import "./Registration.sass";
import Link from "@mui/material/Link/Link";
import Box from "@mui/material/Box/Box";
import { useAuth } from "../../../hooks/UseAuth";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

interface IRegistration {
  changeState: () => void;
}

interface IRegFrom {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}

const Registration: FC<IRegistration> = ({ changeState }) => {
  const [form, setForm] = useState<IRegFrom>({
    email: "",
    password: "",
    rePassword: "",
    username: "",
  });
  const [validate, setValidate] = useState<string>("0000");
  const [error, setError] = useState<string>("");

  const createUser = useAuth((auth) => {
    if (!form.email || !form.password || !form.username) return;
    createUserWithEmailAndPassword(auth, form?.email, form?.password)
      .then(({ user }) => {
        sendEmailVerification(user).then(() => {
          console.log("Verify!");
        });
        return updateProfile(user, { displayName: form.username });
      })
      .catch((error) => {
        setError(error.message);
      });
  });

  function fromSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let isValidate = true;
    if (form.password !== form.rePassword || form.password.length < 5) {
      isValidate = false;
      setValidate((a) => a.substring(0, 2) + "11");
    }
    if (form.username.length < 3) {
      isValidate = false;
      setValidate((a) => a[0] + "1" + a.substring(2));
    }
    if (isValidate) {
      if (createUser) createUser();
    }
  }
  function onChangeHandler(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: "email" | "password" | "username" | "rePassword"
  ) {
    const el = e.target;
    if (el instanceof HTMLInputElement)
      setForm((a) => ({ ...a, [type]: el.value }));
  }

  return (
    <form className="auth" onSubmit={fromSubmitHandler}>
      <h1 className="auth__title">Registration</h1>
      <span className="auth__error">{error}</span>
      <div className="auth__email">
        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          error={!!+validate[0]}
          value={form.email}
          onChange={(e) => onChangeHandler(e, "email")}
        />
      </div>
      <div className="auth__username">
        <TextField
          fullWidth
          label="Username"
          id="username"
          type="text"
          variant="outlined"
          error={!!+validate[1]}
          value={form.username}
          onChange={(e) => onChangeHandler(e, "username")}
        />
      </div>
      <div className="auth__password">
        <TextField
          fullWidth
          label="Password"
          id="password"
          type="password"
          autoComplete="false"
          variant="outlined"
          error={!!+validate[2]}
          value={form.password}
          onChange={(e) => onChangeHandler(e, "password")}
        />
      </div>
      <div className="auth__password">
        <TextField
          fullWidth
          autoComplete="false"
          id="rePassword"
          label="Repeat Password"
          type="password"
          variant="outlined"
          error={!!+validate[3]}
          value={form.rePassword}
          onChange={(e) => onChangeHandler(e, "rePassword")}
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
          Submit
        </Button>
        <Box sx={{ mt: "10px" }}>
          <Link href="#" onClick={() => changeState()}>
            I already have an account
          </Link>
        </Box>
      </div>
    </form>
  );
};

export default Registration;
