import React, { useEffect, useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider, db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import HomeNav from '../components/HomeNav';
import backgroundImage from '../assets/login.jpeg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      }
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Check if the user is an admin
        if (
          user.email === 'admin@hayani.com' &&
          user.uid === 'bNWi5bobtQYBjoEf69Qb0tt8feU2'
        ) {
          navigate('/admin');
        } else {
          navigate('/hotels');
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: user.displayName,
          });
        }
      }
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {

        if (
          user.email === 'admin@hayani.com' &&
          user.uid === 'bNWi5bobtQYBjoEf69Qb0tt8feU2'
        ) {
          navigate('/admin');
        } else {
          navigate('/hotels');
        }
      } else {

      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <HomeNav />

      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
      >
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="flex flex-col items-center justify-center text-2xl font-bold mb-6 ">
            LOGIN
          </h2>
          {loginStatus === 'success' && (
            <p className="text-green-600 mb-4">You have been logged in successfully!</p>
          )}
          {loginStatus === 'error' && (
            <p className="text-red-600 mb-4">
              Wrong email or password. Please try again.
            </p>
          )}
          <form onSubmit={handleEmailPasswordLogin} className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:ring focus:ring-opacity-50 focus:ring-teal-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:ring focus:ring-opacity-50 focus:ring-teal-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-md font-medium hover:bg-teal-600 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-teal-500"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="mt-2 text-sm text-gray-500">
                Don'thave an account?{' '}
                <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                  Sign up
                </Link>
              </p>
            </div>
            <Button variant="outlined" onClick={handleGoogleLogin}>
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}