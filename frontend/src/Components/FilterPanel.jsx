import React from 'react'
import Button from './Button';
import { useState } from 'react';
const FilterPanel = ({onCountryChange,onRangeChange,onSeasonChange,onTripTypeChange,countries}) => {
    
    const budgets = [1000,1500,2000];
    const seasons = ['summer','winter','autumn','spring'];
    const tripTypes = ['Adventure','Beach','Historical','Nature'];

    const [country,setCountry] = useState(countries[0]);
    const [range,setRange] = useState(budgets[0]);
    const [season,setSeason] = useState(seasons[0]);
    const [tripType,setTripType] = useState(tripTypes[0]);
    
    const handleChange = () =>
    {
        onCountryChange(country);
        onRangeChange(range);
        onSeasonChange(season);
        onTripTypeChange(tripType);
    }
    
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-6'>
        <select onChange={(e)=>{setCountry(e.target.value)}} className='border-2  outline-none w-xs md:w-xs sm:w-xs xl:w-md border-gray-500 rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500' name="countries" id="countries">
            {countries.map((country)=>
            (
                <option value={country}>{country}</option>
            ))}
        </select>

        <select onChange={(e)=>{setRange(e.target.value)}} className='border-2  outline-none w-xs md:w-xs sm:w-xs xl:w-md border-gray-500 rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500' name="budget" id="budget">
            {budgets.map((budget)=>
            (
                <option value={budget}>Under ${budget}</option>
            ))}
        </select>

        <select onChange={(e)=>{setSeason(e.target.value)}} className='border-2  outline-none w-xs md:w-xs sm:w-xs xl:w-md border-gray-500 rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500' name="seasons" id="seasons">
            {seasons.map((season)=>
            (
                <option value={season}>{season}</option>
            ))} 
        </select>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

        <select onChange={(e)=>{setTripType(e.target.value)}} className='border-2  outline-none w-xs md:w-xs sm:w-xs xl:w-md border-gray-500 rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500' name="tripTypes" id="tripTypes">
            {tripTypes.map((tripType)=>
            (
                <option value={tripType}>{tripType}</option>
            ))}
        </select>

        <Button content={"Apply"} onClick={handleChange}/>
        
    </div>
  )
}

export default FilterPanel