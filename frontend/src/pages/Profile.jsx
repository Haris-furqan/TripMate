import React, { useContext,useCallback,useMemo } from 'react';
import { AuthContext } from '../../AuthContext';
import useFetch from '../hooks/useFetch';
import TripCard from '../Components/TripCard';
import DestinationCard from '../Components/DestinationCard';
import Loader from '../Components/Loader';
import EmptyState from '../Components/EmptyState';
import Page404 from './Page404';
import useEdit from '../hooks/useEdit';
import { useState,useEffect } from 'react';
import { showErr, showSuccess } from '../utils/toast';
import useDelete from '../hooks/useDelete';
import usePost from '../hooks/usePost';
import { GoPencil } from "react-icons/go";
import Button from '../Components/Button';
import avatar from "../assets/user.png"
import InputField from '../Components/InputField';
import uploadImage from '../utils/uploadImage';
import { updateProfile, deleteUser, getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
const Profile = () => 
{
  const [trips,setTrips] = useState([]);
  const [avatarForm,setAvatarForm] = useState(false);
  const [image,setImage] = useState(null)
  const [localWhishList,setLocalWhishList] = useState([]);
  const [uploading,setUploading] = useState(false);
  const [photoURL,setPhotoURL] =useState("");
  const  {user}  = useContext(AuthContext);
  const navigate = useNavigate();
  const uid = user?.uid;
  getAuth()



  
  const mockapi1 = import.meta.env.VITE_MOCKAPI1;
  const mockapi4 = import.meta.env.VITE_MOCKAPI4;

  const {
    result: tripsResult,
    loading: tripsLoading,
    error: tripsError,
  } = useFetch(`https://${mockapi1}/api/Trips`);

  const {
    result: destinationsResult,
    loading: destinationsLoading,
    error: destinationsError,
  } = useFetch(`https://${mockapi1}/api/destinations`);

  const {
    result: whishlistResult,
    loading: whishlistLoading,
    error: whishlistError,
  } = useFetch(`https://${mockapi4}/api/whishlist`);

  const {
    result: usersResult,
    loading: usersLoading,
    error: usersError,
  } = useFetch(`https://${mockapi4}/api/users`);

  const userForPhotoAndID = usersResult?.find((u)=>u.firebase_uid===uid);
  console.log(userForPhotoAndID?.avatar)
  useEffect(()=>
  {
    setPhotoURL(userForPhotoAndID?.avatar);
  },[usersResult]);

  const {editRecord} = useEdit(`https://${mockapi1}/api/Trips`);
  const {editRecord:editUser} = useEdit(`https://${mockapi4}/api/users`);

  const {deleteRecord:deleteUserRecord,loading:userDeleteLoading,error:userDeleteErr} = useDelete(`https://${mockapi4}/api/users`);

  const {deleteRecord,result:deleteResut,loading:deleteLoading,error:deleteError} =  useDelete(`https://${mockapi1}/api/Trips`);
  
  const {deleteRecord:whishListDelete,result:whishListdeleteResut,loading:whishListdeleteLoading,error:whishListdeleteError} =  useDelete(`https://${mockapi4}/api/whishlist`);


  const {postData,loading:postLoading,error:postError} = usePost(`https://${mockapi4}/api/whishlist`);
 
  
    useEffect(()=>
     {
       const newtrips = tripsResult?.filter(r=>r.user_id===uid);
       setTrips(newtrips)
     },[tripsResult])

    useEffect(()=>
     {
       setLocalWhishList(whishlistResult);
     },[whishlistResult]);

       useEffect(()=>
         {
           window.scrollTo(0,0);
         })
         
 

 const whishlistIds = useMemo(() =>
  localWhishList
    ?.filter((w) => w.user_id === uid)
    .map((w) => w.destination_id) || []
, [localWhishList, uid])

const myWishlistedDestinations = useMemo(() =>
  destinationsResult?.filter((d) => whishlistIds.includes(d.id)) || []
, [destinationsResult, whishlistIds])

const handleEdit = useCallback(async (newData) => {
  try {
    
    setTrips(prev =>
      prev.map(p => p.id === newData.id ? newData : p)
    )
    await editRecord(newData.id, newData)
  } catch(err) {
    showErr("Could not Be Updated")
  }
}, [editRecord])

const handleDelete = useCallback(async (id) => {
  try {
    await deleteRecord(id)
    setTrips(prev => prev.filter(p => p.id != id))
  } catch(err) {
    showErr("Could not delete trip")
  }
}, [deleteRecord])

const handleWishlist = useCallback(async (dest_id) => {
  if (whishlistIds?.includes(dest_id)) {
    const whishListToBeDeleted = localWhishList.find((l) => l.destination_id === dest_id)
    const id = whishListToBeDeleted?.id
    setLocalWhishList(prev => prev.filter(p => p.id != id))
    await whishListDelete(id)
  } else {
    postData({ user_id: uid, destination_id: dest_id })
  }
}, [whishlistIds, localWhishList, uid, whishListDelete, postData])

const handleEditAvatar = async () => {
  try
  {
    setUploading(true);
    const url = await uploadImage(image);
    await updateProfile(auth.currentUser,{photoURL:url});
    await editUser(userForPhotoAndID?.id,{firebase_uid:uid,avatar:url});
    setPhotoURL(url)
  }
  catch(err)
  {
    showErr('upload failed')
  }
  finally
  {
    setUploading(false);
    setAvatarForm(false)
  }
}
  
  const loading = tripsLoading || destinationsLoading || whishlistLoading || deleteLoading || uploading || userDeleteLoading;
  const error = tripsError || destinationsError || whishlistError || deleteError || userDeleteErr;

  if (loading) return <Loader />;
  if (error) return <Page404 message={error} />;


  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImage(file);
  }
};

const handleDeleteProfile = async() =>
{
  try
  {
     const password = prompt('Enter your password to confirm deletion')
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password)
    await reauthenticateWithCredential(auth.currentUser, credential)
    
  await deleteUser(auth.currentUser);
  console.log("user deleted");
  await deleteUserRecord(userForPhotoAndID?.id);
  navigate("/")
  showSuccess("User Deleted Successfully");
  }
  catch(err)
  {
    showErr("Profile could not be deleted");
        console.log(err.code) 
  }
}

  return (
   <div className='p-5 min-h-screen bg-white dark:bg-gray-900'>
  {/* Profile header */}
  <div className='flex items-center gap-4 mb-8'>
    <div className='flex'>
      {
        !avatarForm?
        <img
        src={photoURL || avatar}
        alt="Profile"
        className='w-20 h-20 rounded-full object-cover border dark:border-gray-600'
        />:<div className='text-white' >
<label className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors w-fit">
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
  {image ? image.name : "Choose profile photo"}
 
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />
</label>         <Button content={"submit"} onClick={handleEditAvatar}/>

        </div>
      }
      <div className='flex size-2/12'>
      <Button content={<GoPencil />} onClick={()=>setAvatarForm(prev=>!prev)}/>
      </div>
    
      </div>
    <div>
      <h1 className='font-extrabold text-2xl text-blue-600'>
        {user?.displayName || "Traveler"}
      </h1>
      <p className='text-gray-500 dark:text-gray-400'>{user?.email}</p>
    </div>
  </div>

  {/* My Trips */}
  <section className='mb-10'>
    <h2 className='font-bold text-xl mb-4 text-gray-800 dark:text-white'>My Trips</h2>
    {trips?.length === 0 ? (
      <EmptyState title={"No Trips Planned. Try Planning one" } message="You haven't planned any trips yet." />
    ) : (
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        {trips?.map((trip) => (
          <TripCard key={trip.id} deparature={trip.departureDate} arrival={trip.returnDate} {...trip} onEdit={handleEdit} onDelete={() => handleDelete(trip.id)} />
        ))}
      </div>
    )}
  </section>

  {/* Wishlisted Destinations */}
  <section>
    <h2 className='font-bold text-xl mb-4 text-gray-800 dark:text-white'>Wishlisted Destinations</h2>
    {myWishlistedDestinations.length === 0 ? (
      <EmptyState title="No wishlisted destinations yet." />
    ) : (
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        {myWishlistedDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            id={dest.id}
            image={dest.image}
            title={dest.title}
            location={dest.location}
            description={dest.description}
            budget={dest.budget}
            season={dest.season}
            tripType={dest.tripType}
            isWishlisted={true}
            onWishlist={() => handleWishlist(dest.id)}
          />
        ))}
      </div>
    )}
  </section>

  <Button content={"Delete Profile"} onClick={handleDeleteProfile}/>
</div>
  )
}

export default Profile