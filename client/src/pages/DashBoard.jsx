import React, { useState, useEffect} from 'react'
import DashSidebar from '../components/DashSidebar'
import AdminBoard from '../components/AdminBoard'
import { useLocation } from 'react-router-dom'
import AddVehicle from '../components/AddVehicle'
import BookingsView from '../components/BookingsView'
import UsersView from '../components/UsersView'
import Messages from '../components/Messages'

const DashBoard = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
    <div>
      <DashSidebar />
    </div>
    <div className='flex-1'>
    {tab === 'addash' || tab === '' ? <AdminBoard /> : null}
    {tab === 'addveh' && <AddVehicle />}
    {tab === 'bookings' && <BookingsView />}
    {tab === 'users' && <UsersView />}
    {tab === 'message' && <Messages/>}
    </div>
    </div>
  )
}

export default DashBoard