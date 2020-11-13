import React, { useState, useContext, Component } from "react";
import {
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  View,
  TextInput,
  Text,
} from "react-native";
import Input from "../components/Input";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import LinkButton from "../components/LinkButton";
import { AuthContext } from "../functions/auth-context";
import { LinearGradient } from 'expo-linear-gradient';
import { render } from "react-dom";
import LoginScreen from './LoginScreen';
import * as firebase from 'firebase';
// import { AsyncStorage} from "react-native-community";








export default class Signup extends Component {


// state = { email: "", password: "", errorMessage: null};
// componentDidMount() {

// }

// const handleSignUp = () => {
//  const firebase
//   .auth()
//   .createUserWithEmailAndPassword(this.state.email, this.state.password)
//   .then(() => this.props.navigation.navigate("LoginScreen"))
//   .catch(error => this.setState({errorMessage: error.message}));
// }


  
    render() {
        return (
            <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
          <View style={styles.screen}>
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
            onChangeText={emailInputHandler}
            value={enteredEmail}
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
            onChangeText={passwordInputHandler}
            value={enteredPassword}
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
            onChangeText={passwordInputHandler}
            value={enteredPassword}
          />
          <Button
            title="Sign Up"
            onPress={loginHandler}
            color={Colors.primary}
          />
            </LinearGradient>
      </View>
      
    </TouchableWithoutFeedback>



        )
    };

};

