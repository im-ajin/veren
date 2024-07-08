import React, {useEffect, useState} from 'react'
import { Sidebar } from 'flowbite-react'
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { TbBrandBooking } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { LuMessageSquare } from "react-icons/lu";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTap] = useState('');

  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTap(tabFromUrl)
    }
  },[location.search])

  const handleSignout = async () => {
    try{
      const res = await fetch('/api/user/signout',{
        method: 'POST'
      })
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess())
      }
    }catch(error){
      console.log(error.message);
    }
}

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=addash'>
              <Sidebar.Item active={tab === 'addash' || !tab} icon={HiChartPie} as='div'>
                Dashboard
              </Sidebar.Item>
              </Link>
            )
          }
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=addveh'>
              <Sidebar.Item active={tab === 'addveh' || !tab} icon={IoMdAdd} as='div'>
                Add Vehicle
              </Sidebar.Item>
              </Link>
            )
          }
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=bookings'>
              <Sidebar.Item active={tab === 'bookings' || !tab} icon={TbBrandBooking} as='div'>
                Bookings
              </Sidebar.Item>
              </Link>
            )
          }
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=users'>
              <Sidebar.Item active={tab === 'users' || !tab} icon={FiUsers} as='div'>
                Users
              </Sidebar.Item>
              </Link>
            )
          }
          {
            currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=message'>
              <Sidebar.Item active={tab === 'message' || !tab} icon={LuMessageSquare} as='div'>
                Messages
              </Sidebar.Item>
              </Link>
            )
          }
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar