import React, { FC } from "react";
import "./Info.sass";

interface IInfo {
  className?: string;
  title: string;
}
const Info: FC<IInfo> = ({ className, title, children }) => {
  return (
    <div className={"card-info " + className}>
      <h3>{title}: </h3>
      <span>{children}</span>
    </div>
  );
};

export default Info;
