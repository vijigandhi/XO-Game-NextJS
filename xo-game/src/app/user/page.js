'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const router = useRouter();

  // Enable button if both players' names are entered
  const handleInputChange = () => {
    setIsButtonEnabled(player1.trim() !== '' && player2.trim() !== '');
  };

  const startGame = () => {
    // Navigate to the game page with player names in the URL
    router.push(`/game?player1=${encodeURIComponent(player1)}&player2=${encodeURIComponent(player2)}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome to XO Games
        </h1>
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Enter Player Names
        </h1>
        <input
          type="text"
          placeholder="Player 1"
          value={player1}
          onChange={(e) => {
            setPlayer1(e.target.value);
            handleInputChange();
          }}
          className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
        />
        <input
          type="text"
          placeholder="Player 2"
          value={player2}
          onChange={(e) => {
            setPlayer2(e.target.value);
            handleInputChange();
          }}
          className="mb-6 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-200"
        />
  
        <button
          disabled={!isButtonEnabled}
          onClick={startGame}
          className={`w-full py-3 rounded-lg text-white text-lg font-semibold transition duration-300 ${
            isButtonEnabled
              ? 'bg-green-500 hover:bg-green-600 active:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Start Game
        </button>
      </div>
    </div>
  );
  
}
