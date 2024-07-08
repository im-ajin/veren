import React, {useEffect, useState} from 'react'
import { Card } from 'flowbite-react'

const AdminBoard = () => {
  const [details, setDetails] = useState({});

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/getdetails');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='flex flex-col gap-5 p-5 md:flex-row md:justify-around items-center justify-center'>
    <Card href="#" className="flex items-center biganimation w-64 min-h-40">
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Total Vehicles: <span className='font-bold'>{details.totalVehicleCount}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Available Vehicles: <span className='font-bold'>{details.totalVehicleCount - details.totalBookingCount}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Booked Vehicles: <span className='font-bold'>{details.totalBookingCount}</span>
      </p>
    </Card>

    <Card href="#" className="flex items-center biganimation w-64 h-40">
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Total Users: <span className='font-bold'>{details.totalUserCount}</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Last Month Joined Users: <span className='font-bold'>{details.lastMonthJoinedUsers}</span>
      </p>
      {/* <p className="font-normal text-gray-700 dark:text-gray-400">
      Admins Count: <span>3</span>
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Customers : <span>4</span>
      </p> */}
    </Card>
    <Card href="#" className="max-w-sm flex items-center biganimation w-64 h-40">
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Current Bookings: <span className='font-bold'>{details.totalBookingCount}</span>
      </p>
      
    </Card>
    </div>
  )
}

export default AdminBoard