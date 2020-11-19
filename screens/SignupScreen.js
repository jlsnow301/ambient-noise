import React, { useState } from "react";
import {
  Text,
  View,
  Alert,
  Button,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import * as firebase from "firebase";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import { LinearGradient } from "expo-linear-gradient";

const SignupScreen = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredVerify, setEnteredVerify] = useState("");
  const [confirmedDetails, setConfirmedDetails] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // Changes what is displayed as the user types
  const emailInputHandler = (value) => {
    setEnteredEmail(value);
  };

  // Changes what is displayed as the user types
  const passwordInputHandler = (value) => {
    setEnteredPassword(value);
  };

  // Changes what is displayed as the user types
  const verifyInputHandler = (value) => {
    setEnteredVerify(value);
  };

  // Clears the displayed values
  const resetInputHandler = () => {
    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredVerify("");
  };

  const signupHandler = () => {
    // Email is blank or less than 5
    const email = enteredEmail.toString();
    if (email === "" || email.length < 5) {
      Alert.alert(
        "Invalid Email!",
        "You must type in an email address. Minimum 5 characters.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    // Password is blank or less than 5
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
    // Passwords do not match
    const verify = enteredVerify.toString();
    if (verify === "" || verify.length < 5 || verify !== enteredPassword) {
      Alert.alert(
        "Invalid Verification!",
        "Your passwords must match. Minimum 5 characters.",
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
    // If nothing has failed yet,
    setIsLoading(true);
    // Call the authentication function to create an account
    firebase
      .auth()
      .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
      .then((res) => {
        res.user.updateProfile({
          email: enteredEmail,
        });
        console.log("User registered successfully!");
        resetInputHandler();
        props.navigation.navigate("LoginStack");
      })
      .catch((error) => setError({ errorMessage: error.message }));

    setIsLoading(false);
    resetInputHandler();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={["#6DD5FA", "#FFFFFF"]}
        style={styles.linearGradient}
      >
        <TitleText style={styles.title}>Create an account</TitleText>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={"email address"}
            placeholderTextColor="#8e9eab"
            keyboardType="email-address"
            onChangeText={emailInputHandler}
            value={enteredEmail}
          />
          <TextInput
            style={styles.input}
            blurOnSubmit
            placeholder={"password"}
            placeholderTextColor="#8e9eab"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={passwordInputHandler}
            value={enteredPassword}
          />
          <TextInput
            style={styles.input}
            blurOnSubmit
<<<<<<< HEAD
            placeholder={' cofirm-password'}
            placeholderTextColor= '#8e9eab'
=======
            placeholder={"re-enter password"}
            placeholderTextColor="#8e9eab"
>>>>>>> 889eac44436b254a2812f7d903b6621593959ae5
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={verifyInputHandler}
            value={enteredVerify}
          />
          <MainButton onPress={signupHandler} color={Colors.primary}>
            Sign Up
          </MainButton>
          <Text
            style={styles.loginButton}
            onPress={() => props.navigation.navigate("LoginStack")}
          >
            Already Registered? Click here to login.
          </Text>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  linearGradient: {
    opacity: 0.95,
    height: "100%",
    width: "100%",
  },
  title: {
    marginVertical: 20,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "90%",
    textAlign: "center",
    borderRadius: 5,
    padding: 12,
    backgroundColor: "white",
    marginBottom: 18,
  },
  loginButton: {
    marginTop: 25,
    color: "#006AFF",
    fontSize: 18,
    textAlign: "center",
  },
});
