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
    <div className='flex m-5 transition-all duration-300 hover:scale-102 p-3 gap-3 flex-col max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl'>
  <div>
    <img src={image} className='rounded-t-2xl w-full object-cover' alt="location image" />
  </div>
  <div className='flex items-start flex-col gap-3'>
    <h2 className='font-bold text-xl text-blue-500'>{title}</h2>
    <h3 className='font-semibold text-lg text-blue-500'>{location}📍</h3>
    <p className='text-gray-500 dark:text-gray-400'>{description}</p>
    <p className='text-gray-700 dark:text-gray-300 font-semibold'>Budget: {customBudget} <span><select  onChange={handleCurrencyChange}  value={currency} className='font-bold text-blue-500'>
      {currencies.map((curr)=>(<option value={curr}>
        {curr}
      </option>))}
      </select></span></p>
    <p className='text-green-700 dark:text-green-400 font-semibold'>Season: {season}</p>
    <p className='text-green-700 dark:text-green-400 font-semibold'>Trip Type: {tripType}</p>
    <div className='flex w-full justify-between'>
      <Button content={"View Details"} onClick={() => navigate(`/destination/${id}`)} />
      <CiHeart
        onClick={onWishlist}
        size={40}
        color={isWishlisted ? "red" : "black"}
      />
    </div>
  </div>
</div>
  )
})

export default DestinationCard