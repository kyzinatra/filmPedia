import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Link from "@mui/material/Link/Link";
import TextField from "@mui/material/TextField/TextField";
import React, { FC, useState } from "react";
import { useAuth } from "../../../hooks/UseAuth";
import "./Login.sass";
import { signInWithEmailAndPassword } from "firebase/auth";

interface ILogin {
  changeState: () => void;
}

interface ILogInFrom {
  email: string;
  password: string;
}

const Login: FC<ILogin> = ({ changeState }) => {
  const [form, setForm] = useState<ILogInFrom>({ email: "", password: "" });
  const [error, setError] = useState("");
  const LogInhook = useAuth((auth) => {
    signInWithEmailAndPassword(auth, form.email, form.password).catch((err) => {
      setError(err.message);
    });
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

  return (
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
          <Link href="#" onClick={() => changeState()}>
            I haven't an account yet
          </Link>
        </Box>
        <Box sx={{ mt: "10px" }}>
          <Link href="#">I forgot the password</Link>
        </Box>
      </div>
    </form>
  );
};

export default Login;
