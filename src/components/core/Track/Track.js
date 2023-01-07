import "../../../styles/core/track.css";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Icon from "../Icon";
import SmallCard from "./SmallCard";
import useGlobalContext from "../../../hooks/useGlobalContext";
import { useState, useEffect } from "react";

const Track = ({ title, movies, type }) => {
  const [error,setError] = useState({state:false,msg:''});
  const { state } = useGlobalContext();

  useEffect(()=>{
    if (state[type].error.state === true) {
      setError({state: true,msg: state[type].error.msg}); 
      console.log('entered!');
    }
  },[state[type].error.state])


  if (state[type].isLoading) {
    return <h2>Loading...</h2>
  }


  return (
    <div className="track">
      {error.state && <h2>Error: {error.msg}</h2>}
      <header className="track__header">
        <h2 className="track__title">{title}</h2>
      </header>
      <Splide
        className="track__slider"
        options={{
          perPage: 7,
          gap: 24,
          pagination: false,
          breakpoints: {
            992: {
              perPage: 4,
            },
            578: {
              perPage: 3,
            },
            360: {
              perPage: 2,
            },
          },
        }}
        hasTrack={false}
      >
        <SplideTrack>
          {movies?.map((movie) => (
            <SplideSlide className="track__slide">
              <SmallCard {...movie} key={movie.id} />
            </SplideSlide>
          ))}
        </SplideTrack>
        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev track__slider-arrow">
            <Icon>arrow</Icon>
          </button>
          <button className="splide__arrow splide__arrow--next track__slider-arrow">
            <Icon>arrow</Icon>
          </button>
        </div>
      </Splide>
    </div>
  );
};

export default Track;
