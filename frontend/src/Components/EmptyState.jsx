import React from 'react'

const EmptyState = ({title,content}) => {
  return (

    <div className='flex flex-col  gap-5 justify-center items-center item-center border-2 border-gray-300 rounded-2xl max-w-md p-7 h-auto '>
        <span className='text-5xl'>👺</span>
        <h2 className='text-blue-500 font-bold text-3xl ' >{title}</h2>
        <p className='text-gray-400 ' >{content}</p>
    </div>
  )
}

export default EmptyState