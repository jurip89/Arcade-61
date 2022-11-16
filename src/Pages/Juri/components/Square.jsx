import React from "react";

const Square = ({ shooter, name, invader, i,laser,boom }) => {
  return (
      <div className={`${name} ${shooter? "shooter":''} ${laser?'laser': ''}${invader? "invader":''} ${boom?'boom':''}`}
          
        
      />
     
  );
};

export default Square;
