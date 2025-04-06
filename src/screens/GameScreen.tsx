import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

interface GameScreenProps {
  onGameOver: (score: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({onGameOver}) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // status: 'idle', 'showing', 'userTurn', 'gameOver'
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const colors = ['red', 'green', 'blue', 'yellow'];
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Start a new game
  const startGame = () => {
    setScore(0);
    setSequence([]);
    setUserInput([]);
    addToSequence();
  };

  // Add a random color to the sequence
  const addToSequence = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...sequence, newColor];
    setSequence(newSequence);

    timeoutRef.current = setTimeout(() => {
      showSequence(newSequence);
    }, 1000);
  };

  // Show the sequence to the player
  const showSequence = (sequenceToShow: string[]) => {
    setGameState('showing');
    setActiveColor(null);

    const showColors = (index: number) => {
      if (index >= sequenceToShow.length) {
        setActiveColor(null);
        setGameState('userTurn');
        return;
      }

      // Show the current color
      setActiveColor(sequenceToShow[index]);

      timeoutRef.current = setTimeout(() => {
        setActiveColor(null);

        timeoutRef.current = setTimeout(() => {
          showColors(index + 1);
        }, 300);
      }, 800);
    };

    showColors(0);
  };

  // Handle when the player presses a color button
  const handleColorPress = (color: string) => {
    if (gameState !== 'userTurn') return;

    setActiveColor(color);
    timeoutRef.current = setTimeout(() => {
      setActiveColor(null);
    }, 300);

    const newUserInput = [...userInput, color];
    setUserInput(newUserInput);

    const currentStep = userInput.length;
    if (color !== sequence[currentStep]) {
      setGameState('gameOver');

      timeoutRef.current = setTimeout(() => {
        onGameOver(score);
      }, 1500);
      return;
    }

    // Check if the user has completed the sequence
    if (newUserInput.length === sequence.length) {
      setScore(score + 1);
      setUserInput([]);

      timeoutRef.current = setTimeout(() => {
        addToSequence();
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Current Score: {score}</Text>

      {gameState === 'idle' && (
        <Text style={styles.instruction}>Press Start to begin</Text>
      )}
      {gameState === 'showing' && (
        <Text style={styles.instruction}>Watch the sequence...</Text>
      )}
      {gameState === 'userTurn' && (
        <Text style={styles.instruction}>Your turn! Repeat the sequence</Text>
      )}
      {gameState === 'gameOver' && (
        <Text style={styles.gameOverText}>Game Over!</Text>
      )}

      <View style={styles.buttonContainer}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            onPress={() => handleColorPress(color)}
            disabled={gameState !== 'userTurn'}
            style={[
              styles.button,
              {backgroundColor: color},
              activeColor === color && styles.activeButton,
            ]}>
            <Text style={styles.buttonText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {gameState === 'idle' && (
        <Button title="Start Game" onPress={startGame} />
      )}

      {gameState === 'userTurn' && (
        <Text style={styles.progress}>
          {userInput.length} / {sequence.length}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
  },
  score: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  instruction: {
    fontSize: 18,
    marginBottom: 30,
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  button: {
    padding: 35,
    margin: 10,
    borderRadius: 10,
    width: '40%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    opacity: 1,
    borderWidth: 3,
    borderColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  progress: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 30,
  },
});

export default GameScreen;
