import React, { useContext, useState } from 'react'
import useFetch from '../hooks/useFetch';
import usePost from '../hooks/usePost';
import Page404 from './Page404';
import { toast } from 'react-toastify';
import { showErr, showSuccess } from '../utils/toast';
import { AuthContext } from '../../AuthContext';

const TripPlannerForm = ({onChange,onSubmitButton}) => {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState(0);
  const [notes, setNotes] = useState("");
  const [activities, setActivities] = useState("");

  const {user} = useContext(AuthContext);
  const uid = user.uid;

  const mockapi1 = import.meta.env.VITE_MOCKAPI1;
  const mockapi4 = import.meta.env.VITE_MOCKAPI4;

  const {result,error,loading} = useFetch(`https://${mockapi1}/api/destinations`,5000)
  const {postData} = usePost(`https://${mockapi1}/api/Trips`)
  const destinations = result?.map((r)=>r.title)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const departureNumber = new Date(departureDate).getTime();
    const returnNumber = new Date(returnDate).getTime();
    const now = new Date().getTime();
    if(returnNumber<departureDate)
    {
      return showErr("Return Date Cannot be before Departure Date");
    }
    if(returnNumber<now || departureNumber<now)
    {
      return showErr("We do not support time travel unfortunately")
    }
    const tripData = { destination, departureDate, returnDate, travelers, budget, notes, activities,user_id:uid };
    
    try
    {
        await postData(tripData)
        onChange(prev => [...prev,tripData])
        showSuccess("Trip Has Been Made")
    }
    catch(err)
    {
        <Page404 message={err}/>
    }

    onSubmitButton()
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md'>

  <div className='flex flex-col gap-1'>
    <label htmlFor="destination" className='font-semibold text-gray-700 dark:text-gray-300'>Destination</label>
    <select
      id="destination"
      value={destination}
      onChange={(e) => setDestination(e.target.value)}
      required
      className='border-2 outline-none border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500'
    >
      <option value="" disabled>Select a destination</option>
      {destinations?.map((d, i) => (
        <option key={i} value={d}>{d}</option>
      ))}
    </select>
  </div>

  <div className='flex flex-col gap-1'>
    <label htmlFor="departureDate" className='font-semibold text-gray-700 dark:text-gray-300'>Departure Date</label>
    <input
      id="departureDate"
      type="date"
      value={departureDate}
      onChange={(e) => setDepartureDate(e.target.value)}
      required
      className='border-2 outline-none border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500'
    />
  </div>

  <div className='flex flex-col gap-1'>
    <label htmlFor="returnDate" className='font-semibold text-gray-700 dark:text-gray-300'>Return Date</label>
    <input
      id="returnDate"
      type="date"
      value={returnDate}
      onChange={(e) => setReturnDate(e.target.value)}
      required
      className='border-2 outline-none border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500'
    />
  </div>

  <div className='flex flex-col gap-1'>
    <label htmlFor="travelers" className='font-semibold text-gray-700 dark:text-gray-300'>Number of Travelers</label>
    <input
      id="travelers"
      type="number"
      min={1}
      value={travelers}
      onChange={(e) => setTravelers(Number(e.target.value))}
      className='border-2 outline-none border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500'
    />
  </div>

  <div className='flex flex-col gap-1'>
    <label htmlFor="budget" className='font-semibold text-gray-700 dark:text-gray-300'>Budget</label>
    <input
      id="budget"
      type="number"
      min={0}
      value={budget}
      onChange={(e) => setBudget(Number(e.target.value))}
      className='border-2 outline-none border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500'
    />
  </div>

  <div className='flex flex-col gap-1'>
    <label htmlFor="activities" className='font-semibold text-gray-700 dark:text-gray-300'>Activities</label>
    <input
      id="activities"
      type="text"
      placeholder="e.g Hiking, Snorkeling"
      value={activities}
      onChange={(e) => setActivities(e.target.value)}
      className='border-2 outline-none border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500'
    />
  </div>

  <div className='flex flex-col gap-1'>
    <label htmlFor="notes" className='font-semibold text-gray-700 dark:text-gray-300'>Notes</label>
    <textarea
      id="notes"
      rows={3}
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      className='border-2 outline-none border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-2xl transition-colors p-2 duration-300 focus:border-blue-500 resize-none'
    />
  </div>

  <button type="submit" className='bg-blue-600 text-white font-bold rounded-2xl p-3 mt-2 hover:bg-blue-700 transition-colors'>
    Save Trip
  </button>
</form>
  )
}

export default TripPlannerForm