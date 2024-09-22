import React from 'react'
import Header from './component/Header'
import Carousel from './component/Carousel'
import { Branding } from './component/Branding'
import Feature from './component/Feature'
import { useAuth } from './contexts/AuthContext'
import Footer from './component/Footer'
import MainProduct from './MainProduct'
import Hero from './component/Hero'
import Steps from './component/Steps'
import CTA from './component/CTA'
import Testimonial from './component/Testimonial'
import Contact from './component/Contact'
import Pricing from './component/Pricing'

const Homepage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Header />
      <div className='content'>
          <MainProduct />
          <Carousel/>
          <Feature />
          <Hero/>
          <Steps/>
          <CTA/>
          <Branding />
          <Pricing/>
          <Testimonial/>
          <Contact/>
          <Footer />
        </div>
    </>
  )
}

export default Homepage