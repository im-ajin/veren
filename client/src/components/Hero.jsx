import React from 'react'
import { Button } from 'flowbite-react';
import car1 from '../assets/car1.webp';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='min-h-screen flex flex-col lg:flex-row'>
        <div className='flex flex-col gap-8 p-5 justify-center min-h-screen lg:p-10'>
           <h1 className='font-bold text-6xl bsdblue'>
            Find, book, <br />rent a <span className='bsblue'>vehicle</span> <br />quick and <br />super easy
           </h1>
           <p className='text-xl bsdblue'>
            Streamline your vehicle rental experience with our effortless booking process.
           </p>
           <Link to={'/vehicles'}>
           <Button className='bg-bsblue bsdblue w-[250px] hover:bg-transparent'>Explore vehicles</Button>
           </Link>
        </div>
        <div className='flex items-center justify-center'>
           <div className='p-10'>
           <img src={car1} alt="logo" className='biganimation'/>
           </div>
        </div>
      </div>
  )
}

export default Hero