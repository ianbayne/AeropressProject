/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  StatusBar,
} from 'react-native';

import {
  STIRRING,
  WATER_TEMPERATURE,
  COFFEE_TO_WATER_RATIO,
  GRIND_AND_BREW_TIME,
  BLOOM_TIME_AND_INVERSION,
} from './src/constants';

const App: () => React$Node = () => {
  const [stirring, setStirring] = useState(null);
  const [waterTemp, setWaterTemp] = useState(null);
  const [coffeeToWaterRatio, setCoffeeToWaterRatio] = useState(null);
  const [grindAndBrewTime, setGrindAndBrewTime] = useState(null);
  const [bloomTimeAndInversion, setBloomTimeAndInversion] = useState(null);

  function selectRandomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function onPress() {
    setStirring(selectRandomItem(STIRRING));
    setWaterTemp(selectRandomItem(WATER_TEMPERATURE));
    setCoffeeToWaterRatio(selectRandomItem(COFFEE_TO_WATER_RATIO));
    setGrindAndBrewTime(selectRandomItem(GRIND_AND_BREW_TIME));
    setBloomTimeAndInversion(selectRandomItem(BLOOM_TIME_AND_INVERSION));
  }

  function grindCoffeeStep() {
    if (coffeeToWaterRatio !== null && grindAndBrewTime !== null) {
      return (
        <Text>
          • Grind
          <Text style={{fontWeight: 'bold'}}>
            {' '}
            {coffeeToWaterRatio.coffee}{' '}
          </Text>
          of coffee to a
          <Text style={{fontWeight: 'bold'}}> {grindAndBrewTime.grind} </Text>
          consistency.
        </Text>
      );
    }
  }

  function heatWaterStep() {
    if (coffeeToWaterRatio !== null && waterTemp !== null) {
      return (
        <Text>
          • Heat
          <Text style={{fontWeight: 'bold'}}> {coffeeToWaterRatio.water} </Text>
          of water to a temperature of
          <Text style={{fontWeight: 'bold'}}> {waterTemp}</Text>.
        </Text>
      );
    }
  }

  function orientationStep() {
    if (bloomTimeAndInversion !== null) {
      return (
        <Text>
          • Put the aeropress in
          <Text style={{fontWeight: 'bold'}}>
            {' '}
            {bloomTimeAndInversion.orientation}{' '}
          </Text>
          orientation and add the coffee.
        </Text>
      );
    }
  }

  function bloomStep() {
    if (bloomTimeAndInversion !== null && bloomTimeAndInversion.bloom) {
      return (
        <Text>
          • Add{' '}
          <Text style={{fontWeight: 'bold'}}>
            {bloomTimeAndInversion.water}
          </Text>{' '}
          and bloom for{' '}
          <Text style={{fontWeight: 'bold'}}>{bloomTimeAndInversion.time}</Text>
          .
        </Text>
      );
    }
  }

  function brewStep() {
    if (grindAndBrewTime !== null) {
      return (
        <Text>
          • Add the remaining water and wait for
          <Text style={{fontWeight: 'bold'}}> {grindAndBrewTime.time}</Text>.
        </Text>
      );
    }
  }

  function stirStep() {
    if (stirring !== null) {
      return `• ${stirring}.`;
    }
  }

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              Welcome to the Aeropress Recipe maker!
            </Text>
          </View>
          <View style={styles.container2}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Randomize</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.steps}>{grindCoffeeStep()}</Text>
            <Text style={styles.steps}>{heatWaterStep()}</Text>
            <Text style={styles.steps}>{orientationStep()}</Text>
            {bloomTimeAndInversion !== null && bloomTimeAndInversion.bloom && (
              <Text style={styles.steps}>{bloomStep()}</Text>
            )}
            <Text style={styles.steps}>{brewStep()}</Text>
            <Text style={styles.steps}>{stirStep()}</Text>
            {stirring !== null && <Text style={styles.steps}>• Press.</Text>}
            {coffeeToWaterRatio !== null &&
              coffeeToWaterRatio.diluteToShare && (
                <Text style={styles.steps}>• Dilute to share.</Text>
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    backgroundColor: '#eefddd',
    borderColor: '#ddd',
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    width: 200,
    backgroundColor: '#eee',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#555',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  container: {
    backgroundColor: '#fff',
  },
  container2: {
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  steps: {
    fontSize: 20,
    lineHeight: 30,
  },
});

export default App;
