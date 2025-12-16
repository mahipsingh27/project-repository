import { useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const[visible,setVisible]=useState(false);
  const{setShowSearch , getCartCount,navigate,token,setToken,setCartItems} =useContext(ShopContext);

  const logout = ()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'><img src={assets.logo} className='w-36' alt="" /></Link>
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 items-center'>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <div className='group relative'>
          <div className='flex flex-col items-center gap-1 cursor-pointer'>
            <p>ACCESSORIES</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
          </div>
          <div className='group-hover:block hidden absolute dropdown-menu left-0 pt-4'>
            <div className='flex flex-col gap-2 w-48 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg'>
              <Link to='/graphicscard' className='cursor-pointer hover:text-black'>Graphics Card</Link>
              <Link to='/hdd' className='cursor-pointer hover:text-black'>HDD</Link>
              <Link to='/ssd' className='cursor-pointer hover:text-black'>SSD</Link>
              <Link to='/smps' className='cursor-pointer hover:text-black'>SMPS</Link>
              <Link to='/motherboard' className='cursor-pointer hover:text-black'>Motherboard</Link>
              <Link to='/processor' className='cursor-pointer hover:text-black'>Processor</Link>
              <Link to='/ram' className='cursor-pointer hover:text-black'>RAM</Link>
            </div>
          </div>
        </div>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>

      </ul>
      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className='group relative'>
         <img onClick={()=> token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
         {/*---------------Dropdown Menu------------------ */}
          {token && 
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>}
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
          <p className='absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[9px] font-semibold'>{getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      {/* Side bar menu for small screen */}
      <div className={`absolute top-0 right-0 h-full overflow-hidden bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border'to='/'>HOME</NavLink>
          <div className='py-2 pl-6 border'>
            <p className='mb-2 font-semibold'>ACCESSORIES</p>
            <div className='flex flex-col pl-4 gap-2'>
              <Link onClick={()=>setVisible(false)} to='/graphicscard' className='text-sm text-gray-600 hover:text-black'>Graphics Card</Link>
              <Link onClick={()=>setVisible(false)} to='/hdd' className='text-sm text-gray-600 hover:text-black'>HDD</Link>
              <Link onClick={()=>setVisible(false)} to='/ssd' className='text-sm text-gray-600 hover:text-black'>SSD</Link>
              <Link onClick={()=>setVisible(false)} to='/smps' className='text-sm text-gray-600 hover:text-black'>SMPS</Link>
              <Link onClick={()=>setVisible(false)} to='/motherboard' className='text-sm text-gray-600 hover:text-black'>Motherboard</Link>
              <Link onClick={()=>setVisible(false)} to='/processor' className='text-sm text-gray-600 hover:text-black'>Processor</Link>
              <Link onClick={()=>setVisible(false)} to='/ram' className='text-sm text-gray-600 hover:text-black'>RAM</Link>
            </div>
          </div>
          <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border'to='/about'>ABOUT</NavLink>
          <NavLink onClick={()=>setVisible(false)}className='py-2 pl-6 border'to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
