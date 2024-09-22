import React from 'react'
import ad1 from '../assets/ad1.png'
import ad2 from '../assets/ad2.png'
import ad3 from '../assets/ad3.png'
import { Carousel, Image } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'


const Carousell = () => {
  const [index, setIndex] = useState(0)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }
  return (
    <div id="carouselExampleAutoplaying" className="carousel slide"  data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={ad1} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={ad2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={ad3} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}

export default Carousell