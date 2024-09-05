import React, { useContext } from 'react'
import Layout from '../components/Layout'
// import MyContext from '../context/data/MyContext'
import Hero from '../components/Hero'
import Filter from '../components/Filter'
import ProductCard from '../components/ProductCard'
import Testimonial from '../components/Testimonial'
import { Link } from 'react-router-dom'
import Track from '../components/Track'
// import { useDispatch, useSelector } from 'react-redux'
// import { addToCart, deleteFromCart } from '../redux/CartSlice'

function Home() {
  return (
    <Layout>
      <Hero />
      <Filter />
      <ProductCard />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  )
}

export default Home
