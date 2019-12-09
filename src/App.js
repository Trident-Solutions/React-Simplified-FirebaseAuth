// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import './App.css';
// Configure Firebase.
const config = {
  apiKey: "",
  authDomain: "",
  // ...
};

firebase.initializeApp(config);
 
class SignInScreen extends React.Component {
 
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };
 
  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
      
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => true
    }
  };
 
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
 
  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1 className="center text-white">My App</h1>
          <p className="center text-white">Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1 className="center text-white">My App</h1>
        <p className="center text-white">Welcome <strong>{firebase.auth().currentUser.displayName}!</strong> You are now signed-in!</p>
		<div className="center-div">
        <button onClick={() => firebase.auth().signOut()}>Sign-out</button></div>
      </div>
    );
  }
}
export default SignInScreen;
