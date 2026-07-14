import React, { useContext, useEffect,useCallback } from 'react'
import Page404 from './Page404'
import Button from '../Components/Button'
import TripPlannerForm from './TripPlannerForm'
import { useState } from 'react'
import Loader from '../Components/Loader'
import useFetch from '../hooks/useFetch'
import TripCard from '../Components/TripCard'
import axios from 'axios'
import { showErr, showSuccess } from '../utils/toast'
import useDelete from '../hooks/useDelete'
import useEdit from '../hooks/useEdit'
import EmptyState from '../Components/EmptyState'
import { AuthContext } from '../../AuthContext'
import Pagination from '../Components/Pagination'
import usePagination from '../hooks/usePagination'
const MyTrips = () => {
  const [showForm,setShowForm] = useState(false)
  const [showUpComing,setShowUpComing] = useState(true);
  const [upComingOnly,setUpComingOnly] = useState([])
  const [trips,setTrips] = useState([])


  const mockapi1 = import.meta.env.VITE_MOCKAPI1;

  const {loading,error,result} = useFetch(`https://${mockapi1}/api/Trips`,5000);
  const {result:deleteResult,deleteRecord,error:deleteError,loading:deleteLoading} = useDelete(`https://${mockapi1}/api/Trips`)
  const {editRecord} = useEdit(`https://${mockapi1}/api/Trips`)

    const {currentItems:tripCurrentItems,totalPages:tripTotalPages,currentPage:tripCurrentPage,setCurrentPage:tripsetCurrentPage} = usePagination(trips,5);
    const {currentItems:upComingCurrentItems,totalPages:upComingTotalPages,currentPage:upComingCurrentPage,setCurrentPage:upComingsetCurrentPage} = usePagination(upComingOnly,5);


  console.log(trips?.length)
 
  const {user} =useContext(AuthContext);
  const uid = user.uid;


 const handleUpcoming = useCallback(() => {
  setShowUpComing(prev => !prev)
  const today = new Date().toLocaleDateString('en-CA')
  setUpComingOnly(trips.filter((t) => t.departureDate >= today))
}, [trips])

const handleEdit = useCallback(async (newData) => {
  try {
    await editRecord(newData.id, newData)
    setTrips(prev => prev.map(p => p.id === newData.id ? newData : p))
  } catch(err) {
    showErr("Could not Be Updated")
  }
}, [editRecord])

useEffect(() => {
  console.log("trips result changedx")
  const filtered = result?.filter(r => r.user_id === uid)
  setTrips(filtered)
}, [result])

useEffect(()=>
  {
    window.scrollTo(0,0);
  })
    

const handleDelete = useCallback(async (id) => {
  try {
    setTrips(prev => prev.filter(p => p.id != id))
    console.log(id+" got deleted")
    await deleteRecord(id)
  } catch(err) {
    showErr("Could not delete trip")
  }
}, [deleteRecord])

    if (loading) 
    return <Loader/>
  if (error)
    return <Page404 message={error}/>
  
  
    
  return (
    <div className='min-h-screen bg-white dark:bg-gray-900 p-5'>
  <div className='flex gap-3 mb-5'>
    <Button content={"Create a Trip"} onClick={() => setShowForm(!showForm)} />
    <Button content={showUpComing ? "Show Upcoming Trips" : "Show All"} onClick={handleUpcoming} />
  </div>

  {!result || result?.length === 0 && <EmptyState title={"No Trips Found"} />}

  {showForm && <TripPlannerForm onChange={setTrips} onSubmitButton={() => setShowForm(false)} />}

{trips?.length===0&&<EmptyState title={"No Trips Found..."} content={"Try Making Your First Trip"}/>}
  <div className='Trip-cards grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
    {showUpComing ?
      tripCurrentItems?.map((r) => (
        <div  key={r.id} >
        <TripCard
          key={r.id}
          id={r.id}
          onEdit={handleEdit}
          onDelete={() => handleDelete(r.id)}
          destination={r.destination}
          deparature={r.departureDate}
          arrival={r.returnDate}
          travelers={r.travelers}
          budget={r.budget}
          notes={r.notes}
          activities={r.activities}
        />
       
        </div>
      ))  :
      upComingCurrentItems?.map((r) => (
        <TripCard
          key={r.id}
          id={r.id}
          onEdit={handleEdit}
          onDelete={() => handleDelete(r.id)}
          destination={r.destination}
          deparature={r.departureDate}
          arrival={r.returnDate}
          travelers={r.travelers}
          budget={r.budget}
          notes={r.notes}
          activities={r.activities}
        />
      ))
      
    }
  </div>
    {showUpComing?
    <div className='w-screen flex justify-center items-center' >
     <Pagination totalPages={tripTotalPages} currentPage={tripCurrentPage} setCurrentPage={tripsetCurrentPage}/>
    </div>:
     <div className='w-screen flex justify-center items-center' >
     <Pagination totalPages={upComingTotalPages} currentPage={upComingCurrentPage} setCurrentPage={upComingsetCurrentPage}/>
    </div>}
</div>
    )
}

export default MyTrips