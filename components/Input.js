import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import Colors from '../constants/colors';

const Input = props => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    //borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginVertical: 10,
    borderColor:Colors.accent,
    borderRadius:6,
    borderWidth:2
    
    
  }
});

export default Input;
