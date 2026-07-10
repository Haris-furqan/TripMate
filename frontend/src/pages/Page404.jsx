import React from 'react'

const Page404 = ({status='404',message='NOT FOUND'}) => {
  return (
    <div className='flex  h-screen justify-center items-center '>
      <div className='h-1/3 w-1/3 rounded-2xl flex flex-col justify-center items-center border border-orange-400 bg-amber-300'>
      <h1 className='text-orange-400 text-4xl font-extrabold'>{status}</h1>
      <p className='text-orange-500 font-semibold '>{message}</p>
      </div>
    </div>
  )
}

export default Page404