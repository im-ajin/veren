import React, { useEffect, useState } from 'react';
import { Button, Modal, TextInput } from "flowbite-react";
import { IoSearchSharp } from "react-icons/io5";
import VehicleCard from '../components/VehicleCard';
import { useSelector } from 'react-redux';
import { useSnackbar } from "notistack";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Vehicles = () => {

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [vehcileIdToDelete, setVehicleIdToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filterVehicles = vehicles.filter((vehicle) =>
    Object.values(vehicle).some((field) =>
      String(field).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  

  const { enqueueSnackbar } = useSnackbar();

  const { currentUser } = useSelector((state) => state.user); 
 
  async function handleVehicleDelete(id){
      try{
        const res = await fetch(`/api/vehicle/deleteVehicle/${id}`,{
          method: 'DELETE'
      });
        if(!res.ok){
          setError(res.message);
          setVehicleIdToDelete(null)
          enqueueSnackbar('Something wrong',{ variant : 'error'})
        }
        if(res.ok){
          setError(null)
          const updatedVehicle = vehicles.filter((vehicle) => vehicle._id !== id)
          setVehicles(updatedVehicle)
          setVehicleIdToDelete(null)
          enqueueSnackbar('Vehicle removed Successfully',{ variant : 'success'})
        }
      }catch(error){
        setError(error.message);
        setVehicleIdToDelete(null)
        enqueueSnackbar('Something wrong',{ variant : 'error'})
      }
  }

  useEffect(()=>{

    const fetchVehicles = async () => {
      try{
          setLoading(true);
          const res = await fetch(`/api/vehicle/getVehicles`);
          const data = await res.json();
          if(!res.ok){
              setError(true)
              setLoading(false)
              return
          }
          if(res.ok){
              setVehicles(data)
              setLoading(false)
              setError(null)
          }
      }catch(error){
          setError(true);
          setLoading(false);
      }
  }
  fetchVehicles();

  return () => {setLoading([])}
 
  },[])
  return (
    <>
    <div className='flex  justify-center md:justify-end md:pr-[68px]'>
    <TextInput type="text" placeholder='search' onChange={(e) => {setSearchQuery(e.target.value)}} value={searchQuery} rightIcon={IoSearchSharp}/>
    </div>
    <div className='flex flex-wrap justify-center gap-10 mt-10 min-h-screen mb-80'>
    
      {
        filterVehicles.length > 0 ? (
          filterVehicles.filter((vehicle) => !vehicle.vehicleRentStatus).map((vehicle) => (
              <VehicleCard 
              key={vehicle._id}
              vehicleName = {vehicle.vehicleName}
              vehicleModel = {vehicle.vehicleModel}
              vehiclePicture = {vehicle.vehiclePicture}
              vehicleCc = {vehicle.vehicleCc}
              vehicleId = {vehicle._id}
              isAdmin = {currentUser.isAdmin}
              setVehicleIdToDelete = {setVehicleIdToDelete}
              setShowModal = {setShowModal}
              />
            ))
        ): 'No Vehicles are available'
      }
    </div>
    <Modal
            show={showModal}
            onClick={() => {
              setShowModal(false);
            }}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-12 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                  Are you sure remove this vehicle?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    color="failure"
                    onClick={() => {
                      setShowModal(false);
                      handleVehicleDelete(vehcileIdToDelete);
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => {
                      setShowModal(false);
                      setVehicleIdToDelete(null);
                    }}
                  >
                    No
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
    </>
  )
}

export default Vehicles