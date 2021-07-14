import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>Game Over!</Text>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title='New Game' onPress={props.onRestart} />
        </View>
    );

};

const styles= StyleSheet.create({
    screen: {
        flex:1,
        padding:10,
        alignItems:'center',
    },

});


export default GameOverScreen;