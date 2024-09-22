import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import {set} from 'mongoose';
import {useDispatch, useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';

export const SignIn = () => {
  const dispatch=useDispatch();
  const{loading,error}=useSelector((state)=>state.user);

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok) {
        alert('Sign in successful!');
        navigate('/'); 
      } else {
        setError(data.message || 'Sign in failed!');
      }
    } catch (error) {
      setError('Error during signin: ' + error.message);
      console.error('Error during signin:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />

        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button className='bg-slate-600 text-white p-3 uppercase hover:opacity-80'>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}> 
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>

      {error && <p className='bg-red-600 text-white p-2 mt-3'>{error}</p>}
    </div>
  );
};

export default SignIn;
