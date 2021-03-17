import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebase.config";
import { useState } from "react";

//! to solve: Firebase App named '[DEFAULT]' already exists (app/duplicate-app)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    error: "",
    success: "",
    photo: "",
  });

  // Google Sign In
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };

        setUser(signedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignedOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
        };

        setUser(signedOutUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Email & Password

  const handleBlur = (event) => {
    let isInputFieldValid = false;
    if (event.target.name === "name") {
      isInputFieldValid = event.target.value.length > 5;
    }
    if (event.target.name === "email") {
      const regexp = /\S+@\S+\.\S+/;
      isInputFieldValid = regexp.test(event.target.value);
    }
    if (event.target.name === "password") {
      const regexp = /^[a-zA-Z]{8,}$/;
      isInputFieldValid = regexp.test(event.target.value);
    }

    if (isInputFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (event) => {
    if (user.email && user.password) {
      if (newUser) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.success = "User successfully registered";
            setUser(newUserInfo);
          })
          .catch((error) => {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.success = "";
            setUser(newUserInfo);
          });
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }

    event.preventDefault();
  };

  // Facebook Login

  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const fbHandleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        // The signed-in user info.
        const { displayName, email } = result.user;

        console.log(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        // ...
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Google Sign In */}
      {user.isSignedIn ? (
        <div>
          <button onClick={handleSignedOut}>Sign Out</button>
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      <br />
      <br />
      <br />

      {/* Email & Password */}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          name="newUser"
          id=""
          onChange={() => setNewUser(!newUser)}
        />
        <label htmlFor="newUser">New User</label>
        <br />
        {newUser && (
          <>
            <input
              type="text"
              name="name"
              onBlur={handleBlur}
              placeholder="Your name"
              required
            />
            <br />
          </>
        )}

        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Your email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      <p style={{ color: "green" }}>{user.success}</p>
      <div>
        <p>{user.email}</p>
      </div>
      <br />
      <br />
      <br />

      {/* facebook login */}
      <button onClick={fbHandleSignIn}>Sign In with Facebook</button>
    </div>
  );
}

export default Login;
