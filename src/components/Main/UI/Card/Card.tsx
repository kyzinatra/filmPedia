import React, { FC, useEffect, useState } from "react";
import { useFilm } from "../../../../hooks/UseFilm";
import { IMG_BASE_LINK } from "../../../../ts/API";
import useImgMiddle from "../../../../hooks/useImgMiddle";
import "./Card.sass";
import { FilmPosterWidth } from "../../../../ts/FilmSizes";
import Skeleton from "@mui/material/Skeleton/Skeleton";
interface ICard {
  image?: string;
  alt?: string;
  style?: React.CSSProperties;
}

const Card: FC<ICard> = ({ image = "", alt, style }) => {
  const [isFocus, setFocus] = useState(false);
  const [boxShadow, setBoxShadow] = useState("");
  const [isOnLoad, setOnLoad] = useState(false);
  const FilmPosterHeight = Math.round(FilmPosterWidth * Math.sqrt(2));

  const [colors, path, setPath] = useImgMiddle(IMG_BASE_LINK + image, {
    ignore: ["rgb(0,0,0)"],
    optimization: { error: 7 / 100, skip: 2 },
  });

  const onFocusHandler = () => {
    if (isOnLoad)
      setBoxShadow(`0px 0px 11px 6px ${colors[0]?.color || "#fff"}`);
    setFocus(true);
  };
  const onBlurHandler = () => {
    setBoxShadow(``);
    setFocus(false);
  };

  useEffect(() => {
    const toLoad = new Image();
    toLoad.src = IMG_BASE_LINK + image;
    toLoad.onload = () => setOnLoad(true);
  }, [image]);

  return (
    <div
      className="card"
      onMouseEnter={() =>
        isOnLoad && setBoxShadow(`0 0 11px 6px ${colors[0]?.color || "#999"}`)
      }
      onMouseLeave={() => !isFocus && setBoxShadow(``)}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      style={{ boxShadow }}
      tabIndex={0}
    >
      {isOnLoad ? (
        <img
          src={IMG_BASE_LINK + image}
          alt={alt}
          style={{
            width: FilmPosterWidth,
            height: FilmPosterHeight,
          }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width={FilmPosterWidth}
          sx={{ bgcolor: "#012a33" }}
          height={FilmPosterHeight}
        />
      )}
    </div>
  );
};

export default Card;
