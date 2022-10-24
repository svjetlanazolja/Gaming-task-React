import Slider from "react-slick";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const GameSlider = () => {
  const [recommendedGames, setRecommendedGames] = useState([]);
  useEffect(() => {
    games();
  }, []);

  const games = async () => {
    const response = await fetch("http://localhost:8000/recommendedGames");
    setRecommendedGames(await response.json());
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 4,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesPerRow: 3,
        }
      },
      {
          breakpoint: 768,
          settings: {
            slidesPerRow: 2,
            rows: 1,
          }
        },
        {
          breakpoint: 375,
          settings: {
            slidesPerRow: 1,
            rows: 1,
          }
        }
      ]
  };

  return (
    <div className="gameSlider" id="recommendedGamesCard">
      <h2>Recommended</h2>
      <Slider {...settings}>
        {recommendedGames.map((data) => {
          return (
            <div key={data.id} className="recommendedGamesCard">
              {/* <div style={{ padding: "10px" }} className="cartImg"> */}
              <div className="cartImg">
                <img
                  src={data.path}
                  alt="Recommended Games"
                  className="GameImg"
                />
              </div>

              <div className="cardDescriptionContainer" >
                <div className="cardDescription">
                  <p>{data.title}</p>
                  <img
                    src={data.starPath}
                    alt="Recommended Games"
                    className="star"
                  />
                </div>
              </div>

              <div className="cardItems">
                <div className="fill"><p className="p-inCards">{data.reels}</p></div>
                <div className="fill"><p className="p-inCards">{data.jackpot}</p></div>
                <div className="fill"><p className="p-inCards">{data.freespin}</p></div>
              </div>
              <div>
              <img
                    src={data.icon}
                    alt="Recommended Games"
                    className="star"
                  />
              </div>
             
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default GameSlider;