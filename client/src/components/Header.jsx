import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import car1 from '../assets/car1.webp';
import logo from '../assets/logo.webp';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='px-5'>
      <div className='flex justify-between items-center p-3 '>
        <Link to='/'>
          <div className='flex items-center gap-3 '>
            <img src={logo} alt="logo" height={35} width={35}/>
          <h1 className='bsdblue font-bold text-3xl '>VRMS</h1>
          </div>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/vehicles'>
            <li>Vehicles</li>
          </Link>
          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
