import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";


import Input from "../components/Input";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import LinkButton from "../components/LinkButton";
import { AuthContext } from "../functions/auth-context";
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationActions, NavigationEvents, NavigationProvider, createStackNavigator } from "react-navigation";
import SignupScreen from './SignupScreen';
import * as firebase from 'firebase';
//import navigation from '../navigation/StackNavigator';


// Testing only
let DUMMY_NAME = "Joe";
let DUMMY_IMAGE = "../assets/logo.png";
let DUMMY_TOKEN = "123456abcdef";

const LoginScreen = (props) => {
  const auth = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  // Changes what is displayed as the user types
  const emailInputHandler = (value) => {
    setEnteredEmail(value);
  };

  // Changes what is displayed as the user types
  const passwordInputHandler = (value) => {
    setEnteredPassword(value);
  };

  // Clears the displayed values
  const resetInputHandler = () => {
    setEnteredEmail("");
    setEnteredPassword("");
  };

  const textPressHandler = () => {
    
  }

  // User hits submit. Validated, then entered.
  // Currently leading to nowhere.
  const loginHandler = () => {
    const email = enteredEmail.toString();
    if (email === "" || email.length < 5) {
      Alert.alert("Invalid Email!", "You must type in an email address.", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    // So for now we're taking this and checking it here, not sending it anywhere
    const password = enteredPassword.toString();
    if (password === "" || password.length < 5) {
      Alert.alert(
        "Invalid Password!",
        "You must type in a password. Minimum 5 characters.",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: resetInputHandler,
          },
        ]
      );
      return;
    }
    // We have no server so there's nothing giving us user info on login.
    auth.login(DUMMY_NAME, DUMMY_IMAGE, enteredEmail, DUMMY_TOKEN);
    Keyboard.dismiss();
  };
 
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
          <Button
            title="Continue"
            onPress={loginHandler}
            color={Colors.primary}
          />
          
          <Text 
          style={styles.SigupButton} 
          onPress={ () => navigator.navigate('../LoginStack/SignupScreen')
          }
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
};

export default LoginScreen;

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
  SigupButton: {
    padding: 10,
    color: '#006AFF',
    fontSize: 18,
    textAlign: 'center'
  },
  
});
