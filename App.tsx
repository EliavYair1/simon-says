// app/App.tsx
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import GameScreen from './src/screens/GameScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const App: React.FC = () => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);

  const handleGameOver = (score: number) => {
    setIsGameOver(true);
    setCurrentScore(score);
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setCurrentScore(0);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {isGameOver ? (
        <ResultsScreen currentScore={currentScore} onRestart={handleRestart} />
      ) : (
        <GameScreen onGameOver={handleGameOver} />
      )}
    </SafeAreaView>
  );
};

export default App;
