/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import "./Auth.css";

// Import Firebase authentication functions
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
// Import Firebase auth and provider configuration
import { auth, provider } from "./utils/firebase-config";

const Auth = () => {
  // State to toggle between Sign In and Sign Up
  const [isRegister, setIsRegister] = useState(false);
  // State to hold user email input
  const [email, setEmail] = useState("");
  // State to hold user password input
  const [password, setPassword] = useState("");
  // State to hold confirmation password input (only for registration)
  const [passwordConfirm, setPasswordConfirm] = useState("");
  // State to hold error messages
  const [error, setError] = useState("");

  // Function to handle form submission for authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    // Check if in registration mode and if passwords match
    if (isRegister && password !== passwordConfirm) {
      setError("Passwords do not match"); // Set error message if passwords do not match
      return;
    }
    try {
      // Execute authentication based on mode (register or sign in)
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      // Extract Firebase error code and message
      const errorCode = error.code;
      const errorMessage = error.message;

      // Map Firebase error codes to user-friendly messages
      let userFriendlyMessage;
      switch (errorCode) {
        case "auth/email-already-in-use":
          userFriendlyMessage =
            "Email is already in use. Please use a different email.";
          break;
        case "auth/invalid-email":
          userFriendlyMessage =
            "Invalid email address. Please enter a valid email.";
          break;
        case "auth/weak-password":
          userFriendlyMessage =
            "Password is too weak. Please enter a stronger password.";
          break;
        case "auth/user-not-found":
          userFriendlyMessage =
            "No user found with this email. Please sign up first.";
          break;
        case "auth/wrong-password":
          userFriendlyMessage = "Incorrect password. Please try again.";
          break;
        default:
          userFriendlyMessage =
            "An unexpected error occurred. Please try again later.";
      }

      setError(userFriendlyMessage);
    }
  };

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      let userFriendlyMessage;
      switch (errorCode) {
        case "auth/popup-closed-by-user":
          userFriendlyMessage =
            "Popup closed by user. Please try signing in again.";
          break;
        case "auth/cancelled-popup-request":
          userFriendlyMessage = "Popup request cancelled. Please try again.";
          break;
        default:
          userFriendlyMessage =
            "An unexpected error occurred. Please try again later.";
      }

      setError(userFriendlyMessage);
    }
  };

  return (
    <div className="auth">
      {/* Link to home page */}
      <a href="/">
        <img
          src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_logo.png"
          alt="Fakeflix logo"
        />
      </a>
      {/* Background image */}
      <img
        id="background-image"
        src="/background-img.png"
        alt="Photo by Lucas Pezeta: Catalogue of movies"
      />
      {/* Authentication form */}
      <form onSubmit={handleAuth}>
        {/* Form title based on authentication mode */}
        <h2>{isRegister ? "Sign Up" : "Sign In"}</h2>
        {error && <p class="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Conditional input field for password confirmation (only for registration) */}
        {isRegister && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        )}
        {/* Submit button */}
        <button id="signinBtn" type="submit">
          {isRegister ? "Sign Up" : "Sign In"}
        </button>
        {/* Google Sign-In button */}
        <button id="googleBtn" onClick={handleGoogleSignIn}>
          <i class="fa-brands fa-google"></i>Sign in with Google
        </button>
        {/* Toggle between Sign In and Sign Up modes */}
        <p className="registerOrSignin">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span
            className="signInSpan"
            onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
