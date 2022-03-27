import React, { FC, FocusEvent } from "react";

import "./Avatar.sass";

import img from "../../../static/avatar3.png";
import useImgMiddle from "../../../hooks/useImgMiddle";

interface IAvatar {
  href?: string;
  width?: number | string;
  alt?: string;
  title?: string;
}

const Avatar: FC<IAvatar> = ({ href = img as string, width, alt, title }) => {
  const [colors, _] = useImgMiddle(href, {
    ignore: ["rgb(255,255,255)"],
    optimization: {
      error: 3 / 100,
      skip: 4,
    },
  });

  const onFocusHandler = (e: FocusEvent<HTMLDivElement>) => {
    const el = e.target.querySelector("img");
    if (!el) return;

    el.style.boxShadow = `0 0 5px 3px ${colors[0]?.color || "white"}`;
  };

  const onBluerHandler = (e: FocusEvent<HTMLDivElement>) => {
    const el = e.target.querySelector("img");
    if (!el) return;
    el.style.boxShadow = ``;
  };

  return (
    <div
      className="avatar"
      tabIndex={0}
      role="button"
      onFocus={onFocusHandler}
      onBlur={onBluerHandler}
    >
      <img
        src={href}
        alt={alt || title}
        style={{
          width: (width || 70) + "px",
        }}
      />
      <span>{title}</span>
    </div>
  );
};

export default Avatar;
