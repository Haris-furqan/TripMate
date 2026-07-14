import React, { useEffect, useState,useMemo, useCallback } from 'react'
import useFetch from '../hooks/useFetch'
import usePost from '../hooks/usePost';
import useDelete from "../hooks/useDelete"
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import DestinationCard from '../Components/DestinationCard';
import Page404 from './Page404';
import Loader from '../Components/Loader';
import EmptyState from '../Components/EmptyState';
import SearchBar from '../Components/SearchBar';
import Button from '../Components/Button';
import FilterPanel from '../Components/FilterPanel';
import useDebounce from '../hooks/useDebounce';
import usePagination from '../hooks/usePagination';
import Pagination from '../Components/Pagination';

const ExploreDestinations = () => {



  const [search,setSearch] = useState("");
  const [state,setState] = useState(false);
  const [showFilter,setShowFilter] = useState(false);
  const [country,setCountry] = useState("");
  const [range,setRange] = useState(0);
  const [season,setSeason] = useState("");
  const [tripType,setTripType] = useState("");
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [localWhishList,setLocalWhishList] = useState([]);

  const mockapi1 = import.meta.env.VITE_MOCKAPI1;
  const mockapi4 = import.meta.env.VITE_MOCKAPI4;


  const {loading:wishListLoadingPost,data:postResponseData,postData,error:wishListErrorPost} = usePost(`https://${mockapi4}/api/whishlist`);
  const {result:destinationResultGet,loading:destinationLoadingGet,error:destinationErrorGet} = useFetch(`https://${mockapi1}/api/destinations`);
  const {result:whishlistResult} = useFetch(`https://${mockapi4}/api/whishlist`);
  const {deleteRecord} = useDelete(`https://${mockapi4}/api/whishlist`)
  
  
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
      },[])
      

  const {user} = useContext(AuthContext);
  const uid = user?.uid;
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




  const locations = destinationResultGet?.map((r)=>(r.location))

  const hasActiveFilters = Boolean(country || range || season || tripType);

  const debouncedSearch  = useDebounce(search,500);

const filterResults = useMemo(() => {
  return destinationResultGet?.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    const matchesCountry = !country || r.location === country
    const matchesSeason = !season || r.season.toLowerCase() === season.toLowerCase()
    const matchesTripType = !tripType || r.tripType.toLowerCase() === tripType.toLowerCase()
    const matchesBudget = !range || Number(r.budget.split("$")[1]) <= range
    return matchesSearch && matchesCountry && matchesSeason && matchesTripType && matchesBudget
  })
}, [destinationResultGet, debouncedSearch, country, season, tripType, range])

  const displayedResults = wishlistOnly
  ? filterResults?.filter((r) => whishlistIds.includes(r.id))
  : filterResults;

  const {currentItems,totalPages,currentPage,setCurrentPage} = usePagination(displayedResults,5);

  const isWishlisted = {};
  displayedResults?.forEach(result => {
    if(whishlistIds?.includes(result.id))
    isWishlisted[result.id] = true;
  });
  

  
  

  if (destinationLoadingGet || wishListLoadingPost) 
    return <Loader/>
  if (destinationErrorGet || wishListErrorPost)
    return <Page404 message={`${destinationErrorGet},${wishListErrorPost}`}/>
  if (!destinationResultGet || destinationResultGet.length===0)   
    return <EmptyState/>
  
  return (
   <div className="dark:bg-gray-900 min-h-screen">
  <div className='flex flex-col md:flex-row md:items-center gap-3 m-0 p-5'>
  <h1 className='font-extrabold  text-3xl text-blue-600'>Explore Destinations</h1>
  
  <div className='flex items-center gap-2 flex-wrap'>
    <SearchBar value={search} placeHolder={"e.g Kyoto"} onChange={(e) => setSearch(e.target.value)} />
    <Button content={"Filter"} onClick={() => setShowFilter(!showFilter)} />
    <Button
      content={wishlistOnly ? "Show All" : "Show Wishlist Only"}
      onClick={() => setWishlistOnly(!wishlistOnly)}
    />
    {hasActiveFilters && <Button content={"Clear Filter"} onClick={() => { setCountry(""); setRange(0); setSeason(""); setTripType(""); }} />}
  </div>
</div>

  {showFilter && <FilterPanel countries={locations} onCountryChange={setCountry} onRangeChange={setRange} onSeasonChange={setSeason} onTripTypeChange={setTripType} />}

  <div className='destination-cards grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-5'>
    {currentItems.map((r) => (
      <DestinationCard
        key={r.id}
        id={r.id}
        image={r.image}
        title={r.title}
        location={r.location}
        description={r.description}
        budget={r.budget}
        season={r.season}
        tripType={r.tripType}
        onWishlist={() => handleWishlist(r.id)}
        isWishlisted={isWishlisted[r.id]}
        updateParent={setState}
      />
    ))}
  </div>
  <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
</div>
  )
}

export default ExploreDestinations