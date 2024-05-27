import { useState } from "react";

export default function Player({ initialName , symbol , isActive , onChangeName }) {
  const [ isClicked , setIsClicked ] = useState(false);
  const [ name , setName ] = useState(initialName);
  let playerName = <span className="player-name">{name}</span>;

////
  function handleClick() {
    setIsClicked((clicked) => !clicked);

    if(isClicked) {
      onChangeName(symbol , playerName);
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }


  if(isClicked) {
    playerName = <input type="text" required value={name} onChange={handleChange} ></input>
  }
////


  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isClicked ? "Save" : "Edit"}</button>
    </li>
  )
}