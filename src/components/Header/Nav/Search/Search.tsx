import TextField from "@mui/material/TextField/TextField";
import React, { FC, ChangeEvent } from "react";
import "./Search.sass";
interface ISearch {
  className?: string;
  fr?: React.LegacyRef<any>;
  setQuery: (str: string) => void;
}

const Search: FC<ISearch> = ({ className, fr, setQuery }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div ref={fr} className={"search " + className}>
      <input type="text" onChange={(e) => onChangeHandler(e)} />
    </div>
  );
};

export default React.forwardRef(
  (props: React.PropsWithChildren<ISearch>, ref) => {
    return <Search {...props} fr={ref} />;
  }
);
