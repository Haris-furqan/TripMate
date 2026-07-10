import React, {  createContext, useState ,useEffect} from 'react'
import useLocalStorage from './src/hooks/useLocalStorage';

const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const [darkMode,setDarkMode] = useLocalStorage('darkMode',false);
    
    useEffect(() => {
      if (darkMode) 
        {
            document.documentElement.classList.add('dark')
        } else 
        {
            document.documentElement.classList.remove('dark')
        }
    }, [darkMode])
  return (
    <ThemeContext.Provider value={{darkMode,setDarkMode}}>{children}</ThemeContext.Provider>
  )
}

export  {ThemeContext,ThemeProvider}