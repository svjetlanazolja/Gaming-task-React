import { useEffect, useState } from "react";
import CardInfo from "../CardInfo/CardInfo";
import CardInfoImages from "../../Assets-img/CardInfoImages/CardInfoImages";
import Button from "../Button.js/Button";
import "./style.css";

const MostPlayedGames = () => {
  const { MOSTPLAYEDGAMES } = CardInfoImages;
  const [mostPlayedGames, setMostPlayedGames] = useState([]);
  useEffect(() => {
    games();
  }, []);

  const games = async () => {
    const response = await fetch("http://localhost:8000/allGames");
    const jsonResponse = await response.json();
    const mostPlayedGamesResponse = jsonResponse.filter(function (i) {
      return i.isMostPlayedGames === true;
    });
    setMostPlayedGames(mostPlayedGamesResponse);
  };

  async function setFavoriteGame(id) {
    const responseGame = await fetch("http://localhost:8000/allGames/" + id);
    const jsonRes = await responseGame.json();
    const val = jsonRes.isFavoriteGames;
    const updateGame = {
      isFavoriteGames: !val,
    };
    fetch("http://localhost:8000/allGames/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateGame),
    });
    window.location.reload();
  }
  function GetImgSource(isFav, path) {
    return isFav ? "/assets/yellow-star.png" : path;
  }

  return (
    <div className="CardContainer">
      <CardInfo title={"Most played Games"} icon={MOSTPLAYEDGAMES} />
      <div className="MostPlayedGamesContainer">
        {mostPlayedGames.map((data) => {
          return (
            <div key={data.id} className="FavoriteWinsData">
              <div className="BigestWinsImage">
                <img src={data.path} alt="Favorite Games" className="GameImg" />
              </div>
              <div className="FavoritetWinsDescription">
                <p>{data.title}</p>
                <div className="DescriptionItem">
                  <p>{data.reels}</p>
                  <p>{data.jackpot}</p>
                  <p>{data.bonus}</p>
                </div>
              </div>
              <div className="BiggestWingsStar">
                <img
                  src={GetImgSource(data.isFavoriteGames, data.starPath)}
                  onClick={() => setFavoriteGame(data.id)}
                  alt="Favorite Games"
                  className="star"
                />
              </div>
            </div>
          );
        })}
        <div className="MostPlayedGamesButton">
          <Button
            onClick={() => {}}
            type="button"
            buttonStyle="btn--more"
            buttonSize="btn--large"
          >
            <span>Show more</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MostPlayedGames;
