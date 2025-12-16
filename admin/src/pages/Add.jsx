import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'

const Add = ({token}) => {
  const[image1,setImage1]=useState(false)
  const[name,setName]=useState("");
  const[description,setDescription]=useState("");
  const[price,setPrice]=useState("");
  const[category,setCategory]=useState("Processor");
  const[subCategory,setSubCategory]=useState("Intel");
  const[bestseller,setBestseller]=useState(false);

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller ? "true" : "false")

      image1 && formData.append("image1",image1)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setPrice('')
        setCategory("Processor")
        setSubCategory("Intel")
        setBestseller(false)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "Failed to add product")
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Here' required/>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content Here' required/>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Processor">Processor</option>
            <option value="Motherboard">Motherboard</option>
            <option value="Ram">Ram</option>
            <option value="GraphicsCard">Graphics Card</option>
            <option value="Smps">SMPS</option>
            <option value="SSD">SSD</option>
            <option value="HDD">HDD</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product subcategory</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Intel">Intel</option>
            <option value="Amd">Amd</option>
            <option value="Asus">Asus</option>
            <option value="Msi">Msi</option>
            <option value="Gigabyte">Gigabyte</option>
            <option value="WD">WD</option>
            <option value="Seagate">Seagate</option>
            <option value="Toshiba">Toshiba</option>
            <option value="Acer">Acer</option>
            <option value="Adata">Adata</option>
            <option value="Samsung">Samsung</option>
            <option value="Cooler Master">Cooler Master</option>
            <option value="Corsair">Corsair</option>
            <option value="Kingston">Kingston</option>
            <option value="Nvidia">Nvidia</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25'/>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller'/>
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>Add</button>
    </form>
  )
}

export default Add
