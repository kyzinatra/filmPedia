import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import "./Auth.sass";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import { signOut } from "firebase/auth";

const Auth: FC = () => {
  const [logType, setLogType] = useState<"login" | "reg">("login");
  const isLogIn = useAuth((auth, user) => {
    if (user) {
      window.location.replace("/");
    }
  });

  useEffect(() => {
    if (isLogIn) isLogIn();
  }, [isLogIn]);

  return (
    <main className="auth__wrapper">
      {logType == "login" ? (
        <Login changeState={() => setLogType("reg")} />
      ) : (
        <Registration changeState={() => setLogType("login")} />
      )}
    </main>
  );
};

export default Auth;
