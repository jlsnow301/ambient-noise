/*jshint esversion: 6 */
import React, { useState, Component } from "react";
import {
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  View,
  TextInput,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";

import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Input from "../components/Input";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import LinkButton from "../components/LinkButton";
import { AuthContext } from "../functions/auth-context";
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationActions, NavigationEvents, NavigationProvider } from "react-navigation";
import SignupScreen from './SignupScreen';
import firebase from 'firebase';


export default class LoginScreen extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter email and/or password to login!');
    } else {
      this.setState({
        isLoading: true,
      });
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res);
        console.log('User logged-in successfully!');
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        });
        this.props.navigation.navigate('ProfileStack');
      })
      .catch(error => this.setState({ errorMessage: error.message }));
    }
  };

  render() {
  return (
    
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
     <LinearGradient
        // Background Linear Gradient
        colors={['#6DD5FA', '#FFFFFF']}
        style={styles.LinearGradient}
      >
      
        <TitleText style={styles.title}>Please Log In to Continue</TitleText>
        
        <View style={styles.inputContainer}>

          
          <TextInput
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={'Enter Email address'}
            placeholderTextColor= '#8e9eab'
            keyboardType="email-address"
            onChangeText={(val) => this.updateInputVal(val, 'email')}
            value={this.state.email}
            
          />
          <TextInput
            style={styles.input}
            blurOnSubmit
            placeholder={'password'}
            placeholderTextColor= '#8e9eab'
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="password"
            secureTextEntry={true}
            onChangeText={(val) => this.updateInputVal(val, 'password')}
            value={this.state.password}
            
          />
          <Button
            title="Log In"
            onPress={() => this.userLogin('ProfileScreen')}
            color={Colors.primary}
          />
          
          <Text 
          style={styles.SigupButton}
          onPress={ () => this.props.navigation.navigate('SignupStack')}
          >Don't have an account Sign Up</Text>
         
         
          <View style={styles.buttonContainer}>
          <LinkButton>Connect With Apple</LinkButton>
          <LinkButton>Connect With Google</LinkButton>
          <LinkButton>Connect With Facebook</LinkButton>
        </View>
      
      </View>
      </LinearGradient>
      
    </TouchableWithoutFeedback>
    
  );
}
}

// Styles

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    
  },
  title: {
    fontSize: 20,
    marginTop: 70,
    marginBottom: 20,
    color: "#006AFF",
  },
  inputContainer: {
    width: 350,
    maxWidth: "90%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    maxWidth: "80%",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input: {
    width: "90%",
    textAlign: "center",
    borderRadius: 5,
    padding: 12,
    backgroundColor: 'white',
    marginBottom: 18,

  },
  
  buttonContainer: {
    height: 300,
    width: 300,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  LinearGradient: 
  {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },
  LinkButton:
  {
    borderRadius: 15,
  },
  SigupButton: {
    padding: 10,
    color: '#006AFF',
    fontSize: 18,
    textAlign: 'center'
  },
  
});
