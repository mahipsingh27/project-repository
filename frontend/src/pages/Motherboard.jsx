import React ,{ useContext,useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Motherboard = () => {

    const {products ,search  } = useContext(ShopContext);
    const [showFilter,setShowFilter] = useState(false);
    const [filterProducts,setFilterProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState('relevant');

    useEffect(()=>{
      if (products && products.length > 0) {
        // First filter by Motherboard category - must be exact match
        let motherboardProducts = products.filter((item) => 
          item.category && item.category === "Motherboard"
        );
        
        // Apply category filter (Asus/Msi/Gigabyte)
        if (selectedCategories.length > 0) {
          motherboardProducts = motherboardProducts.filter((item) => 
            item.subCategory && selectedCategories.includes(item.subCategory)
          );
        }

         // Apply search filter
        if (search && search.trim() !== '') {
          const searchLower = search.toLowerCase().trim();
          motherboardProducts = motherboardProducts.filter((item) => 
            (item.name && item.name.toLowerCase().includes(searchLower)) ||
            (item.subCategory && item.subCategory.toLowerCase().includes(searchLower))
          );
        }

        // Apply sorting
        let sortedProducts = [...motherboardProducts];
        if (sortOption === 'low-high') {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'high-low') {
          sortedProducts.sort((a, b) => b.price - a.price);
        }
        
        setFilterProducts(sortedProducts);
      } else {
        setFilterProducts([]);
      }
    },[products, search, selectedCategories, sortOption])

    const handleCategoryChange = (category) => {
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }

    const handleSortChange = (e) => {
      setSortOption(e.target.value);
    }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${ showFilter ? '' : 'hidden' } sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <label className='flex gap-2 cursor-pointer'>
              <input 
                className='w-3' 
                type="checkbox" 
                value={'Asus'}
                checked={selectedCategories.includes('Asus')}
                onChange={() => handleCategoryChange('Asus')}
              />
              Asus
            </label>
            <label className='flex gap-2 cursor-pointer'>
              <input 
                className='w-3' 
                type="checkbox" 
                value={'Msi'}
                checked={selectedCategories.includes('Msi')}
                onChange={() => handleCategoryChange('Msi')}
              />
              Msi
            </label>
            <label className='flex gap-2 cursor-pointer'>
              <input 
                className='w-3' 
                type="checkbox" 
                value={'Gigabyte'}
                checked={selectedCategories.includes('Gigabyte')}
                onChange={() => handleCategoryChange('Gigabyte')}
              />
              Gigabyte
            </label>
          </div>
        </div>
      </div>
      {/* Right Side*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'MOTHERBOARDS'}/>
          {/* Product Sort */}
          <select 
            className='border-2 border-gray-300 text-sm px-2'
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low-High</option>
            <option value="high-low">Sort by : High-Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.length > 0 ? (
              filterProducts.map((item)=>(
                <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image}/>
              ))
            ) : (
              <div className='col-span-full text-center py-10 text-gray-500'>
                <p>No motherboards found. Try adjusting your filters.</p>
              </div>
            )
          }
        </div>

      </div>
    </div>
  )
}

export default Motherboard
