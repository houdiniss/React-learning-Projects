import React from "react";


export default function GameBoard({ onSelectSquare , board }) {
  return (
    <div id="game-board">
      {board.map((row , rowIndex) => 
        <div key={rowIndex}>
          <ol>
            {row.map((playerSymbol , colIndex) => 
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex , colIndex)} disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            )}
          </ol>
        </div>
      )}
    </div>
)}
