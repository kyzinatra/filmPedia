import { Auth, getAuth, onAuthStateChanged, User } from "firebase/auth";
import React, { useState, useEffect, useMemo } from "react";

export function useAuth(fn: (auth: Auth, user?: User | null) => void) {
  const auth = getAuth();
  const [fnData, setFnData] = useState<[Auth | null, User | null]>([
    null,
    null,
  ]);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFnData([auth, user]);
    });
    return () => unsub();
  }, [fn.toString()]);
  const authData = fnData[0];

  return authData ? () => fn.apply(null, [authData, fnData[1]]) : null;
}
