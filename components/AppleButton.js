/*jshint esversion: 6 */
/*jshint esversion: 8 */
/*jshint esversion: 15 */
import React from "react";
import { Text, StyleSheet } from "react-native";
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
import firebase from "../database/firebase";


async function onAppleButtonPress() {
    // 1). start a apple sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // 2). if the request was successful, extract the token and nonce
    const { identityToken, nonce } = appleAuthRequestResponse;
  
    // can be null in some scenarios
    if (identityToken) {
      // 3). create a Firebase `AppleAuthProvider` credential
      const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
  
      // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
      //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
      //     to link the account to an existing user
      const userCredential = await firebase.auth().signInWithCredential(appleCredential);
  
      // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
      console.warn(`Firebase authenticated via Apple, UID: ${userCredential.user.uid}`);
    } else {
      // handle this - retry?
    }
  }
function SocialAuthButtons() {
    // your component that renders your social auth providers
    return (
      <View>
        {/* Render your other social provider buttons here */}
        {appleAuth.isSupported && (
          <AppleButton
            cornerRadius={5}
            style={{ width: 200, height: 60 }}
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={() => onAppleButtonPress()}
          />
        )}
      </View>
    );
  }

  export default AppleButton;