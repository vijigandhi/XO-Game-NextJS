'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function XOGame() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);
  const [modalText, setModalText] = useState('');
  const [winningCells, setWinningCells] = useState([]); 
  const searchParams = useSearchParams(); //retrieves the current search parameters from the URL-query parameters

  // Retrieve player names from query parameters 
  const player1 = searchParams.get('player1');
  const player2 = searchParams.get('player2');

  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const handleCellClick = (index) => {
    if (board[index] !== '' || !gameActive) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);
    console.log(updatedBoard);
    
    const winner = checkWinner(updatedBoard);
    if (winner) {
      setGameActive(false);
      setWinningCells(winner); // Highlight winning cells
      setModalText(`${currentPlayer === 'X' ? player1 : player2} Wins!`);
    } else if (!updatedBoard.includes('')) {
      setGameActive(false);
      setModalText('It\'s a Draw!');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board) => {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      console.log("a:"+a);
      console.log("b:"+b);
      console.log("c:"+c);
      
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        console.log([a, b, c]);

        return [a, b, c]; 
        
      }
    }
    return null; 
  };
  

  const restartGame = () => {
    setBoard(Array(9).fill('')); 
    setCurrentPlayer('X'); 
    setGameActive(true);
    setModalText(''); 
    setWinningCells([]); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500 relative">
      <h1 className="text-4xl font-extrabold text-white z-10 mb-8">XO - Game</h1>
  
      <div className="text-xl font-semibold text-white mb-6">
        {currentPlayer === 'X' ? player1 : player2}'s Turn ({currentPlayer})
      </div>
  
      <div className="grid grid-cols-3 gap-4 z-10 bg-white p-6 rounded-lg shadow-xl">
        {board.map((value, index) => (
          <div
            key={index}
            className={`w-24 h-24 flex items-center justify-center text-4xl font-bold border border-gray-300 cursor-pointer transition-colors duration-300
              ${winningCells.includes(index) ? 'bg-green-500 text-white animate-pulse' : 'hover:bg-green-200'}`} // Highlight winning cells
            onClick={() => handleCellClick(index)}
          >
            <span>{value}</span>
          </div>
        ))}
      </div>
  
      <button
        className="mt-8 bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-green-500 hover:text-white transition duration-300 ease-in-out z-10"
        onClick={restartGame}
      >
        Restart Game
      </button>
  
      {modalText && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-lg shadow-2xl relative max-w-xs w-full">
            <p className="text-xl font-bold text-center mb-6">{modalText}</p>
            <button 
              className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
              onClick={restartGame}
            >
              Play Again
            </button>
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition duration-200"
              onClick={() => setModalText('')}  // Close the modal
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
