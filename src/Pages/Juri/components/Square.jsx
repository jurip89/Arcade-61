import React from "react";

const Square = ({ shooter, name, invader, i,laser }) => {
  return (
      <div className={`${name} ${shooter? "shooter":''} ${invader? "invader":''} ${laser?'laser': ''}`}
          
        
      >
      {i}
    </div>
  );
};

export default Square;
