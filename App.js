import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import color from './constant/color';
import choices from './data/mockData';

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    determineWinner();
  }, [userChoice, computerChoice]);
  const handleUserChoice = choice => {
    setUserChoice(choice);
    randomComputerChoice();
  };

  const randomComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    setComputerChoice(choices[randomIndex]?.name);
    setImage(choices[randomIndex]?.image);
  };

  const determineWinner = () => {
    if (computerChoice === userChoice) {
      setResult('TIE!');
    } else if (
      (userChoice === 'Rock' && computerChoice === 'Scissors') ||
      (userChoice === 'Paper' && computerChoice === 'Rock') ||
      (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      setResult('You WIN!');
    } else {
      setResult('LOST!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={color.backGroundColor}
        barStyle={'dark-content'}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Rock-Paper-Scissors</Text>
        <Text style={styles.computerChoiceText}>User's Choice</Text>
        <View style={styles.choices}>
          {choices?.map(choice => (
            <TouchableOpacity
              key={choice.name}
              style={
                userChoice !== choice.name
                  ? [styles.button, {opacity: 0.3}]
                  : styles.button
              }
              onPress={() => handleUserChoice(choice?.name)}>
              <Image style={styles.image} source={choice.image} />
            </TouchableOpacity>
          ))}
        </View>
        {computerChoice && (
          <>
            <Text style={styles.resultText}>{result}</Text>
            <Text style={styles.computerChoiceText}>Computer's Choice</Text>
            <View style={styles.button}>
              <Image source={image} style={[styles.image]}></Image>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.backGroundColor,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.white,
    marginBottom: 20,
  },
  computerChoiceText: {marginVertical: 20, fontSize: 20, color: color.white},
  choice: {},
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: color.white,
  },
  choices: {flexDirection: 'row', justifyContent: 'space-around', gap: 10},
  image: {width: 90, height: 90},
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'orange',
  },
});
