import React, { useEffect,useState,useContext,useCallback  } from 'react'
import { AuthContext } from '../../AuthContext';
import useFetch from '../hooks/useFetch'
import usePost from '../hooks/usePost';
import Loader from '../Components/Loader';
import Page404 from './Page404';
import EmptyState from '../Components/EmptyState';
import DestinationCard from '../Components/DestinationCard';
import { useParams } from 'react-router-dom';
import useDelete from '../hooks/useDelete';
import DestinationMap from '../Components/DestinationMap';
import WeatherCard from '../Components/WeatherCard';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const DestinationDetails = () => {
    const {id} = useParams();
   

  const mockapi1 = import.meta.env.VITE_MOCKAPI1;
  const mockapi4 = import.meta.env.VITE_MOCKAPI4;
  
  const {error,result,loading} = useFetch(`https://${mockapi1}/api/destinations/`,5000);
  const {result:whishlistResult} = useFetch(`https://${mockapi4}}/api/whishlist`);
  const {loading:wishListLoadingPost,data:postResponseData,postData,error:wishListErrorPost} = usePost(`https://${mockapi4}}/api/whishlist`);
  const {deleteRecord,loading:whishListDeleteLoading} = useDelete(`https://${mockapi4}}/api/whishlist`);
  const {user} = useContext(AuthContext);
  const uid = user?.uid;
  const [localWhishList,setLocalWhishList] = useState([]);

  useEffect(()=>
    {
      setLocalWhishList(whishlistResult?.filter(w=>w.user_id===uid));
    },[whishlistResult]);
    
    useEffect(() => {
      if (postResponseData) {
        setLocalWhishList((prev) => [...prev, postResponseData]);
      }
    }, [postResponseData]);

    useEffect(()=>
    {
      window.scrollTo(0,0);
    })
    
    
    
  const destination = result?.find((r)=>(r.id===Number(id)))
    
  const bannerImage = destination?.bannerImage;
  const title = destination?.title;
  const description = destination?.fullDescription;
  const budget = destination?.budget;
  const touristAttractions = destination?.touristAttractions;
  const travelTips = destination?.travelTips;
  const weather = destination?.weather;
  const imageGallery = destination?.imageGallery;
  const similarDestinationsid = destination?.similarDestinations;
  const similarDestinations = result?.filter((r)=>similarDestinationsid?.includes(Number(r.id)));
  
  
  
  
  const whishlistIds = localWhishList?.map((w)=>w.destination_id);
  const handleWishlist = useCallback( async(dest_id) => {
    
    if(whishlistIds?.includes(dest_id))
      {
        const whishListToBeDeleted =localWhishList.find((l)=>l.destination_id===dest_id);
        const id = whishListToBeDeleted?.id
        setLocalWhishList((prev)=>prev.filter(p=>p.id!=id));
        await deleteRecord(id);
      }
      
      else
        {
          postData({user_id:uid,destination_id:dest_id});
        }    
      },[localWhishList,whishlistIds,uid,deleteRecord,postData]);
      
      const isWishlisted = {};
  similarDestinations?.forEach(result => {
    if(whishlistIds?.includes(result.id))
    isWishlisted[result.id] = true;
  });
      
  
          if(loading || whishListDeleteLoading || wishListLoadingPost)
          return <Loader/>
        if(error)
          return <Page404 message={error}/>
        if(!result || result.length===0)
          return <EmptyState title={"Destination"} content={"could not be found"}/>




  return (
  <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>

    {/* Banner */}
    <div className='relative w-full h-96'>
      <img
        src={bannerImage}
        alt={title}
        className='w-full h-full object-cover'
      />
      <div className='absolute inset-0 bg-black/40 flex items-end p-8'>
        <h1 className='font-extrabold text-4xl text-white drop-shadow-lg'>{title}</h1>
      </div>
    </div>

    <div className='max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>

      {/* Left Column */}
      <div className='lg:col-span-2 flex flex-col gap-6'>

        {/* Description */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-6'>
          <h2 className='font-bold text-xl mb-3 text-gray-800 dark:text-white'>About</h2>
          <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>{description}</p>
        </div>

        {/* Tourist Attractions */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-6'>
          <h2 className='font-bold text-xl mb-3 text-gray-800 dark:text-white'>Tourist Attractions</h2>
          <ul className='space-y-2'>
            {touristAttractions?.map((attraction, i) => (
              <li key={i} className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                <span className='text-blue-500'>📍</span> {attraction}
              </li>
            ))}
          </ul>
        </div>

        {/* Travel Tips */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-6'>
          <h2 className='font-bold text-xl mb-3 text-gray-800 dark:text-white'>Travel Tips</h2>
          <ul className='space-y-2'>
            {travelTips?.map((tip, i) => (
              <li key={i} className='flex items-start gap-2 text-gray-600 dark:text-gray-300'>
                <span className='text-yellow-500 mt-0.5'>💡</span> {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Image Gallery */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-6'>
  <h2 className='font-bold text-xl mb-3 text-gray-800 dark:text-white'>Image Gallery</h2>
  <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    spaceBetween={10}
    slidesPerView={1}
    className='rounded-xl'
  >
    {imageGallery?.map((src, i) => (
      <SwiperSlide key={i}>
        <img
          src={src}
          alt={`${title} ${i + 1}`}
          className='w-full h-64 object-cover rounded-xl'
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>

      </div>

      {/* Right Column */}
      <div className='flex flex-col gap-6'>

        {/* Budget */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-6'>
          <h2 className='font-bold text-xl mb-3 text-gray-800 dark:text-white'>Estimated Budget</h2>
          <p className='text-3xl font-extrabold text-blue-600'>{budget}</p>
          <p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>per person</p>
        </div>

        {/* Weather */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-6'>
  <h2 className='font-bold text-xl mb-3 text-gray-800 dark:text-white'>Live Weather</h2>
  <WeatherCard lat={destination.lat} lon={destination.lon} />
  <p className='text-gray-500 dark:text-gray-400 text-sm mt-3'>
    Best months to visit: {weather?.bestMonths?.join(", ")}
  </p>
</div>

        {/* Map */}
        {destination?.lat && destination?.lon && (
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-6'>
            <h2 className='font-bold text-xl mb-3 text-gray-800 dark:text-white'>Location</h2>
            <DestinationMap lat={destination.lat} lon={destination.lon} title={title} />
          </div>
        )}

      </div>
    </div>

    {/* Similar Destinations */}
    <div className='max-w-6xl mx-auto px-6 pb-10'>
      <h2 className='font-bold text-xl mb-4 text-gray-800 dark:text-white'>Similar Destinations</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {similarDestinations?.map((dest, i) => (
          <DestinationCard
            key={i}
            id={dest.id}
            image={dest.image}
            title={dest.title}
            location={dest.location}
            description={dest.description}
            budget={dest.budget}
            season={dest.season}
            tripType={dest.tripType}
            onWishlist={() => handleWishlist(dest.id)}
            isWishlisted={isWishlisted[dest.id]}
          />
        ))}
      </div>
    </div>

  </div>
)
  
}

export default DestinationDetails