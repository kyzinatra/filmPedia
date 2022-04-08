import React, { FC } from "react";

import EditIcon from "@mui/icons-material/Edit";
import Field from "../Filed/Field";
import { AlertColor } from "../../../types/color";
import { useAuth } from "../../../hooks/UseAuth";

import { updateProfile } from "firebase/auth";

interface IUsername {
  setInform: React.Dispatch<
    React.SetStateAction<{
      text: string;
      color: AlertColor;
    } | null>
  >;
  name?: string | null;
}

const Username: FC<IUsername> = ({ name, setInform }) => {
  const updateName = useAuth((auth, user) => {
    if (user) {
      updateProfile(user, {
        displayName: (document.getElementById("Username") as HTMLInputElement)
          ?.value,
      })
        .then(() => {
          setInform({ text: "Success username update!", color: "success" });
        })
        .catch(() => {
          setInform({ text: "Somthing went wrong!", color: "error" });
        });
    }
  });
  function blurHandle(el?: HTMLInputElement) {
    if (el?.value != name) {
      if (updateName) updateName();
    }
  }
  return (
    <Field onBlur={blurHandle} value={name} label="Username" icon={EditIcon} />
  );
};

export default Username;
