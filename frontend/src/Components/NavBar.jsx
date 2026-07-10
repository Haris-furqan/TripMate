import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/TripMateLogo.png'
import Button from './Button'
import { useLocation } from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from '../../ThemeContext'
import { AuthContext } from '../../AuthContext'
import useFetch from '../hooks/useFetch'
import ToggleSwitch from '../Components/ToggleSwitch'



const NavBar = () => {
    const mockapi4 = import.meta.env.VITE_MOCKAPI4; 
    const {user} = useContext(AuthContext);
    const uid = user?.uid;
    const {
    result: usersResult,
    loading: usersLoading,
    error: usersError,
    } = useFetch(`https://${mockapi4}/api/users`);

  const userForPhotoAndID = usersResult?.find((u)=>u.firebase_uid===uid);

  const photoURL = userForPhotoAndID?.avatar;
    
    const [menuOpen, setMenuOpen] = useState(false)
    const {darkMode,setDarkMode} = useContext(ThemeContext)
    const navigate = useNavigate();
    const {pathname} = useLocation()

    const handleLogout = async () => {
    try {
    await signOut(auth);
    navigate("/"); // navigate() here is fine — this is an event handler, not render
    } catch (err) {
    console.error(err);
    }
    };
  return (

<nav className='flex pl-2 pr-4 py-0 h-30 sticky top-0 z-50 bg-white justify-between items-center border-b border-gray-400 bg-white dark:bg-gray-900 dark:border-gray-700'>
  
  {/* Logo */}
  <div className='flex gap-0 items-center '>
    <img src={logo} className='h-40' alt="logo" />
  </div>

  {/* Desktop Links */}
  <div className='hidden md:flex gap-8 items-center'>
    <Link to={"/"} className={pathname === "/" ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}>Home</Link>
    <Link to={"/explore"} className={pathname === "/explore" ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}>Explore Destinations</Link>
    <Link to={"/trips"} className={pathname === "/trips" ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}>My Trips</Link>

  </div>

  <div className='hidden md:flex gap-8 items-center' >
    <ToggleSwitch value={darkMode} onChange={()=>setDarkMode(prev=>!prev)} label={!darkMode ? "Light Mode" : "Dark Mode"} />
  {user?<Button content={"Logout"} onClick={handleLogout} />:<Button content={"Sign in"} onClick={()=>navigate("/login")}/>}
   {user&& <Link to={"/profile"} className={'transition-all hover:scale-110'}>    <img src={photoURL} className='w-15 h-15 rounded-full object-cover border dark:border-gray-600' alt="" /></Link>}
  </div>

  {/* Hamburger — mobile only */}
  <button className='md:hidden text-gray-500 dark:text-gray-400 text-2xl' onClick={() => setMenuOpen(prev => !prev)}>
    {menuOpen ? '✕' : '☰'}
  </button>

  {/* Mobile Menu */}

   <div className={`absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex flex-col gap-4 px-8 py-6 md:hidden z-50 overflow-hidden transition-all duration-300 ease-in-out
  ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 py-0'}`}>
  <Link to={"/"} onClick={() => setMenuOpen(false)} className={pathname === "/" ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}>Home</Link>
  <Link to={"/explore"} onClick={() => setMenuOpen(false)} className={pathname === "/explore" ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}>Explore Destinations</Link>
  <Link to={"/trips"} onClick={() => setMenuOpen(false)} className={pathname === "/trips" ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}>My Trips</Link>
  <Link to={"/profile"} onClick={() => setMenuOpen(false)} className={pathname === "/profile" ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}>View Profile</Link>
  <ToggleSwitch value={darkMode} onChange={()=>setDarkMode(prev=>!prev)} label={!darkMode ? "Light Mode" : "Dark Mode"} />
  {user?<Button content={"Logout"} onClick={handleLogout} />:<Button content={"Sign in"} onClick={()=>navigate("/login")}/>}
</div>  


</nav>
  )
}

export default NavBar                   