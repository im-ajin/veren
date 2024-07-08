import React from 'react'
import { Card } from 'flowbite-react';
import { Button } from 'flowbite-react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

const VehicleCard = ({vehicleName, vehicleModel, vehiclePicture, vehicleCc, vehicleId, isAdmin, setVehicleIdToDelete,setShowModal}) => {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=''>
    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
    >
      <div className='h-[250px] w-[300px]'>
        <img src={vehiclePicture} alt="" className='h-full w-full object-cover biganimation'/>
      </div>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {vehicleName}
      </h5>
      <div className='flex justify-between'>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Model <span>{vehicleModel}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {vehicleCc}
      </p>
      </div>
      <Link to={`vehicle/${vehicleId}`}>
      <Button className='w-full'>See More Details</Button>
      </Link>
      {isAdmin &&
      <div className='flex gap-3 w-full'>
        <Link to={`/editVehicle/${vehicleId}`} className='flex-1'>
          
          <Button className='flex-1 bg-gray-400 w-full'>Edit</Button>
          </Link>
        <Button className='flex-1 bg-red-600' onClick={
          ()=>{setVehicleIdToDelete(vehicleId)
               setShowModal(true)
          }
        }>Remove</Button>
      </div>
}
    </Card>
    </div>
  );
}


export default VehicleCard