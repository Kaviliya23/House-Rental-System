import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='bg-slate-300'>
      <div className='flex justify-between items-center max-w-5xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm:text-xl flex flex-wrap'>
          <span className='text-slate-600'>HOMEI RENT </span>
          <span className='text-slate-900'> RENTAL</span>
        </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type='text' placeholder='search ..' className='bg-transparent focus:outline-none sm:w-64' />
          <FaSearch className='text-slate-500' />
        </form>
        <ul className='flex gap-4'>
          <Link to ='/'>
          <li className='sm:inline text-slate-800 hover:underline'>home</li>
          </Link>
          <Link to='/about'>
          <li className='sm:inline text-slate-800 hover:underline'>About</li>
          </Link>
          <Link to='/sign-in'>
          <li className='sm:inline text-slate-800 hover:underline'>Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header
