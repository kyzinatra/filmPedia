import React, { FC, FocusEvent, useEffect, useState } from "react";

import "./Avatar.sass";

import img1 from "../../../../static/avatar3.png";
import img2 from "../../../../static/avatar.png";
import img3 from "../../../../static/avatar2.png";
import useImgMiddle from "../../../../hooks/useImgMiddle";

interface IAvatar {
  href?: string;
  width?: number | string;
  alt?: string;
  title?: string;
}

const Avatar: FC<IAvatar> = ({ href = img1 as string, width, alt, title }) => {
  const [boxShadow, setBoxShadow] = useState("");
  const [colors, path, _] = useImgMiddle(href, {
    ignore: ["rgb(255,255,255)"],
    optimization: {},
  });

  return (
    <div
      className="avatar"
      tabIndex={0}
      role="button"
      onFocus={() => setBoxShadow(`0 0 5px 3px ${colors[0]?.color || "white"}`)}
      onBlur={() => setBoxShadow(``)}
    >
      <img
        src={path}
        alt={alt || title}
        style={{
          width: (width || 70) + "px",
          boxShadow,
        }}
      />
      <span>{title}</span>
    </div>
  );
};

export default Avatar;
