import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BookingsCard from '../components/BookingsCard';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";
import { useSnackbar } from "notistack";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null)
    const { currentUser } = useSelector((state) => state.user);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        async function fetchBookings(){
            const res = await fetch(`/api/booking/getbookings/${currentUser._id}`);
            const data = await res.json();
            if(!res.ok){
               setError('error occured');
               return
            }
            if(res.ok){
                setBookings(data)
            }
        }
        fetchBookings();
    },[])

    async function handleDeleteBooking(){
        try{
            const res = await fetch(`/api/booking/removebooking/${idToDelete}`,{
                method: 'DELETE'
            });
            if(!res.ok){
                setError('error occured')
                enqueueSnackbar('Something wrong',{ variant : 'error'})
                return
            }
            if(res.ok){
                const updatedBookings = bookings.filter((booking) => booking._id !== idToDelete)
                setBookings(updatedBookings)
                enqueueSnackbar('Booking removed successfully',{ variant : 'success'})
            }
        }
        catch(error){
            setError('error occured')
        }
    }

  return (
    <>
    <div className='flex flex-wrap justify-center gap-10 mt-10 min-h-screen'>
    {bookings.length > 0 ? (
        bookings.map((booking) => (
            <BookingsCard key={booking._id} vehicleId={booking.vehicleId} startDateTime={booking.startDateTime} endDateTime={booking.endDateTime} totalPrice={booking.totalPrice} advPayed={booking.advPayed} setIdToDelete={setIdToDelete} setShowModal={setShowModal}
            bookingId={booking._id}/>
        ))
    ) : (
        <p>Booking not available</p>
    )}
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
                  Remove Booking?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button
                    color="failure"
                    onClick={() => {
                      setShowModal(false);
                      handleDeleteBooking();
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                  type="button"
                    color="gray"
                    onClick={() => {
                      setShowModal(false);
                      setIdToDelete(null);
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

export default Bookings