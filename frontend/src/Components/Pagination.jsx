import React from 'react'
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    return (
        <div className='flex justify-center items-center gap-3 mt-4'>
            {/* Previous Button */}
            <button 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(currentPage - 1)} 
                className="p-2.5 rounded-lg border border-gray-300 text-gray-600 transition-colors
                           hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent
                           dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:disabled:hover:bg-transparent"
            >
                <FaLessThan className="w-3 h-3" />
            </button>

            {/* Page Numbers */}
            <div className='flex gap-2'>
                {
                    Array.from({ length: totalPages }, (_, i) => {
                        const pageNum = i + 1;
                        const isActive = currentPage === pageNum;
                        
                        return (
                            <button 
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)} 
                                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all
                                    ${isActive 
                                        ? 'bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500' 
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })
                }
            </div>

            {/* Next Button */}
            <button 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2.5 rounded-lg border border-gray-300 text-gray-600 transition-colors
                           hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent
                           dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:disabled:hover:bg-transparent"
            >
                <FaGreaterThan className="w-3 h-3" />
            </button>
        </div>
    )
}

export default Pagination