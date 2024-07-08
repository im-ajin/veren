import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    Button
  } from 'flowbite-react';
  import logo from '../assets/logo.webp';
  import { Link } from 'react-router-dom';
  import { useSelector } from 'react-redux';
  import { useDispatch } from 'react-redux';
  import {
    signOut,
  } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
  

const NavBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = async () => {
      try {
        await fetch('/api/auth/signout');
        dispatch(signOut());
        navigate('/sign-in')
      } catch (error) {
        console.log(error);
      }
    };

    return (
        
        <Navbar fluid rounded>
          <Link to={'/'}>
          <NavbarBrand>
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">VRMS</span>
          </NavbarBrand>
          </Link>
          <div className="flex md:order-2">
            {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img={currentUser.profilePicture} rounded className='object-cover h-[50px] w-[50px] rounded-full'/>
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block truncate text-sm font-medium">{currentUser.email}</span>
              </DropdownHeader>
              <Link to='/profile'><DropdownItem>Profile</DropdownItem></Link>
              <Link to='/bookings'><DropdownItem>Bookings</DropdownItem></Link>
              {currentUser.isAdmin &&
              <Link to='/dashboard'><DropdownItem>Dashboard</DropdownItem></Link>
              }
              {currentUser &&
              <DropdownItem onClick={handleSignOut} className='text-red-500'>Sign out</DropdownItem>
              }
              
            </Dropdown>
            ) : (
                <Link to='/sign-in'><Button>Sign in</Button></Link>
            )}
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <Link to='/'>
            <NavbarLink>
              Home
            </NavbarLink>
            </Link>
            <Link to='/vehicles'>
            <NavbarLink>
              Vehicles
            </NavbarLink>
            </Link>
            <Link to='/about'>
            <NavbarLink>
              About
            </NavbarLink>
            </Link>
            {currentUser && !currentUser.isAdmin &&
            <Link to='/contact'>
            <NavbarLink>
              Contact
            </NavbarLink>
            </Link>
           }
          </NavbarCollapse>
        </Navbar>
      );
}

export default NavBar