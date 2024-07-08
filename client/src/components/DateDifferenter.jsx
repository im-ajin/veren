import { Button, TextInput } from 'flowbite-react';
import React, {useEffect, useState} from 'react';
import { useSnackbar } from "notistack";
import { useSelector } from 'react-redux';

const DateDifferenter = ({vehicleRrpm, vehicleId}) => {
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');
    const [difference, setDifference] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [advance, setAdvance] = useState(null);
    const [payedAdvance, setPayedAdvance] = useState(null);
    const [error, setError] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    const { currentUser } = useSelector((state) => state.user);

    const { enqueueSnackbar } = useSnackbar();


    const handleStartDateTimeChange = (e) => {
        setStartDateTime(e.target.value);
    };

    const handleEndDateTimeChange = (e) => {
        setEndDateTime(e.target.value);
        
    };

    useEffect(() => {
        calculateDifference();
    },[startDateTime,endDateTime])

    const calculateDifference = () => {
        if(startDateTime && endDateTime){

        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);
        const today = new Date();
        
        if (startDate < today || endDate < today || startDate > endDate) {
            setError("Choose the correct date")
            return;
        }
        // Calculate the difference in milliseconds
        const differenceInMillis = endDate.getTime() - startDate.getTime();

        // Convert milliseconds to days and remaining milliseconds
        const daysDifference = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
        const remainingMillis = differenceInMillis % (1000 * 60 * 60 * 24);

        // Calculate hours, minutes, and seconds from the remaining milliseconds
        const hoursDifference = Math.floor(remainingMillis / (1000 * 60 * 60));
        const minutesDifference = Math.floor((remainingMillis % (1000 * 60 * 60)) / (1000 * 60));
        let totalP = daysDifference*24*60*vehicleRrpm + hoursDifference*60*vehicleRrpm + minutesDifference*vehicleRrpm;
        setTotalPrice(totalP)
        setAdvance(Math.round(totalP / 100 * 25))
        // Set the difference in state
        setDifference({
            days: daysDifference,
            hours: hoursDifference,
            minutes: minutesDifference
        });
        setError(null)
        
    }else{
        return null
    }
    };

   async function handleBooking(){
        if(!startDateTime || !endDateTime || !totalPrice){
            enqueueSnackbar('Please fill all the fields',{ variant : 'error'})
            return
        }
        if(!payedAdvance || payedAdvance<advance || payedAdvance>totalPrice){
            enqueueSnackbar('Please pay the correct advance',{ variant : 'error'})
            return
        }
        try{
            let bookingDetails = {
                userId : currentUser._id,
                vehicleId,
                startDateTime,
                endDateTime,
                totalPrice,
                advPayed : payedAdvance
            }
            const res = await fetch('/api/booking/addbooking',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(bookingDetails)
            });
            const data = await res.json();
            if(!res.ok){
              setUploadError(data.message);
              enqueueSnackbar('Vehicle Unavaialble. Please choose another vehicle',{ variant : 'error'})
              return
            }
           
            if(res.ok){
              setUploadError(null)
             // navigate('/vehicles')
              enqueueSnackbar('Vehicle Booked Successfully',{ variant : 'success'})
            }
      
          }catch(error){
            setUploadError('Something went wrong')    
            console.log(error.message);
          }
    }

    return (
        <div>
            <form className='flex flex-col gap-2'>
                {error && <p className='text-red-500'>{error}</p>}
            <div className='flex justify-center items-center'>
            <label htmlFor="startDateTime">Start Date and Time:</label>
            <input
                type="datetime-local"
                id="startDateTime"
                value={startDateTime}
                onChange={handleStartDateTimeChange}
                required
            />
            </div>
            <div className='flex justify-center items-center gap-2'>
            <label htmlFor="endDateTime">End Date and Time:</label>
            <input
                type="datetime-local"
                id="endDateTime"
                value={endDateTime}
                onChange={handleEndDateTimeChange}
                required
            />
             </div>
            {difference && (
                <>
                <div className='flex justify-between items-center'>
                    <p>Days: {difference.days}</p>
                    <p>Hours: {difference.hours}</p>
                    <p>Minutes: {difference.minutes}</p>
                </div>
                <p>Total Amount : <span>{totalPrice}</span></p>
                <p>Minimum advance Payable : <span>{advance}</span></p>
                <div>
                   <TextInput placeholder='Pay the advance Amount' onChange={(e)=>{setPayedAdvance(e.target.value)}} type='Number'/>
                  <Button className='w-full mt-4 mb-20' onClick={handleBooking} disabled={error ? true : false}>Confirm Booking</Button>
                </div>
                </>
            )}
            </form>
        </div>
    );
};

export default DateDifferenter;