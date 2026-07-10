import { useState } from "react"
import axios from "axios"

const useEdit = (baseUrl) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editRecord = async (id, newData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${baseUrl}/${id}`, newData);
      setResult(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editRecord, result, loading, error };
};

export default useEdit;