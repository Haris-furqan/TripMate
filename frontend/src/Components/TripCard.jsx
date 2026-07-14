import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import Button from './Button';
import useFetch from '../hooks/useFetch';

const TripCard = React.memo(({ id, destination, departure, arrival, travelers, budget, notes, activities, onDelete, onEdit }) => {
  const mockapi1 = import.meta.env.VITE_MOCKAPI1;
  const { result,loading } = useFetch(`https://${mockapi1}/destinations/`);

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);


  const [editDestination, setEditDestination] = useState(destination);
  const [editDeparture, setEditDeparture] = useState(departure);
  const [editArrival, setEditArrival] = useState(arrival);
  const [editTravelers, setEditTravelers] = useState(travelers);
  const [editBudget, setEditBudget] = useState(budget);
  const [editNotes, setEditNotes] = useState(notes);
  const [editActivities, setEditActivities] = useState(activities);

  
  const [timeLeft, setTimeLeft] = useState("");

  const matchedDestination = result?.find((r) => r.title === destination);
  const image = matchedDestination?.image;

  useEffect(() => {
    function getCountdownString() {
      const targetTimestamp = new Date(departure).getTime();
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference <= 0) return "00:00:00";

      let days = Math.floor(difference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000); 

      const dStr = String(days).padStart(2, '0');
      const hStr = String(hours).padStart(2, '0');
      const mStr = String(minutes).padStart(2, '0');
      const sStr = String(seconds).padStart(2, '0');

      return `${dStr}:${hStr}:${mStr}:${sStr}`;
    }

   
    setTimeLeft(getCountdownString());

    const interval = setInterval(() => {
      setTimeLeft(getCountdownString());
    }, 1000);

    return () => clearInterval(interval);
  }, [departure]);

  const handleSave = () => {
    onEdit({
      id,
      destination: editDestination,
      departureDate: editDeparture, 
      returnDate: editArrival,
      travelers: editTravelers,
      budget: editBudget,
      notes: editNotes,
      activities: editActivities,
    });
    setIsEditFormOpen(false);
  };

  const handleCancel = () => {
    setEditDestination(destination);
    setEditDeparture(departure);
    setEditArrival(arrival);
    setEditTravelers(travelers);
    setEditBudget(budget);
    setEditNotes(notes);
    setEditActivities(activities);
    setIsEditFormOpen(false);
  };

 const handleShare = async () => {
  // 1. Format the data to look exactly like a clean text document
  const textDocument = `
=========================================
        TRIP ITINERARY SUMMARY          
=========================================
🌍 DESTINATION : ${destination}
📅 DEPARTURE   : ${departure}
⏳ RETURN      : ${arrival}
👥 TRAVELERS   : ${travelers} People
💰 BUDGET      : $${budget}
-----------------------------------------
🚗 PLANNED ACTIVITIES:
${activities || 'None scheduled yet.'}

📝 IMPORTANT NOTES:
${notes || 'No notes added.'}
=========================================
Generated via Travel Itinerary Planner
`;

  try {
    // 2. Copy the text document directly to the user's clipboard
    await navigator.clipboard.writeText(textDocument.trim());
    
    // 3. Notify the user it's done
    alert("📄 Itinerary text document copied to clipboard! You can now paste it anywhere.");
  } catch (err) {
    console.error("Failed to copy document:", err);
  }
};

  return (
    <div className='m-5 transition-all duration-300 hover:scale-102 flex p-3 gap-3 flex-col max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-2xl'>
      <div>
          {loading? (
    <div className='w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-2xl animate-pulse' />
  ):
        <img src={image} className='rounded-t-2xl w-full h-48 object-cover' alt={`${destination}`} />
  }
      </div>
      <div className='flex items-start flex-col gap-3 w-full'>

        {isEditFormOpen ? (
          <div className="flex flex-col gap-2 w-full">
            <input
              value={editDestination}
              onChange={(e) => setEditDestination(e.target.value)}
              className='font-bold text-xl text-blue-500 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg p-1 w-full outline-none focus:border-blue-500'
            />
            <input
              value={editDeparture}
              onChange={(e) => setEditDeparture(e.target.value)}
              placeholder="Departure"
              className='text-black dark:text-white font-semibold text-sm border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-1 w-full outline-none focus:border-blue-500'
            />
            <input
              value={editArrival}
              onChange={(e) => setEditArrival(e.target.value)}
              placeholder="Return"
              className='text-black dark:text-white font-semibold text-sm border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-1 w-full outline-none focus:border-blue-500'
            />
            <input
              type="number"
              value={editTravelers}
              onChange={(e) => setEditTravelers(Number(e.target.value))}
              placeholder="Number of Travelers"
              className='text-black dark:text-white font-semibold text-sm border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-1 w-full outline-none focus:border-blue-500'
            />
            <input
              type="number"
              value={editBudget}
              onChange={(e) => setEditBudget(Number(e.target.value))}
              placeholder="Budget"
              className='text-black dark:text-white font-semibold text-sm border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-1 w-full outline-none focus:border-blue-500'
            />
            <input
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Notes"
              className='text-black dark:text-white font-semibold text-sm border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-1 w-full outline-none focus:border-blue-500'
            />
            <input
              value={editActivities}
              onChange={(e) => setEditActivities(e.target.value)}
              placeholder="Activities"
              className='text-black dark:text-white font-semibold text-sm border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-lg p-1 w-full outline-none focus:border-blue-500'
            />
          </div>
        ) : (
          <>
            <h2 className='font-bold text-xl text-blue-500'>{destination}</h2>
            <h3 className='text-black dark:text-gray-300 font-semibold text-base'>Departure: {departure}</h3>
            <h3 className='text-black dark:text-gray-300 font-semibold text-base'>Return: {arrival}</h3>
            <h3 className='text-black dark:text-gray-300 font-semibold text-base'>Number of Travelers: {travelers}</h3>
            <h3 className='text-black dark:text-gray-300 font-semibold text-base'>Budget: ${budget}</h3>
            <h3 className='text-black dark:text-gray-300 font-semibold text-base'>Notes: {notes}</h3>
            <h3 className='text-black dark:text-gray-300 font-semibold text-base'>Activities: {activities}</h3>
            <h3 className='text-red-500 dark:text-blue-300 font-bold text-lg mt-1'>Time Left: {timeLeft}</h3>
            <Button content={"Share Trip"} onClick={handleShare}/>
          </>
        )}

        <div className='flex gap-6 mt-2'>
          {isEditFormOpen ? (
            <>
              <Button onClick={handleSave} content={<IoMdCheckmark size={24} color='green' />} />
              <Button onClick={handleCancel} content={<IoMdClose size={24} color='gray' />} />
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditFormOpen(true)} content={<CiEdit size={24} />} />
              <Button onClick={()=>onDelete(id)} content={<MdOutlineDelete size={24} color='red' />} />
            </>
          )}
        </div>

      </div>
    </div>
  );
});

export default TripCard;