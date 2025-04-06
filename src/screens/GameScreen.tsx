// app/components/GameScreen.tsx
import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

interface GameScreenProps {
  onGameOver: (score: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({onGameOver}) => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const colors = useMemo(() => ['red', 'green', 'blue', 'yellow'], []);

  // adds a new random color to the sequence
  const addToSequence = useCallback(() => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence(prevSequence => [...prevSequence, newColor]);
  }, [colors]);

  // effect that checks if the user's input matches the sequence
  useEffect(() => {
    if (userInput.length === sequence.length) {
      if (JSON.stringify(userInput) === JSON.stringify(sequence)) {
        setScore(prevScore => prevScore + 1);
        setUserInput([]);
        addToSequence();
      } else {
        onGameOver(score);
      }
    }
  }, [userInput, sequence, onGameOver, score, addToSequence]);

  console.log('sequence', sequence);

  // handles the button click by adding the selected color to user input
  const handleButtonClick = (color: string) => {
    setUserInput(prevInput => [...prevInput, color]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Current Score: {score}</Text>
      <View style={styles.buttonContainer}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            onPress={() => handleButtonClick(color)}
            style={[styles.button, {backgroundColor: color}]}>
            <Text style={styles.buttonText}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Start" onPress={addToSequence} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    alignItems: 'center',
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GameScreen;
