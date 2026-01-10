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
import Charts from './component/Charts';
const Homepage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (currentUser) {
      // Fetch user details if needed
      const fetchUserDetails = async () => {
        try {
          const { data } = await axios.get(`/api/users/${currentUser._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // hoặc tùy thuộc vào cách bạn lưu token
            },
          });
          if (!data.isValidated) {
            navigate('/verify-page');
          } else {
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
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
        <Charts />
        <Steps />
        <CTA />
        <Pricing />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default Homepage;
