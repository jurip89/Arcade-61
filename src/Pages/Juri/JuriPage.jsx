import React, { useEffect, useState } from "react";
import Square from "./components/Square";
import "./style.css";

let laserId = null;
let invadersMovement = null;
const JuriPage = () => {
  const squares = new Array(270).fill({ name: "space" });

  const [alienInvaders, setAlienInvaders] = useState([]);
  const [invadersQuantity, setInvadersQuantity] = useState(91);
  const [result, setResult] = useState(0);
  const [shooter, setShooter] = useState(260);
  const [laser, setLaser] = useState(null);
  const [level, setLevel] = useState(0);
  const [timeMovement, setTimeMovement] = useState(900);
  const [laserSpeed, setlaserSpeed] = useState(60);
  console.log(result);
  console.log(alienInvaders);

  const remove = (alien) => {
    if (alienInvaders.length < 1) {
      clearInterval(invadersMovement);
    }

    const newAliens = alienInvaders.filter((el) => el !== alien);
    setAlienInvaders(newAliens);
    setResult(result + 100);
    setLaser(null);
  };
  const moveInvaders = () => {
    const invadersDown = alienInvaders.map((el) => el + level);
    setAlienInvaders(invadersDown);
    //clearInterval(invadersMovement);
  };

  const startGame = () => {
    invadersMovement = setInterval(moveInvaders, timeMovement);
  };

  //effect for laser
  useEffect(() => {
    if (laser < 0) {
      clearInterval(laserId);
    }
    if (alienInvaders?.includes(laser)) {
      clearInterval(laserId);
      remove(laser);
    }
    if (alienInvaders?.includes(252)) {
      setResult("Game Over!!!");
      setAlienInvaders(undefined);
    }
  }, [laser, alienInvaders]);

  //effect for movement invaders
  useEffect(() => {
    if (alienInvaders?.length > 0) startGame();
  //  if (!alienInvaders) {
  //      clearInterval(invadersMovement);
  //    setResult(0)
  //    }
    //  if (alienInvaders?.length === 0) {
    //    setLevel(level+1)
    //    clearInterval(invadersMovement)
    //  }
    else {
      clearInterval(invadersMovement);
    }
    return () => clearInterval(invadersMovement);
  }, [alienInvaders, level]);

  const moveLaser = () => {
    if (alienInvaders.includes(laser)) {
      remove(laser);
      clearInterval(laserId);
      setLaser(null);
    } else if (laser < 0) {
      clearInterval(laserId);
      setLaser(null);
    } else {
      setLaser((prev) => prev - 18);
    }
  };

  const moveShooter = (e) => {
    if (e.key.startsWith("ArrowLeft") && shooter > 252) {
      setShooter(shooter - 1);
    } else if (e.key.startsWith("ArrowRight") && shooter < 269) {
      setShooter(shooter + 1);
    } else if (e.key.startsWith("ArrowUp")) {
      clearInterval(laserId);
      setLaser(shooter - 18);
      laserId = setInterval(moveLaser, laserSpeed);
    } else {
      return;
    }
  };

  const playGame = () => {
    if (level === 0) {
      const newArr = [];
      for (let i = 0; i <= invadersQuantity; i++) {
        newArr.push(i);
      }
      setAlienInvaders(newArr);
      setLevel(level + 1)
      setResult(0)
    } else {
      setlaserSpeed(Math.floor(laserSpeed*0.75))
      setTimeMovement(Math.floor(timeMovement * 0.85))
      setInvadersQuantity(invadersQuantity + 18)
      const newArr = [];
      for (let i = 0; i <= invadersQuantity; i++) {
        newArr.push(i);
      }
      setAlienInvaders(newArr);
      setLevel(level + 1)
    }
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="score"><h2>SCORE: { result}</h2></div>
        <div className="level"><h2>LEVEL: {level }</h2></div>
      </div>
      <div
        className="grid"
        tabIndex={0}
        onKeyDown={(e) => moveShooter(e)}
        //onClick={()=>startGame()}
      >
        {alienInvaders?.length > 0 &&
          squares.map((el, i) => (
            <Square
              key={i}
              i={i}
              invader={alienInvaders.includes(i)}
              shooter={i === shooter}
              name={el.name}
              laser={i === laser}
              boom={alienInvaders.includes(laser)}
            />
          ))}{" "}
        {!alienInvaders && <p>GAME OVER!</p>}
        {alienInvaders?.length < 1 && result > 99 && (
          <div className="winning-screen">
            <p>YOU WIN!!! YOU PASSED LEVEL {level}</p>
            {level < 10 ? (
              <button onClick={playGame}>Next</button>
            ) : (
              <p>YOU ARE THE CHAMPION!!!!</p>
            )}
          </div>
        )}
        {alienInvaders?.length === 0 && result < 99 && (
          <div className="winnig-screen">
            <button onClick={playGame}>START GAME!</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JuriPage;
