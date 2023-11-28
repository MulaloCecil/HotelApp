import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import backgroundImage from '../assets/signup.jpeg';
import HomeNav from '../components/HomeNav';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [signUpStatus, setSignUpStatus] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: displayName });
      }

      setSignUpStatus('success');

      setEmail('');
      setPassword('');
      setDisplayName('');

      setTimeout(() => {
        setSignUpStatus(null);
        navigate('/login');
      }, 3000);
    } catch (error) {
      setSignUpStatus('error');
      console.error(error.message);
    }
  };

  return (
    <>
      <HomeNav />
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="flex flex-col items-center justify-center text-2xl font-bold mb-6">REGISTER</h2>
          {signUpStatus === 'success' && (
            <p className="text-green-600 mb-4">You have signed up successfully!</p>
          )}
          {signUpStatus === 'error' && (
            <p className="text-red-600 mb-4">The email is already in use. Please try again.</p>
          )}
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                id="displayName"
                className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:ring focus:ring-opacity-50 focus:ring-teal-500"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
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
              Sign Up
            </button>
          </form>
          <div className="mt-4">
            <span className="text-sm">Already have an account? </span>
            <Link to="/login" className="text-sm text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;