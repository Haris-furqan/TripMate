import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = ({value,onChange,placeHolder}) => {
  return (
    <div className='flex w-2xs border-2 items-center border-gray-300 dark:border-gray-600 rounded-3xl px-3 h-11 outline-none focus-within:border-blue-500 transition-colors duration-300 bg-white dark:bg-gray-800'>
  <CiSearch className='text-gray-500 dark:text-gray-400'/>
  <input 
    type="text" 
    className='outline-none w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500' 
    placeholder={placeHolder} 
    value={value} 
    onChange={onChange} 
  />
</div>
  )
}

export default SearchBar