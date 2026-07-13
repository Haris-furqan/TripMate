import React, { useState } from 'react'
import Button from './Button'
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import usePost from "../hooks/usePost"
import Loader from './Loader';
import Page404 from '../pages/Page404';
import { AuthContext } from '../../AuthContext';
import { useContext } from 'react';
import useFetch from '../hooks/useFetch';

  const DestinationCard = React.memo(({ id, image, title, location, description, budget, season, tripType,onWishlist,updateParent,isWishlisted }) => {
  const currency_api = import.meta.env.VITE_CURRENCY_API;
  const {result} = useFetch(`https://v6.exchangerate-api.com/v6/${currency_api}/latest/USD`)
  const navigate = useNavigate();
  const [currency,setCurrency] = useState("$");
  const budgetInNumber = Number(budget.split("").slice(1).join(""))
  const [customBudget,setCustomBudget] = useState(budgetInNumber);

  const handleCurrencyChange = (e) =>
  {
    const newCurrency = e.target.value
    setCurrency(newCurrency)
    const conversionRate = result?.conversion_rates[newCurrency];
    setCustomBudget(budgetInNumber*conversionRate);
  }
  const currencies = ["USD","PKR","SAR","AED"];
  
  
  return (
<div className='group flex m-4 p-4 gap-4 flex-col max-w-sm bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1'>
  <div className='relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800'>
    <img 
      src={image} 
      className='h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105' 
      alt="destination" 
    />
    <div className='absolute top-3 right-3 flex flex-col gap-1.5 items-end'>
      {tripType && (
        <span className='px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 rounded-md backdrop-blur-sm shadow-sm'>
          {tripType}
        </span>
      )}
      {season && (
        <span className='px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/90 text-white rounded-md backdrop-blur-sm shadow-sm'>
          ☀️ {season}
        </span>
      )}
    </div>
  </div>

  <div className='flex items-start flex-col gap-2.5 flex-1'>
    <div className='flex flex-col gap-1 w-full'>
      <h2 className='font-extrabold text-xl text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-1'>
        {title}
      </h2>
      <h3 className='font-medium text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate'>
        <span>📍</span> {location}
      </h3>
    </div>

    <p className='text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-1'>
      {description}
    </p>

    <div className='flex items-center justify-between w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/40 mt-auto'>
      <span className='text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider'>Est. Budget</span>
      <div className='flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-base'>
        <span>{customBudget}</span>
        <select 
          onChange={handleCurrencyChange} 
          value={currency} 
          className='text-xs font-bold text-blue-600 dark:text-blue-400 bg-transparent border-none p-0 pr-1 focus:ring-0 cursor-pointer outline-none hover:underline'
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr} className='bg-white dark:bg-slate-900 text-slate-900 dark:text-white'>
              {curr}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className='flex w-full justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800/60 mt-1'>
      <Button content={"View Details"} onClick={() => navigate(`/destination/${id}`)} />
      <button 
        onClick={onWishlist}
        className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 group/btn focus:outline-none'
        aria-label="Add to wishlist"
      >
        <CiHeart
          size={26}
          className={`transition-transform duration-200 group-hover/btn:scale-110 ${
            isWishlisted 
              ? 'fill-red-500 text-red-500' 
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
        />
      </button>
    </div>
  </div>
</div>  
  )
})

export default DestinationCard