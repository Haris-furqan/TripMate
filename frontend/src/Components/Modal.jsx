import React from 'react'

const Modal = ({children,onClose,isOpen}) => {
    if(!isOpen)
    {
        return null;
    }
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-white p-5 rounded-2xl max-w-md w-full'>
            <button onClick={onClose} >❌</button>
            {children}
        </div>
    </div>
  )
}

export default Modal