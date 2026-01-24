import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../Components/Title'
import Productitem from '../Components/Productitem'



const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  /* ---------------- FILTER HANDLERS ---------------- */

  const toggleCategory = (e) => {
    const value = e.target.value
    setCategory(prev =>
      prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
    )
  }

  const toggleSubCategory = (e) => {
    const value = e.target.value
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
    )
  }

  /* ---------------- APPLY FILTER ---------------- */

  const applyFilter = () => {
    let data = [...products]

    if (showSearch && search) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length > 0) {
      data = data.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      data = data.filter(item => subCategory.includes(item.subCategory))
    }

    setFilteredProducts(data)
  }

  /* ---------------- SORT ---------------- */

  const sortProducts = (data) => {
    let sorted = [...data]

    if (sortType === 'low-high') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (sortType === 'high-low') {
      sorted.sort((a, b) => b.price - a.price)
    }

    return sorted
  }

  /* ---------------- EFFECTS ---------------- */

  // Apply filters when products or filters change
  useEffect(() => {
    if (!products.length) return
    const filtered = applyFilter()
  }, [products, category, subCategory, search, showSearch])

  // Apply sort when sort type changes
  useEffect(() => {
    if (!filteredProducts.length) return
    setFilteredProducts(prev => sortProducts(prev))
  }, [sortType])

  // Initial load (important for reload bug)
  useEffect(() => {
    if (products.length) {
      setFilteredProducts(products)
    }
  }, [products])

  return (
    <section className="pt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8">

      
        <aside className="w-full lg:w-64">

          
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-between lg:hidden border px-4 py-3 cursor-pointer"
          >
            <span className="font-medium">Filters</span>
            <img
              src={assets.dropdown_icon}
              alt="toggle"
              className={`h-3 transition ${showFilter ? 'rotate-90' : ''}`}
            />
          </div>

        
          <div className={`mt-4 space-y-6 ${showFilter ? 'block' : 'hidden'} lg:block`}>

           
            <div className="border p-4">
              <p className="mb-3 text-sm font-semibold">Category</p>
              <div className="space-y-2 text-sm text-gray-700">
                {['Men', 'Women', 'Kids'].map(item => (
                  <label key={item} className="flex items-center gap-2">
                    <input type="checkbox" value={item} onChange={toggleCategory} />
                    {item}
                  </label>
                ))}
              </div>
            </div>

          
            <div className="border p-4">
              <p className="mb-3 text-sm font-semibold">Type</p>
              <div className="space-y-2 text-sm text-gray-700">
                {['Topwear', 'Bottomwear', 'Winterwear'].map(item => (
                  <label key={item} className="flex items-center gap-2">
                    <input type="checkbox" value={item} onChange={toggleSubCategory} />
                    {item}
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

       
        <main className="flex-1">

       
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <Title text1="ALL" text2="COLLECTIONS" />

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border px-3 py-2 text-sm w-full sm:w-auto"
            >
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

        
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
            {filteredProducts.map(item => (
              <Productitem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.basePrice}
                image={item.image}
              />
            ))}
          </div>

        </main>
      </div>
    </section>
  )
}

export default Collection
