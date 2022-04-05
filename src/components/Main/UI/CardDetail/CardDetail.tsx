import Modal from "@mui/material/Modal";
import React, { FC, useEffect, useState, Fragment } from "react";
import { useFilm } from "../../../../hooks/UseFilm";
import { IMoveDetail, ITVDetail } from "../../../../types/film";
import Error from "../../../Error/Error";
import Info from "./Info/Info";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { IMG_BASE_LINK } from "../../../../ts/API";
import poster from "../../../../static/filmMock.png";

import "./CardDetail.sass";
import Button from "@mui/material/Button/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ICardDetail {
  resetId: () => void;
  id?: number | null;
  type?: string | null;
}

const CardDetail: FC<ICardDetail> = ({ id, type = "movie", resetId }) => {
  const [isOpen, setOpen] = useState(false);
  const [data, err] = useFilm<IMoveDetail & ITVDetail, IMoveDetail & ITVDetail>(
    `/${type}/${id}`,
    {},
    { language: "eu-US" }
  );
  useEffect(() => {
    if (id) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isOpen, id]);

  function handleClose() {
    window.history.pushState({}, "closeModal", "/");
    setOpen(false);
    resetId();
  }

  const imgPath = data.poster_path ? IMG_BASE_LINK + data.poster_path : poster;

  let bgColor;
  if ((data.vote_average || 0) > 7) bgColor = "#3AB13A";
  else if ((data.vote_average || 0) > 4.9 || !data.vote_average)
    bgColor = "#AAAAAA";
  else bgColor = "#f00";
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "auto" }}
      >
        <div className="modal">
          <div className="modal__wrapper">
            <div className="modal__row">
              <div className="modal__img">
                <img src={imgPath} />
              </div>
              <div className="modal__main-info">
                <div className="modal__title">
                  <h3>
                    <a href={data.homepage || "#"}>
                      {data.title || data.name || ""}
                    </a>
                    <span>
                      {data.release_date &&
                        ` (${data.release_date.split("-")[0]})`}
                    </span>
                  </h3>
                  <h4 className="modal__subtitle">
                    {data.original_title != data.title &&
                      ` (${data.original_title})`}
                  </h4>
                </div>
                <div className="modal__short-info">
                  <div
                    className="modal__rate"
                    style={{ backgroundColor: bgColor }}
                  >
                    {data.vote_average}
                  </div>
                  {data.adult && (
                    <div className="modal__adult">
                      <span>{"18+"}</span>
                    </div>
                  )}
                  {data.production_countries?.[0] && (
                    <div className="modal__country">
                      {data.production_countries[0].iso_3166_1}
                    </div>
                  )}
                  {data.release_date && (
                    <div className="modal__date">
                      {data.release_date.replace(/-/g, "/")}
                    </div>
                  )}
                  {type && (
                    <div className="modal__type">
                      {type == "tv" ? "TV" : "MOVIE"}
                    </div>
                  )}
                </div>
                <p className="modal__description">{data.overview}</p>
                <div className="modal__nav">
                  <Button
                    sx={{
                      "backgroundColor": "#f60",
                      "padding": "5px 25px",
                      "marginTop": "1em",
                      "fontWeight": "800",
                      "&:hover": { backgroundColor: "#e65c00" },
                    }}
                  >
                    <a
                      className="modal__watch"
                      href={`https://www.themoviedb.org/${type}/${id}`}
                    >
                      <span>Watch</span>
                      <PlayArrowIcon />
                    </a>
                  </Button>
                  <Button
                    sx={{
                      "backgroundColor": "#f60",
                      "padding": "5px 25px",
                      "marginTop": "1em",
                      "ml": "2em",
                      "cursor": "pointer",
                      "fontWeight": "800",
                      "&:hover": { backgroundColor: "#e65c00" },
                    }}
                  >
                    <FavoriteBorderIcon sx={{ color: "white" }} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="modal__row">
              <div className="modal__more-info">
                <Info className="modal__genres" title="Genres">
                  {data.genres?.map((a, i, arr) => (
                    <Fragment key={i}>
                      {a.name}
                      {i != arr.length - 1 ? ", " : ""}
                    </Fragment>
                  ))}
                </Info>
                <Info className="modal__budget" title="budget">
                  {data.budget
                    ? new Intl.NumberFormat("en", {
                        style: "currency",
                        minimumFractionDigits: 0,
                        currency: "USD",
                      }).format(data.budget)
                    : "-"}
                </Info>
                <Info className="modal__revenue" title="Revenue">
                  {data.revenue
                    ? new Intl.NumberFormat("en", {
                        style: "currency",
                        minimumFractionDigits: 0,
                        currency: "USD",
                      }).format(data.revenue)
                    : "-"}
                </Info>
                <Info className="modal__status" title="status">
                  {data.status || "unknown"}
                </Info>
                <Info className="modal__status" title="runtime">
                  {data.runtime || data.episode_run_time
                    ? (data.runtime || data.episode_run_time) + "min"
                    : "-"}
                </Info>
                <Info className="modal__countries" title="countries">
                  {data.production_countries?.[0]
                    ? data.production_countries.map((a, i, arr) => (
                        <Fragment key={i}>
                          {i != arr.length - 1 ? a.name + ", " : a.name}
                        </Fragment>
                      ))
                    : "-"}
                </Info>
                {data.type && (
                  <Info className="modal__countries" title="type">
                    {data.type}
                  </Info>
                )}
                {data.seasons && (
                  <Info className="modal__countries" title="episodes">
                    {data.seasons.reduce(
                      (a, b) => a + (b?.episode_count || 0),
                      0
                    )}
                  </Info>
                )}
              </div>
            </div>

            <div className="modal__row" style={{ flexGrow: 1 }}>
              <div className="modal__companies">
                {data.production_companies?.map(
                  (a, i) =>
                    a.logo_path && (
                      <img
                        key={i}
                        src={IMG_BASE_LINK + a.logo_path}
                        alt={a.name}
                      />
                    )
                )}
              </div>
            </div>
            <div className="modal__times" onClick={handleClose}>
              <span>&times;</span>
            </div>
            <Button
              onClick={handleClose}
              sx={{
                "color": "white",
                "backgroundColor": "#003a44",
                "mt": "15px",
                "&:hover": { backgroundColor: "#002d35" },
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <Error err={err} />
    </div>
  );
};

export default CardDetail;
