import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Button, Alert, Dimensions} from 'react-native';
import NumberComponent from '../components/NumberComponent';
import Card from '../components/Card'

const generateRandomBetween=(min,max, exclude) => {
    min=Math.ceil(min);
    max=Math.floor(max);
    const rndNum=Math.floor(Math.random()*(max-min))+min;
    if(rndNum === exclude ) {
        return generateRandomBetween(min,max);
    }
    
    else{
        return rndNum;
    };
};

const GameScreen = props => {
    const [currentGuess,setCurrentGuess]=useState(generateRandomBetween(1, 100, props.userChoice));
    const [rounds,setRounds]=useState(0);
    const currentLow=useRef(1);
    const currentHigh=useRef(100);
    const {userChoice, onGameOver} = props;
    useEffect(() => {
        if(currentGuess===userChoice) {
            onGameOver(rounds);
        };
    }, [currentGuess, userChoice,onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) ||
          (direction === 'greater' && currentGuess > props.userChoice) ){

            Alert.alert('Don\'t lie!', 'You know it is wrong...', [{text:'Sorry', style:'cancel'}]);
            return;
        }

        if(direction==='lower') {
            currentHigh.current=currentGuess;
        } 

        else {
            currentLow.current=currentGuess;
        };
       const nextNumber= generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
       setCurrentGuess(nextNumber);
       setRounds(curRounds=> curRounds+1)
    };


    return(
        <View style={styles.screen}>
            <Text>Opponet's Guess</Text>
            <NumberComponent>{currentGuess}</NumberComponent>
            <Card style={styles.buttonContainer}>
                <Button title='Lower'   onPress={nextGuessHandler.bind(this,'lower')} />
                <Button title='Greater' onPress={nextGuessHandler.bind(this,'greater')} />

            </Card>
        </View>
    );
};


const styles=StyleSheet.create({
    screen: {
        flex:1,
        padding:10,
        alignItems:'center',
    },

    buttonContainer: {
        flexDirection: 'row',
        width:300,
        maxWidth: '80%',
        justifyContent: 'space-around',
        marginTop:Dimensions.get('window').height>600?20:5,
    }
        

});

export default GameScreen;