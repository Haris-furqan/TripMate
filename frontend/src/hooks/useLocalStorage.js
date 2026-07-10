import { useEffect, useState } from "react"

const useLocalStorage = (key,initialVal) =>
{
    const [value,setValue] = useState(() => {
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : initialVal
})


    useEffect(()=>
    {
        localStorage.setItem(key,JSON.stringify(value));
    },[value])

    return [value,setValue];
}

export default useLocalStorage;