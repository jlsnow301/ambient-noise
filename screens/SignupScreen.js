/*jshint esversion: 6 */
import React, { useState, useContext, Component } from "react";
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
} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationActions, NavigationEvents, NavigationProvider } from "react-navigation";
import Input from "../components/Input";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import LinkButton from "../components/LinkButton";
import { AuthContext } from "../functions/auth-context";
import { LinearGradient } from 'expo-linear-gradient';
import { render } from "react-dom";
import LoginScreen from './LoginScreen';
import firebase from 'firebase';


export default class SignupScreen extends Component {

  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      password_: '',
      isLoading: false
    };
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    // Check if the two passwords are matching
    if(this.state.password != this.state.password_) {
      Alert.alert('The two passwords are not matching');
    } else {
      this.state.password_ == this.state.password;
    }
    if(this.state.email === '' && this.state.password === '' && this.state.password_ === '') {
      Alert.alert('Please enter a valid email and/or password to signup!');
        
    } else{
      this.setState({
        isLoading: true,
      });
      // call the authentication function to create an account
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          email: this.state.email
        });
        console.log('User registered successfully!');
        this.setState({
          isLoading: false,
          email: '', 
          password: '',
          password_: ''
        });
        this.props.navigation.navigate('LoginStack');
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
        <TitleText style={styles.title}>Create an account</TitleText>
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
          <TextInput
            style={styles.input}
            blurOnSubmit
            placeholder={'Re-Enter password'}
            placeholderTextColor= '#8e9eab'
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="password"
            secureTextEntry={true}
            onChangeText={(val) => this.updateInputVal(val, 'password_')}
            value={this.state.password_}
          />
          <Button
            title="Sign Up"
            onPress={() => this.registerUser()}
            color={Colors.primary}
          />
           <Text 
          style={styles.LoginButton}
          onPress={() => this.props.navigation.navigate('LoginStack')}>
          Already Registered? Click here to login
        </Text>   
            </LinearGradient>
      
      
    </TouchableWithoutFeedback>



        )
    };

};
// Create the page styles
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
    width: 300,
    maxWidth: "80%",
    alignItems: 'stretch',
    
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
  LoginButton: {
    padding: 10,
    color: '#006AFF',
    fontSize: 18,
    textAlign: 'center'
  },
  
});
