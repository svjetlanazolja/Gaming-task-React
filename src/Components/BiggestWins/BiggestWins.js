import { useEffect, useState } from "react";
import CardInfo from "../CardInfo/CardInfo";
import CardInfoImages from "../../Assets-img/CardInfoImages/CardInfoImages";
import "./style.css";

const BiggestWins = () => {
  const { BIGGESTWINS } = CardInfoImages;
  const [biggestWins, setBiggestWins] = useState([]);
  useEffect(() => {
    games();
  }, []);

  const games = async () => {
    const response = await fetch("http://localhost:8000/allGames");
    const jsonResponse = await response.json();
    const biggestWinsResponse = jsonResponse.filter(function (i) {
      return i.isBiggestWins === true;
    });
    setBiggestWins(biggestWinsResponse);
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
  function GetImgSource(isFav, path) 
  {
    return isFav ? "/assets/yellow-star.png" : path;
  }

  return (
    <div className="CardContainer width25">
      <CardInfo title={"Biggest Wins"} icon={BIGGESTWINS} />
      <div className="BiggestWinsContainer">
        {biggestWins.map((data) => {
          return (
            <div key={data.id} className="BigestWinsData">
              <div className="BigestWinsImage">
                <img src={data.path} alt="Biggest Wins" className="GameImg" />
              </div>
              <div className="BigestWinsDescription">
                <p>{data.title}</p>
                <p className="p-bold height">{data.slot}</p>
                <p className="p-bold">{data.price}</p>
              </div>
              <div className="BiggestWingsStar">
                <img
                  src={GetImgSource(data.isFavoriteGames, data.starPath)}
                  onClick={() => setFavoriteGame(data.id)}
                  alt="Biggest Wins"
                  className="star"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BiggestWins;
