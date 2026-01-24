import React from 'react'
import Hero from '../Components/Hero'
import Latestcollection from '../Components/Latestcollection'
import Bestseller from '../Components/Bestseller'
import Newsletterbox from '../Components/Newsletterbox'
import OurPolicy from '../Components/OurPolicy'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Latestcollection/>
      <Bestseller/>
      <Newsletterbox/>
      <OurPolicy/>
    </div>
  )
}

export default Home