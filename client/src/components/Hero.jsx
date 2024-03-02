import React from 'react'
import { Button } from 'flowbite-react';
import car1 from '../assets/car1.webp';

const Hero = () => {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
        <div className='flex flex-col gap-8 p-5 justify-center min-h-screen '>
           <h1 className='font-bold text-6xl bsdblue'>
            Find, book, <br />rent a <span className='bsblue'>vehicle</span> <br />quick and <br />super easy
           </h1>
           <p className='text-xl bsdblue'>
            Streamline your vehicle rental experience with our effortless booking process.
           </p>
           <Button className='bg-bsblue bsdblue w-[250px]'>Explore vehicles</Button>
        </div>
        <div className='flex items-center justify-center'>
           <div className='p-10'>
           <img src={car1} alt="logo" />
           </div>
        </div>
      </div>
  )
}

export default Hero