import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Contact from './pages/Contact'
import Login from './pages/Login'
import GraphicsCard from './pages/GraphicsCard'
import Motherboard from './pages/Motherboard'
import Processor from './pages/Processor'
import Hdd from './pages/Hdd'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vm] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/graphicscard' element={<GraphicsCard/>}/>
        <Route path='/motherboard' element={<Motherboard/>}/>
        <Route path='/processor' element={<Processor/>}/>
        <Route path='/hdd' element={<Hdd/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
        <Route path='/ram' element={<Ram/>}/>
        <Route path='/ssd' element={<Ssd/>}/>
        <Route path='/smps' element={<Smps/>}/>
       </Routes>
    </div>
  )
}

export default App
