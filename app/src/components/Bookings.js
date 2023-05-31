import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "../assets/css/components/bookings.scss";

function Bookings() {
  const navigate = useNavigate();

  const [bikes, setBikes] = useState([]);
  const [bookings, setBookings] = useState([]);

  // fetch bikes and bookings from api for user
  useLayoutEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/bikes", {
      method: "GET",
    })
    .then((res => res.json()))
    .then(data => {
      setBikes(data)
    })
    
    fetch(process.env.REACT_APP_API_URL + "/bookings", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then((res => res.json()))
    .then(data => {
      data.isAuth === false ? setBookings([]) : setBookings(data)
    })
  }, [])

  // methods to get booking and bike info from fetched data
  const getBikeName = (booking) => {
    const bike = bikes.find(bike => bike._id === booking.bike)

    return bike ? bike?.name : '--'
  }

  const getBikeType = (booking) => {
    const bike = bikes.find(bike => bike._id === booking.bike)

    return bike ? bike?.type : '--'
  }

  const getBikeRate = (booking) => {
    const bike = bikes.find(bike => bike._id === booking.bike)

    return bike ? bike?.pricePerHour : '--'
  }

  const getBikeImagePath = (booking) => {
    const bike = bikes.find(bike => bike._id === booking.bike)

    return "/images/bikes/" + bike?.image;
  }

  const getTotalCost = (booking) => {
    const bike = bikes.find(bike => bike._id === booking.bike)

    return bike?.pricePerHour * booking.hours
  }

  const getBookingDate = (booking) => {
    const date = new Date(booking.date);

    return date.toLocaleDateString()
  }

  const cancelBooking = async (booking) => {
    try {
      const res = fetch(process.env.REACT_APP_API_URL + "/booking/cancel", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify({
          id: booking._id
        })
      })

      const data = await res

      if (data.status === 200) {
        navigate(0)
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className='bookings-page'>
      <h1>My Bookings</h1>
      <div className='bookings-list'>
      {
        bookings.length ?
          bookings.map((booking, index) => {
            return <div className='booking' key={'booking-' + index}>
              <img src={getBikeImagePath(booking)} />
              <div>
                <h3>{getBikeName(booking)}</h3>
                <h4>{getBikeType(booking)}</h4>
                <div>{`Rs ${getBikeRate(booking)}/hour`}</div>
                <button className="cancel-button" onClick={cancelBooking}>
                  Cancel Your Booking
                </button>
              </div>
              <div>
                <h3>{`Date of booking: ${getBookingDate(booking)}`}</h3>
                <h3>{`Number of hours: ${booking.hours}`}</h3>
                <h3>{`Total Cost: Rs ${getTotalCost(booking)}`}</h3>
              </div>
            </div>
          }) :
          <p>No bookings found</p>
      }
      </div>
    </div>
  );
}

export default Bookings;
