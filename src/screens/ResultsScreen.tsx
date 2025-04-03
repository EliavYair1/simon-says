// app/components/ResultsScreen.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Result {
  name: string;
  score: number;
}

interface ResultsScreenProps {
  currentScore: number;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  currentScore,
  onRestart,
}) => {
  const [results, setResults] = useState<Result[]>([]);
  const [playerName, setPlayerName] = useState<string>('');

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    const storedResults = await AsyncStorage.getItem('results');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    }
  };

  const saveResult = async () => {
    if (!playerName) {
      Alert.alert('Please enter your name');
      return;
    }

    const newResult = {name: playerName, score: currentScore};
    const updatedResults = [...results, newResult]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setResults(updatedResults);
    await AsyncStorage.setItem('results', JSON.stringify(updatedResults));
    Alert.alert('Result saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Results</Text>
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text style={styles.resultText}>
            {item.name}: {item.score}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={playerName}
        onChangeText={setPlayerName}
      />

      <TouchableHighlight
        style={styles.saveResultBtn}
        onPress={saveResult}
        underlayColor="#841584">
        <Text style={styles.saveResultText}>Save Result</Text>
      </TouchableHighlight>
      <Text style={styles.resultText}>Your Score: {currentScore}</Text>
      <Button title="Start New Game" onPress={onRestart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
  },
  saveResultBtn: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#841584',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveResultText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ResultsScreen;
