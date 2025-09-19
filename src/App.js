import React, { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [curchance, setCurchance] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner(board) {
    for (let combo of winners) {
      if (
        board[combo[0]] &&
        board[combo[0]] === board[combo[1]] &&
        board[combo[1]] === board[combo[2]]
      ) {
        return board[combo[0]];
      }
    }
    return null;
  }

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = curchance;

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setBoard(newBoard);
      setWinner(gameWinner);
      return;
    }

    if (!newBoard.includes(null)) {
      setBoard(newBoard);
      setIsTie(true);
      return;
    }

    setBoard(newBoard);
    setCurchance(curchance === "X" ? "O" : "X");
    placeO(newBoard)
  };

  const placeO = (currentBoard) => {
    let ind = 0
    ind = willWin("O", currentBoard);
    if(ind===-1)
    {
      ind = willWin("X", currentBoard);
    if (ind === -1) {
      // if(currentBoard[4] === null){
      //   ind = 4;
      // } else
         if(currentBoard[4] === null){
        ind = 4;
      }
      else {
        const res = [];
      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) res.push(i);
      }
      const rind = res[Math.floor(Math.random() * res.length)];
      ind = rind;
      }
    }
    }
    

    let newBoard = [...currentBoard];
    newBoard[ind] = "O";

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setBoard(newBoard);
      setWinner(gameWinner);
      return;
    }

    if (!newBoard.includes(null)) {
      setBoard(newBoard);
      setIsTie(true);
      return;
    }

    setBoard(newBoard);
    setCurchance("X");
  };

  const willWin = (val, currentBoard) => {
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        let temp = [...currentBoard];
        temp[i] = val;
        if (checkWinner(temp)) {
          return i;
        }
      }
    }
    return -1;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurchance("X");
    setWinner(null);
    setIsTie(false);
  };

  return (
    <div className="game-container">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      {winner && <h2 className="result">Winner: {winner}</h2>}
      {isTie && <h2 className="result">It's a Tie!</h2>}
      {(winner || isTie) && (
        <button className="restart-btn" onClick={resetGame}>
          Reset
        </button>
      )}
    </div>
  );
}
export default App;