import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import PlayIcon from "../PlayIcon";

const DetailsBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  const genres = data?.genres.map((genre) => genre.id);

  const directors = crew?.filter((c) => c.job === "Director");
  const writers = crew?.filter(
    (w) => w.job === "Screenplay" || w.job === "Screenplay" || w.job === "Story"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading && data ? (
        <>
          <div className="backdrop-img">
            <Img src={url.backdrop + data.backdrop_path} />
          </div>
          <div className="opacity-layer" />
          <ContentWrapper>
            <div className="content">
              <div className="left">
                {data.poster_path ? (
                  <Img
                    className="posterImg"
                    src={url.backdrop + data.poster_path}
                  />
                ) : (
                  <Img className="posterImg" src={PosterFallback} />
                )}
              </div>
              <div className="right">
                <div className="title">
                  {`${data.name || data.original_title} (${dayjs(
                    data.release_date
                  ).format("YYYY")})`}
                </div>

                <div className="subtitle">{data.tagline}</div>
                <Genres data={genres} />
                <div className="row">
                  <CircleRating rating={data.vote_average.toFixed(1)} />
                  <div className="playbtn">
                    <PlayIcon />
                    <div className="span">Watch Trailer</div>
                  </div>
                </div>

                <div className="overview">
                  <div className="heading">Overview</div>
                  <div className="description">{data.overview}</div>
                </div>

                <div className="info">
                  {data.status && (
                    <div className="infoItem">
                      <span className="text bold">Status: </span>
                      <span className="text">{data.status}</span>
                    </div>
                  )}

                  {data.release_date && (
                    <div className="infoItem">
                      <span className="text bold">Release Date: </span>
                      <span className="text">
                        {dayjs(data.release_date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  )}

                  {data.runtime && (
                    <div className="infoItem">
                      <span className="text bold">Runtime: </span>
                      <span className="text">
                        {toHoursAndMinutes(data.runtime)}
                      </span>
                    </div>
                  )}
                </div>
                {directors.length > 0 && (
                  <div className="info">
                    <span className="text bold">Director: </span>
                    <div className="text">
                      {directors?.map((director, idx) => {
                        return (
                          <>
                            <span key={director.id}>{director.name}</span>
                            {
                              //checking to add comma only till 2nd last index
                              directors.length - 1 !== idx && ", "
                            }
                          </>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ContentWrapper>
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
