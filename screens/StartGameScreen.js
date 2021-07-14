import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberComponent from '../components/NumberComponent';
import * as Font from 'expo-font';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed]= useState(false);
  const [selectedNumber, setSelectedNumber]= useState();

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler =() => {
      const chosenNumber = parseInt(enteredValue);
      if ( isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber > 99 ) {
        Alert.alert(
          'Invalid number!',
           'Number has to be between 1-99',
            [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}]);
        return;
      };
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = 
    <Card style={styles.summaryContainer}>
      <Text style={{textAlign:'center'}}>You selected</Text>
      <NumberComponent>{selectedNumber}</NumberComponent>
      <Button title='Start Game!' onPress={() => props.onStartGame(selectedNumber)} />
    </Card>
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
               title="Reset" 
               onPress={resetInputHandler} 
               color={Colors.accent} />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    
    
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    alignItems: 'center',
    borderColor:'blue'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal:15,
    borderRadius:20
  },
  button: {
    width: 100,
    //width: Dimensions.get('window').width/3
    
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop:20,

  }
});

export default StartGameScreen;
