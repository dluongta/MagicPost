import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from './component/Header';
import Carousel from './component/Carousel';
import { Branding } from './component/Branding';
import Feature from './component/Feature';
import { useAuth } from './contexts/AuthContext';
import Footer from './component/Footer';
import MainProduct from './MainProduct';
import Hero from './component/Hero';
import Steps from './component/Steps';
import CTA from './component/CTA';
import Testimonial from './component/Testimonial';
import Contact from './component/Contact';
import Pricing from './component/Pricing';
import axios from 'axios';

const Homepage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (currentUser) {
      // Fetch user details if needed
      const fetchUserDetails = async () => {
        const { data } = await axios.get(`/api/users/${currentUser._id}`);
        if (!data.isValidated) {
          navigate('/verify-page');
        } else {
          navigate('/');
        }
      };
      
      fetchUserDetails();
    }
  }, [navigate]);
  

  return (
    <>
      <Header />
      <div className='content'>
        <MainProduct />
        <Carousel />
        <Feature />
        <Hero />
        <Steps />
        <CTA />
        <Branding />
        <Pricing />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
