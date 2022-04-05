import Button from "@mui/material/Button/Button";
import React, { FC } from "react";
import { SwiperSlide, useSwiper } from "swiper/react";
import { FilmPosterWidth } from "../../../../ts/FilmSizes";

interface IShowMore {
  onClick: () => void;
}

const ShowMore: FC<IShowMore> = ({ onClick }) => {
  const swiperHook = useSwiper();
  return (
    <div
      style={{
        marginTop: "15px",
        width: FilmPosterWidth,
        height: ~~FilmPosterWidth * Math.sqrt(2),
      }}
      onClick={() => {
        onClick();
        swiperHook.slidePrev();
      }}
    >
      <Button
        sx={{
          fontSize: "2rem",
          color: "white",
          width: "100%",
          height: "100%",
        }}
        tabIndex={-1}
      >
        Show more
      </Button>
    </div>
  );
};

export default ShowMore;
