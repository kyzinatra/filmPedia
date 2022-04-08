import React, { FC, useEffect, useState } from "react";

import "./Avatar.sass";

import img1 from "../../../../static/avatar2.png";

interface IAvatar {
  href?: string | null;
  width?: number | string;
  alt?: string;
  title?: string | null;
}

const Avatar: FC<IAvatar> = ({ href = img1 as string, width, alt, title }) => {
  return (
    <div className="avatar" tabIndex={0} role="button">
      <img
        src={href || img1}
        alt={alt || title || ""}
        style={{
          width: (width || 70) + "px",
        }}
      />
      <span>{title || ""}</span>
    </div>
  );
};

export default Avatar;
