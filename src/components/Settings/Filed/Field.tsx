import React, { FC, useEffect, useRef, useState } from "react";
import "./Field.sass";

import TextField from "@mui/material/TextField/TextField";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";

interface IField {
  className?: string;
  value?: string | null;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  label?: string;
  warning?: boolean;
  warningLabel?: string;
  onBlur?: (el?: HTMLInputElement) => void;
}

const Field: FC<IField> = ({
  className,
  value,
  icon: Icon,
  label,
  warning,
  warningLabel,
  onBlur,
}) => {
  const [inputValue, setValue] = useState<string>(value || "");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (value) setValue(value);
  }, [value]);

  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const el = e.target;
    if (el instanceof HTMLInputElement) {
      setValue(el.value);
    }
  }

  function onComfirmFunction(el: any) {
    if (el instanceof HTMLInputElement) {
      el.blur();
      if (inputValue != value && onBlur) onBlur(el);
    }
  }

  return (
    <div className="filed__wrapper">
      <div className={"field " + (className || "")}>
        <Icon
          sx={{ pr: 1, py: 0.5, fontSize: "2rem" }}
          className="field__icon"
        />
        <TextField
          id={label}
          value={inputValue}
          label={label}
          onChange={(e) => onChangeHandler(e)}
          onBlur={(e) => onComfirmFunction(e.target)}
          onKeyPress={(e) => e.key == "Enter" && onComfirmFunction(e.target)}
          ref={ref}
          fullWidth
          color={warning ? "warning" : "primary"}
          variant="standard"
        />
      </div>
      {warning && (
        <span className="field__warning" style={{ fontSize: "0.7rem" }}>
          {warningLabel}
        </span>
      )}
    </div>
  );
};

export default Field;
