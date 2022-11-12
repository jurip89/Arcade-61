import React, { useEffect, useState } from "react";
import Square from "./components/Square";
import "./style.css";

 let laserId = null

const JuriPage = () => {
  const squares = new Array(270).fill({ name: "space" });
  
  const [alienInvaders,setAlienInvaders]=useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39,41,45,48,47,49,51,53,55
  ])
  
  const [result, setResult] = useState(0);
  const [shooter, setShooter] = useState(260)
  const [laser,setLaser]=useState(null)
  const [goingRight, setGoingRight] = useState(true)
 
  console.log(result)
  console.log(alienInvaders)
  
  const remove = (alien) => {
    if (alienInvaders.length <1) {
      setResult('You Win!')
    }
    const newAliens= alienInvaders.filter(el => el !== alien);
    setAlienInvaders(newAliens)
    setResult(result + 100)
    setLaser(null)
    
    
  }
  useEffect(() => {
    if (laser < 0) {
      clearInterval(laserId)
    }
    if (alienInvaders.includes(laser)) {
      clearInterval(laserId)
      remove(laser)
    }
  },[laser,laserId])


  const moveLaser = () => {
    if (alienInvaders.includes(laser)) {
      remove(laser)
      clearInterval(laserId)
      setLaser(null)
    } else if (laser < 0 ) {
      clearInterval(laserId)
      setLaser(null)
    }
    else {
      setLaser(prev => prev - 18)
    }
  }

  const moveShooter = (e) => {
    if (e.key.startsWith('ArrowLeft') && (shooter > 252)) {
      setShooter(shooter - 1)
    }else if(e.key.startsWith("ArrowRight") && (shooter < 269)){
       setShooter(shooter + 1)       
    }
    else if (e.key.startsWith('ArrowUp')) {
      clearInterval(laserId)
      setLaser(shooter - 18)
      laserId = setInterval(moveLaser, 60)
      
    } else { return }
  } 
    

console.log({laser})
  return (
    <div className="container">
      <div className={`${alienInvaders.length > 0 ? 'grid':'win'}`} tabIndex={0}  onKeyDown={(e)=>moveShooter(e)} >
        {alienInvaders.length > 0?squares.map((el, i) => (
          <Square
            key={i}
            i={i}
            invader={alienInvaders.includes(i)}
            shooter={i === shooter}
            name={el.name}
            laser={i === laser}
            
          />
        )):<p>YOU WIN!!!</p>}
      </div>
    </div>
  );
};

export default JuriPage;
