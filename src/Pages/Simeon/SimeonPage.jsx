import React from "react";
import { useEffect, useState } from "react";
// const fieldX = 120;
// const fieldY = 80;
const initBlue = [[1, 40]];
const initRed = [[118, 40]];
const scale = 10;
const timeDelay = 50;

let blue = [...initBlue];
let red = [...initRed];
let direction = [
  [1, 0],
  [-1, 0],
];
let prevDir = ["R", "L"];
let delay = null;
let gameOver = false;
let gameLoop = null;
let win = null;
const SimeonPage = () => {
  const [field, setField] = useState(null);

  //   console.log(delay, gameLoop);
  if (delay && !gameLoop) {
    gameLoop = setInterval(() => runGame(), delay);
  }

  const checkGameOver = () => {
    if (gameOver) {
      clearInterval(gameLoop);
      gameLoop = null;
      return true;
    }
    return false;
  };

  const render = () => {
    //draw stuff
    const showBlock = (x, y, value) => {
      //
      let color = "";
      switch (value) {
        case 0:
          return;
        case 1:
          color = "grey";
          break;
        case 2:
          color = "blue";
          break;
        case 3:
          color = "red";
          break;
        case 4:
          color = "#e1e1ff";
          break;
        case 5:
          color = "#ffe1e1";
          break;
        default:
          break;
      }
      return (
        <rect width="10" height="10" x={x * scale} y={y * scale} fill={color} />
      );
    };
    const drawBorder = () => {
      return (
        <g>
          <rect width="10" height="800" x="1190" y="0" fill="grey" />
          <rect width="10" height="800" x="0" y="0" fill="grey" />
          <rect width="1200" height="10" x="0" y="0" fill="grey" />
          <rect width="1200" height="10" x="0" y="790" fill="grey" />
        </g>
      );
    };
    const drawRiders = () => {
      return (
        <g>
          {showBlock(blue[0][0], blue[0][1], 2)}
          {showBlock(red[0][0], red[0][1], 3)}
        </g>
      );
    };
    const drawPath = () => {
      return (
        <g>
          {blue.map((b) => showBlock(b[0], b[1], 4))}
          {red.map((r) => showBlock(r[0], r[1], 5))}
        </g>
      );
    };
    const drawWinner = () => {
      if (gameOver && win) {
        return (
          <g>
            <rect
              width={200}
              height={200}
              x="500"
              y="300"
              fill={win === "tie" ? "green" : win === "red" ? "RED" : "BLUE"}
            />
            <text x="580" y="390" fill="white">
              {win === "tie" ? "" : win === "red" ? "RED" : "BLUE"}
            </text>
            <text x="580" y="430" fill="white">
              {win === "tie" ? "TIE" : "WON"}
            </text>
          </g>
        );
      } else return;
    };
    const genSVG = () => {
      return (
        <svg
          // viewBox={`${zoom.x} ${zoom.y} ${600 * zoom.mag} ${750 * zoom.mag}`}
          width={1200}
          height={800}
          version="1.1"
        >
          <rect width={1200} height={800} x="0" y="0" fill="#2e2e2e" />
          {drawBorder()}
          {drawPath()}
          {drawRiders()}
          {drawWinner()}
        </svg>
      );
    };
    setField(genSVG());
  };

  const play = () => {
    gameLoop = null;
    blue = [...initBlue];
    red = [...initRed];
    direction = [
      [1, 0],
      [-1, 0],
    ];
    gameOver = false;
    delay = timeDelay;
    prevDir = ["R", "L"];
    win = null;
    render();
  };

  const checkCollision = (b, r) => {
    const check = (rider, path) => {
      const col = path.find((p) => p[0] === rider[0] && p[1] === rider[1]);
      if (col) return true;
      if (rider[0] === 0 || rider[0] === 119) return true;
      if (rider[1] === 0 || rider[1] === 79) return true;
      return false;
    };
    if (
      (check(b, red) || check(b, blue)) &&
      (check(r, blue) || check(r, red))
    ) {
      console.log("tie");
      win = "tie";
      return true;
    }
    if (check(b, red) || check(b, blue)) {
      console.log("red won");
      win = "red";
      return true;
    }
    if (check(r, blue) || check(r, red)) {
      console.log("blue won");
      win = "blue";
      return true;
    }
    return false;
  };

  const runGame = () => {
    //
    if (checkGameOver()) {
      return;
    }
    //move
    const newBlue = [
      blue[0][0] + direction[0][0],
      blue[0][1] + direction[0][1],
    ];
    const newRed = [red[0][0] + direction[1][0], red[0][1] + direction[1][1]];
    //collisions
    if (checkCollision(newBlue, newRed)) {
      gameOver = true;
    }
    blue = [newBlue, ...blue];
    red = [newRed, ...red];
    render();
  };
  const changeDirection = (e) => {
    // eslint-disable-next-line default-case
    switch (e.key) {
      case "ArrowLeft":
        if (prevDir[1] !== "R") {
          direction = [direction[0], [-1, 0]];
          prevDir = [prevDir[0], "L"];
        }
        break;
      case "ArrowUp":
        if (prevDir[1] !== "D") {
          direction = [direction[0], [0, -1]];
          prevDir = [prevDir[0], "U"];
        }
        break;
      case "ArrowRight":
        if (prevDir[1] !== "L") {
          direction = [direction[0], [1, 0]];
          prevDir = [prevDir[0], "R"];
        }
        break;
      case "ArrowDown":
        if (prevDir[1] !== "U") {
          direction = [direction[0], [0, 1]];
          prevDir = [prevDir[0], "D"];
        }
        break;
      case "a":
        if (prevDir[0] !== "R") {
          direction = [[-1, 0], direction[1]];
          prevDir = ["L", prevDir[1]];
        }
        break;
      case "w":
        if (prevDir[0] !== "D") {
          direction = [[0, -1], direction[1]];
          prevDir = ["U", prevDir[1]];
        }
        break;
      case "d":
        if (prevDir[0] !== "L") {
          direction = [[1, 0], direction[1]];
          prevDir = ["R", prevDir[1]];
        }
        break;
      case "s":
        if (prevDir[0] !== "U") {
          direction = [[0, 1], direction[1]];
          prevDir = ["D", prevDir[1]];
        }
        break;
    }
  };

  useEffect(() => {
    //keyboard
    document.addEventListener("keydown", changeDirection, true);
    render();
  }, []);

  useEffect(() => {
    render();
  }, [win]);

  //
  //PAGE
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <br />
      <button onClick={play}>PLAY</button>
      {/* <button onClick={runGame}>+1</button> */}
      <br />
      <br />
      {field}
    </div>
  );
};

export default SimeonPage;
