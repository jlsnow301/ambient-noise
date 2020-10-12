import React, {useState} from "react";
import { StyleSheet, Button, TouchableWithoutFeedback, Alert, Keyboard, View, Divider } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import TitleText from "../components/TitleText";
import LinkButton from "../components/LinkButton";
import Colors from "../constants/colors";

const LoginScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [userInput, setUserInput] = ("");

  const emailInputHandler = (value) => {
    setEnteredEmail(value);
  }

  const passwordInputHandler = (value) => {
    setEnteredPassword(value);
  }

  const resetInputHandler = () => {
    setEnteredEmail("");
    setEnteredPassword("");
  };

  const loginHandler = () => {
    const email = enteredEmail.toString();
    if (email === "" || email.length < 5) {
      Alert.alert(
        "Invalid Email!",
        "You must type in an email address.",
        [{text: "Okay", style: "destructive", onPress: resetInputHandler}]
      )
      return;
    }
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
    setUserInput("")
    setEnteredPassword("");
    Keyboard.dismiss();
  }

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
        <View style={styles.lineStyle}/>
        <View style={styles.buttonContainer}>
          <LinkButton >Connect With Apple</LinkButton>
          <LinkButton >Connect With Google</LinkButton>
          <LinkButton >Connect With Facebook</LinkButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 90,
    marginBottom: 20,
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
    justifyContent: "space-evenly"

  },
});

export default LoginScreen;