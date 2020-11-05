import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  View,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import TitleText from "../components/TitleText";
import LinkButton from "../components/LinkButton";
import { AuthContext } from "../functions/auth-context";

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
    auth.login({
      DUMMY_NAME,
      DUMMY_IMAGE,
      enteredEmail,
      DUMMY_TOKEN,
    });
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText style={styles.title}>Please Log In to Continue</TitleText>
        <Card style={styles.inputContainer}>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={emailInputHandler}
            value={enteredEmail}
          />
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            onChangeText={passwordInputHandler}
            value={enteredPassword}
          />
          <Button
            title="Continue"
            onPress={loginHandler}
            color={Colors.primary}
          />
        </Card>
        <View style={styles.lineStyle} />
        <View style={styles.buttonContainer}>
          <LinkButton>Connect With Apple</LinkButton>
          <LinkButton>Connect With Google</LinkButton>
          <LinkButton>Connect With Facebook</LinkButton>
        </View>
      </View>
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
    color: "black",
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  button: {
    width: 100,
  },
  input: {
    width: "90%",
    textAlign: "center",
  },
  lineStyle: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#808080",
    margin: 10,
    marginTop: 30,
  },
  buttonContainer: {
    height: 250,
    width: 300,
    alignItems: "stretch",
    marginTop: 20,
    justifyContent: "space-evenly",
  },
});
