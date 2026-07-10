import { useEffect, useState } from "react"

const useDebounce = (value,timeout) =>
{
    const [delayedValue,setDelayedValue] = useState("");
    useEffect(()=>
    {
        const timer = setTimeout(()=>{
            setDelayedValue(value);
        },timeout)

        return () => clearTimeout(timer);
    },[value,timeout])

    return delayedValue;

}

export default useDebounce


