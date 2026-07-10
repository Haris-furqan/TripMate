import React from 'react'

const Button = ({content,onClick,color='blue'}) => {
  return (
    <button className=' py-2 m-1 font-bold   px-4 rounded-2xl text-white bg-blue-600 transition-all duration-300 hover:scale-110' onClick={onClick}  >{content}</button>
  )
}

export default Button