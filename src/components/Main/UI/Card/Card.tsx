import React, { FC, useEffect, useState } from "react";
import { IMG_BASE_LINK } from "../../../../ts/API";
import "./Card.sass";
import { FilmPosterWidth } from "../../../../ts/FilmSizes";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import poster from "../../../../static/filmMock.png";
import { useFilm } from "../../../../hooks/UseFilm";

interface ICard {
  image?: string;
  alt?: string;
  className?: string;
  title?: string;
  isView?: boolean;
  genre?: string;
  isMock?: boolean;
}

const Card: FC<ICard> = ({
  image = "",
  alt,
  className,
  isView,
  title,
  genre,
  isMock,
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

  return (
    <div className={className}>
      <div
        className={"card"}
        style={{
          padding: "15px",
        }}
      >
        {onLoad && !isMock ? (
          <>
            <img
              src={onLoad}
              alt={alt}
              style={{
                width: FilmPosterWidth,
                height: FilmPosterHeight,
              }}
            />
            <div className="card__title">
              <span>{title}</span>
            </div>
            <div className="card__genre">
              <span>{genre}</span>
            </div>
          </>
        ) : (
          <Skeleton
            variant="rectangular"
            width={FilmPosterWidth}
            sx={{ bgcolor: "#012a33" }}
            height={FilmPosterHeight}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
