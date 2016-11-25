/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase'
var Auth0Lock = require('react-native-lock');

var lock = new Auth0Lock({clientId: 'K8xSNT8KfqSmDW1Jfvp5QyMbZfX18HQz', domain: 'testsich.auth0.com'});
const firebaseConfig = {
  apiKey: "AIzaSyAFTU2fN-yywDUKaItTM4sKDdN9x5RHt_o",
  authDomain: "react-native-messanger.firebaseapp.com",
  databaseURL: "https://react-native-messanger.firebaseio.com/",
  storageBucket: "",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class reactNativeMessanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }

  }

  componentDidMount() {
    if (!this.state.isLoggedIn) {
      lock.show({connections: ["sms"]}, this.auth.bind(this))

    }
  }

  auth(error, authResult, token) {
      if (error) {
        return
      }

      console.log(authResult)
      console.log(token.idToken)
      var options = {
          id_token : token.idToken,
          api : 'firebase',
          scope : 'openid name email',
          target: 'K8xSNT8KfqSmDW1Jfvp5QyMbZfX18HQz'
        };

      lock.authenticationAPI().delegation(token, 'id_token', 'firebase', options).then((a) => {
        console.log(a)
        firebaseApp.auth().signInWithCustomToken(a.id_token)
          .then(a => this.setState({isLoggedIn: true}))
          .catch(function(error) {
            console.log(error)
          })
      }).catch(e => console.log(e))


  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('reactNativeMessanger', () => reactNativeMessanger);
