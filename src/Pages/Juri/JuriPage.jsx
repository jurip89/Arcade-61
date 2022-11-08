import React, { useEffect } from "react";
import "./style.css";

const JuriPage = () => {
  const squares = new Array(256).fill({ name: "space" });
  console.log(squares);
  const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];

  return (
    <div className="container">
      <div className="grid">
        {squares.map((el, i) => (
          <div
            key={i}
            className={
              alienInvaders.includes(i) ? `${el.name} invader` : el.name
            }
          />
        ))}
      </div>
    </div>
  );
};

export default JuriPage;
