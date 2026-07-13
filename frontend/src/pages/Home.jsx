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
   <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center overflow-hidden transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-[#0f172a] dark:text-white">
      
      {/* Subtle background glow decorative elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Animated Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 text-xs font-medium rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20">
          ✨ Your Ultimate Travel Companion
        </span>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 dark:from-blue-400 dark:via-blue-500 dark:to-indigo-400">
          {user && displayName ? `Welcome back, ${displayName}` : 'Your Next Adventure Awaits with TripMate'}
        </h1>

        {/* Catchy Description */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Plan seamless itineraries, discover hidden gems recommended by locals, and coordinate group trips effortlessly. Wherever you're heading, don't wander alone.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
          {user ? (
            <Link 
              to="/explore" 
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl text-center shadow-lg shadow-blue-500/20 transition-all duration-200 bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] text-white"
            >
              Explore Destinations
            </Link>
          ) : (
            <>
              <Link 
                to="/register" 
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl text-center shadow-lg shadow-blue-500/20 transition-all duration-200 bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] text-white"
              >
                Get Started Free
              </Link>
              <Link 
                to="/explore" 
                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl text-center transition-all duration-200 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-transparent dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-300"
              >
                Explore
              </Link>
              <Link 
                to="/login" 
                className="text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200 px-4 py-2"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;