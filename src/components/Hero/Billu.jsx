import React from 'react'
import BilluImg from '../../assets/Billu.png'

const Billu = () => {
  return (
    <div 
      className='h-[90%]  rounded-full w-[90%] bg-cover bg-center'
      style={{ backgroundImage: `url(${BilluImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
    </div>
  )
}

export default Billu