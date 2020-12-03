/*jshint esversion: 6 */
/*jshint esversion: 8 */
import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Alert,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';
import firebase from "../database/firebase";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import LinkButton from "../components/LinkButton";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../functions/auth-context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

// Testing only
let DUMMY_NAME = "Joe";
let DUMMY_IMAGE = "https://bootdey.com/img/Content/avatar/avatar6.png";
let DUMMY_TOKEN = "123456abcdef";

GoogleSignin.configure({
  webClientId: '1074331299510-f18o8s4svec20sp75t2g0fl08sl1aen3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  
});

const LoginScreen = (props) => {
  const auth = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  
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

  // Clears the displayed values
  const resetInputHandler = () => {
    setEnteredEmail("");
    setEnteredPassword("");
  };
  const signIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  };
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(function(user)
    {
      if(user) {
        props.navigation.navigate('HomeStack');
      } else {
        props.navigation.navigate('LoginStack');
      }
    });
  };
  // User hits submit. Validated, then entered.
  // Currently leading to nowhere.
  const loginHandler = () => {
    const email = enteredEmail.toString();
    if (email === "" || email.length < 5) {
      Alert.alert(
        "Invalid Email!",
        "You must type in an email address. Minimum 5 characters.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
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
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(enteredEmail, enteredPassword)
      .then(checkIfLoggedIn);
        
        
        // console.log(res);
        // console.log("User logged-in successfully!");
         Alert.alert("Welcome back " + email)
        //auth.login(DUMMY_NAME, DUMMY_IMAGE, enteredEmail, DUMMY_TOKEN);
        // auth.login(res.name, res.image, enteredEmail, res.token); Log in with the server response
        //this.props.navigation.navigate("ProfileStack");
      
      .catch((error) => setError({ errorMessage: error.message }));
    // Clear inputs
    resetInputHandler();
  };

  // Sigin with Google
  
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
        <TitleText style={styles.title}>Please Log In to Continue</TitleText>
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
            blurOnSubmit={false}
            onSubmitEditing={() => Keyboard.dismiss()}
            placeholder={"password"}
            placeholderTextColor="#8e9eab"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={passwordInputHandler}
            value={enteredPassword}
          />
          <MainButton 
          onPress={loginHandler}

          >Log In</MainButton>
          <Text
            style={styles.signupButton}
            onPress={() => props.navigation.navigate("SignupStack")}
          >
            No account? Sign Up Instead.
          </Text>
          {/* <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.size.wide}
          color={GoogleSigninButton.color.Dark}
          onPress={signIn}
          /> */}
          <View style={styles.buttonContainer}>
          {/* <AppleButton
        style={styles.appleButton}
        cornerRadius={5}
        buttonStyle={AppleButton.Style.WHITE_OUTLINE}
        buttonType={AppleButton.Type.SIGN_IN}
       //onPress={() => onAppleButtonPress(updateCredentialStateForUser)}
      /> */}
            <LinkButton>Connect With Google</LinkButton>
            <LinkButton>Connect With Apple</LinkButton>
            <LinkButton>Connect With Facebook</LinkButton>
          </View>
    
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
  button: {
    width: "100%",
    maxWidth: "80%",
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
  buttonContainer: {
    height: 300,
    width: 300,
    alignItems: "stretch",
    justifyContent: "space-evenly",
  },
  linkButton: {
    borderRadius: 15,
  },
  signupButton: {
    marginTop: 25,
    color: "#006AFF",
    fontSize: 18,
    textAlign: "center",
  },
  // appleButton: {
  //   width: 200,
  //   height: 60,
  //   margin: 10,
  // },
});
