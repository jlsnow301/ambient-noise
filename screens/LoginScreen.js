import React, {useState} from "react";
import { StyleSheet, Button, TouchableWithoutFeedback, Alert, Keyboard, View } from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText"
import MainButton from "../components/MainButton";
import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors"

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

  const confirmInputHandler = () => {
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
    setUserInput({})
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
              title="Confirm"
              onPress={confirmInputHandler}
              color={Colors.primary}
            />

        </Card>
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
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});

export default LoginScreen;