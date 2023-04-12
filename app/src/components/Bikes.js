import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "../assets/css/components/bikes.scss"

function Bikes() {
  const navigate = useNavigate()

  const [bikes, setBikes] = useState([]);

  // fetch all the bikes from api
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/bikes", {
      method: "GET",
    })
    .then((res => res.json()))
    .then(data => {
      setBikes(data)
    })
  }, [])

  const getBikeImagePath = (bike) => {
    return "/images/bikes/" + bike.image;
  }

  const onBikeClick = (bike) => {
    navigate("/bike/" + bike._id)
  }

  return(
    <div className="bikes-page">
      <h4>We have following bikes available for you now...</h4>
      <div className='bike-list'>
      {
        bikes.map((bike, index) => {
          return <div className='bike' key={bike._id} onClick={() => onBikeClick(bike)}>
            <img src={getBikeImagePath(bike)} />
            <div className='bike__details'>
              <div className='bike__name'>{bike.name}</div>
              <div className='bike__type'>{bike.type}</div>
              <div className='bike__rate'>{`Rs ${bike.pricePerHour}/hour`}</div>
            </div>
          </div>
        })
      }
      </div>
    </div>
  )
}

export default Bikes;
