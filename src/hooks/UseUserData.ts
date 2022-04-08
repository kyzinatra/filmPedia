import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuth } from "./UseAuth";

export function useUserData() {
  const [data, setData] = useState<User | null | "LOGOUT">(null);
  const call = useAuth((auth, user) => {
    if (user) {
      setData(user);
    } else {
      setData("LOGOUT");
    }
  });

  useEffect(() => {
    if (call) {
      call();
    }
  }, [call]);
  return data;
}
