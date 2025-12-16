import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Tech Computers, your trusted destination for high-quality PC components and cutting-edge computing solutions. Whether you’re building a custom gaming rig, upgrading your workstation, or searching for reliable hardware for everyday use, we bring you the best components from top brands—all in one place</p>
          <p>At Tech Computers, we believe in delivering performance, reliability, and value. Our catalog includes processors, graphics cards, motherboards, RAM, storage devices, power supplies, and everything you need to create the perfect PC setup. With a focus on genuine products, competitive prices, and excellent customer support, we aim to make your tech-shopping experience smooth and satisfying.</p>\
          <b className='text-gray-800'>Our Mission</b>
          <p>At Tech Computers, our mission is to make high-performance PC components accessible, affordable, and trustworthy for everyone—from beginners to professional builders. We aim to simplify the computer-building journey by offering genuine products, expert guidance, and dependable customer service.We strive to empower our customers with the right tools, the right knowledge, and the right prices so they can build, upgrade, and experience technology without limitations. Our commitment is to deliver quality, transparency, and satisfaction in every purchase.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance :</b>
          <p className='text-gray-600'>At Tech Computers, we place quality at the core of everything we do. Every product we offer—whether it's a processor, graphics card, or peripheral—is sourced from trusted and verified manufacturers to ensure authenticity and peak performance.We perform thorough quality checks, partner only with reputable brands, and maintain strict standards so our customers receive components that are durable, reliable, and ready to perform.Our commitment doesn’t end at delivery. We provide responsive support, clear warranty policies, and guidance to ensure every purchase meets your expectations. With Tech Computers, you can shop with confidence knowing your system is built with components you can trust.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience :</b>
          <p className='text-gray-600'>At Tech Computers, we prioritize making your shopping experience as smooth and effortless as possible. From browsing to checkout, every step is designed for simplicity and speed. Our well-organized categories, powerful search options, and detailed product descriptions help you find exactly what you need in seconds.We offer fast delivery, secure payment options, and real-time order tracking so you always know where your purchase stands. Whether you’re a first-time builder or a tech expert, our user-friendly interface and responsive support ensure a hassle-free and convenient shopping experience every time.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service :</b>
          <p className='text-gray-600'>We offer prompt responses, expert guidance, and clear communication to ensure every customer feels valued and supported. Your satisfaction is our top priority, and we go the extra mile to make sure every interaction with Tech Computers is smooth, helpful, and trustworthy.</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About
