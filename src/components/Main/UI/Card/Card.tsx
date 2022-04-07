import React, { FC, useEffect, useState } from "react";
import { IMG_BASE_LINK } from "../../../../ts/API";
import "./Card.sass";
import { FilmPosterWidth } from "../../../../ts/FilmSizes";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import poster from "../../../../static/filmMock.png";

interface ICard {
  image?: string;
  alt?: string;
  title?: string;
  isView?: boolean;
  genre?: string;
  isMock?: boolean;
  rate?: number;
  setModalId: () => void;
}

const Card: FC<ICard> = ({
  image = "",
  alt,
  isView,
  title,
  genre,
  isMock,
  setModalId,
  rate,
}) => {
  const [onLoad, setOnLoad] = useState<string>("");
  const FilmPosterHeight = Math.round(FilmPosterWidth * Math.sqrt(2));

  useEffect(() => {
    if (isView && image) {
      const toLoad = new Image();
      toLoad.src = IMG_BASE_LINK + image;
      toLoad.onload = () => setOnLoad(IMG_BASE_LINK + image);
      toLoad.onerror = () => setOnLoad(poster);
    } else if (!image) setOnLoad(poster);
  }, [image, isView]);

  let bgColor;
  if ((rate || 0) > 7) bgColor = "#3AB13A";
  else if ((rate || 0) > 4.9 || !rate) bgColor = "#AAAAAA";
  else bgColor = "#f00";
  return (
    <div
      className={"card"}
      style={{
        padding: "15px",
      }}
    >
      {onLoad && !isMock ? (
        <div className="card__content">
          {!!rate && (
            <span className="card__rate" style={{ backgroundColor: bgColor }}>
              {Math.round(rate * 10) / 10}
            </span>
          )}
          <img
            src={onLoad}
            alt={alt}
            style={{
              width: FilmPosterWidth,
              height: FilmPosterHeight,
            }}
            onClick={() => setModalId()}
          />
          <div className="card__title">
            <span>{title}</span>
          </div>
          <div className="card__genre">
            <span>{genre}</span>
          </div>
        </div>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            width={FilmPosterWidth}
            sx={{ bgcolor: "#012a33" }}
            height={FilmPosterHeight}
          />
          <Skeleton
            variant="rectangular"
            width={FilmPosterWidth}
            sx={{ bgcolor: "#012a33", mt: "10px" }}
            height={20}
          />
          <Skeleton
            variant="rectangular"
            width={FilmPosterWidth * 0.7}
            sx={{ bgcolor: "#012a33", mt: "10px" }}
            height={10}
          />
        </>
      )}
    </div>
  );
};

export default Card;
