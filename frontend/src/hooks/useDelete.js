import axios from "axios"
import { useState } from "react"
 const useDelete = (url) =>
 {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const  deleteRecord = async (id) =>
  {
    setLoading(true);
    try
    {
    const response = await axios.delete(`${url}/${id}`);
    setResult(response.data);
    }
    catch(err)
    {
        setError(err.message);
    }
    finally
    {
        setLoading(false);
    }

  }

  
  return {deleteRecord,result,loading,error}

 }

 export default useDelete;