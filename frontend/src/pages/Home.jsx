import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; 
import useFetch from '../hooks/useFetch'; 

const Home = () => {
  const { user } = useContext(AuthContext);
  const uid = user?.uid;

  const mockapi4 = import.meta.env.VITE_MOCKAPI4;

  const {
    result: usersResult,
    loading: usersLoading,
    error: usersError,
  } = useFetch(`https://${mockapi4}/api/users`);

  const userForName = usersResult?.find((u) => u.firebase_uid === uid);
  const displayName = user?.displayName;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-5 font-sans transition-colors duration-300 bg-white text-gray-900 dark:bg-[#0f172a] dark:text-white">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center transition-all duration-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 animate-[pulse_3s_infinite]">
        {user && displayName ? `Welcome, ${displayName}` : 'Welcome to TripMate'}
      </h1>

    
      <div className="flex flex-wrap gap-4 justify-center">
        {!user && (
          <>
            <Link 
              to="/login" 
              className="px-7 py-3 text-base font-semibold rounded-full text-center transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Log In
            </Link>
            <Link 
              to="/register" 
              className="px-7 py-3 text-base font-semibold rounded-full text-center transition-all duration-200 bg-transparent border-2 border-blue-600 hover:bg-blue-50 text-blue-600 dark:border-blue-500 dark:hover:bg-blue-500/10 dark:text-blue-400"
            >
              Register
            </Link>
          </>
        )}

        <Link 
          to="/explore" 
          className="px-7 py-3 text-base font-semibold rounded-full text-center transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Home;