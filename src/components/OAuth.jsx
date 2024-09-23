import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const OAuth = ({ isSignUp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Google sign-in popup
      const result = await signInWithPopup(auth, provider);

      // Send the Google user data to the server for either sign-up or sign-in
      const res = await fetch(`/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          action: isSignUp ? 'signup' : 'signin', // This will differentiate between sign-up and sign-in
        }),
      });

      const data = await res.json();

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not sign in or sign up with Google', error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      {isSignUp ? 'Sign Up with Google' : 'Sign In with Google'}
    </button>
  );
};

export default OAuth;
