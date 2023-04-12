import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import "../assets/css/components/home.scss";

function Bikes() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/bikes')
      .then((response) => {
        setBikes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="home-page">
      <div className='home-section-1'>
        <div className='home-section-1__header'>
          <h1>Life is a</h1>
          <h1>shared</h1>
          <h1>Ride.</h1>

          <p>We are a cycling community. Rent from locally, from private owners and shops. Book your perfect bike now!</p>
        </div>
        <div>
          <img src="/images/bike-3.jpg" />
        </div>
      </div>
      <div className='home-section-2'>
        <div className='home-section-2__item'>
          <img src='/images/section1/first.webp' />
          <h2>Bike rental, made easy</h2>
          <p>search and find from 80.000+ bikes in more than 1,000 locations from both local shops & local bike owners, exactly the bike you want.</p>
        </div>
        <div className='home-section-2__item'>
          <img src='/images/section1/second.webp' />
          <h2>Any time, any place</h2>
          <p>search and find from 80.000+ bikes in more than 1,000 locations from both local shops & local bike owners, exactly the bike you want.</p>
        </div>
        <div className='home-section-2__item'>
          <img src='/images/section1/third.webp' />
          <h2>Any time, any place</h2>
          <p>search and find from 80.000+ bikes in more than 1,000 locations from both local shops & local bike owners, exactly the bike you want.</p>
        </div>
      </div>
    </div>
  );
}

export default Bikes;
