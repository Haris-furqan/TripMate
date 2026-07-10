import { useState } from "react"

const usePagination = (items,perPage) =>
{
    const [currentPage,setCurrentPage] = useState(1);
    const totalPages = Math.ceil((items?.length)/perPage);
    const currentItems = items?.slice((((currentPage-1)*perPage)),(((currentPage)*perPage)))

    return {currentItems,totalPages,currentPage,setCurrentPage}
}

export default usePagination;