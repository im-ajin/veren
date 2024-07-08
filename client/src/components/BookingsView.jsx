import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from 'flowbite-react';

const BookingsView = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    

    useEffect(() => {
        const fetchBookings = async () => {
          try {
            const response = await fetch('/api/booking/getallbookings');
            if (!response.ok) {
              throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchBookings();
      }, [])

      async function handleDeleteBooking(id){
        try{
            const res = await fetch(`/api/booking/removebooking/${id}`,{
                method: 'DELETE'
            });
            if(!res.ok){
                setError('error occured')
                enqueueSnackbar('Something wrong',{ variant : 'error'})
                return
            }
            if(res.ok){
                const updatedBookings = bookings.filter((booking) => booking._id !== id)
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
      {bookings.length <= 0 ? (
        <p className='pl-8 mt-24'>Current Bookings are not available</p>
      ) : (
<TableContainer component={Paper} className="overflow-x-auto">
      <Table className="table-auto">
        <TableHead>
          <TableRow>
            <TableCell className="px-4 py-2">User ID</TableCell>
            <TableCell className="px-4 py-2">Vehicle ID</TableCell>
            <TableCell className="px-4 py-2">Start Date Time</TableCell>
            <TableCell className="px-4 py-2">End Date Time</TableCell>
            <TableCell className="px-4 py-2">Total Price</TableCell>
            <TableCell className="px-4 py-2">Advance Paid</TableCell>
            <TableCell className="px-4 py-2">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell className="px-4 py-2">{booking.userId}</TableCell>
              <TableCell className="px-4 py-2">{booking.vehicleId}</TableCell>
              <TableCell className="px-4 py-2">{booking.startDateTime}</TableCell>
              <TableCell className="px-4 py-2">{booking.endDateTime}</TableCell>
              <TableCell className="px-4 py-2">{booking.totalPrice}</TableCell>
              <TableCell className="px-4 py-2">{booking.advPayed}</TableCell>
              <TableCell className="px-4 py-2">
                <Button className="bg-red-500 hover:bg-red-600 text-white font-bold rounded" onClick={()=>{
                  handleDeleteBooking(booking._id)
                }}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )}
    </>
      );
    };

export default BookingsView