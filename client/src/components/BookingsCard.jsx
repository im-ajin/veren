import React, { useEffect, useState } from 'react'
import { Card } from 'flowbite-react';
import { Button } from 'flowbite-react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

const BookingsCard = ({vehicleId, startDateTime, endDateTime, totalPrice, advPayed, setShowModal, setIdToDelete, bookingId}) => {

  const { currentUser } = useSelector((state) => state.user);

  const [vehcile, setVehicle] = useState(null);
  const [error, setError] = useState(null);


  useEffect(()=>{
    async function fetchVehicle(){
        try {
            const res = await fetch(`/api/vehicle/getVehicle/${vehicleId}`);
            const data = await res.json();
            if (!res.ok) {
              setError(true);
              return;
            }
            if (res.ok) {
              setVehicle(data.vehicle);
              setError(null);
            }
          } catch (error) {
            setError(true);
          }
          
    }
    fetchVehicle();
  },[vehicleId])

  return (
    <>
    {vehcile &&
    <div className=''>
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
    >
      <div className='h-[250px] w-[300px] mx-auto'>
        <img src={vehcile.vehiclePicture} alt="" className='h-full w-full object-cover biganimation'/>
      </div>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {vehcile.vehicleName}
      </h5>
      <div className='flex justify-between'>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Start DateTime :  <span>{startDateTime}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      End DateTime :  <span>{startDateTime}</span>
      </p>
      </div>
      <div className='flex justify-between'>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Total Price :  <span>{totalPrice}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Advance Payed :  <span>{advPayed}</span>
      </p>
      </div>
      <div className='flex gap-3 w-full'>
        <Button className='flex-1 bg-red-600' onClick={
          ()=>{
               setShowModal(true);
               setIdToDelete(bookingId)
          }
        }>Remove Booking</Button>
      </div>
    </Card>
    </div>
}
    </>
  );
}


export default BookingsCard