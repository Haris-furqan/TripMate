import React from 'react'

const InputField = ({placeHolder,value,onChange,type='text',name,id}) => {
  return (
    <input type={type}
    id={id}
    name={name}
    placeholder={placeHolder}
    value={value}
    onChange={onChange}
    className='border-2 border-gray-300 rounded-3xl p-4 outline-none focus:border-blue-500 transition-colors duration-300' />
  )
}

export default InputField