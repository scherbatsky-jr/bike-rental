import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import DatePicker from "react-datepicker";

import "../assets/css/components/bike.scss"
import "react-datepicker/dist/react-datepicker.css";

function Bike() {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  if (!token) {
    navigate("/login")
  }

  const [bike, setBike] = useState({})
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState(1)
  const [errorMessage, setErrorMessage] = useState("")

  const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const { bikeId } = useParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/bike/" + bikeId, {
      method: "GET",
    })
    .then((res => res.json()))
    .then(data => {
      setBike(data)
    })
  }, [])

  const getBikeImagePath = (bike) => {
    return "/images/bikes/" + bike.image;
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = fetch(process.env.REACT_APP_API_URL + "/booking/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify({
          bike: bike._id,
          date: date,
          hours: hours
        })
      })

      const data = await res

      data.status === 200 ? navigate("/bookings") : setErrorMessage("Please try again")
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="bike-page">
      <img src={getBikeImagePath(bike)} />
      <div className='details'>
        <h1>{bike.name}</h1>
        <div>{bike.type}</div>
        <div>Location: Kathmandu, Nepal</div>
        <div>{`Rs ${bike.pricePerHour}/hour`}</div>
        <form onSubmit={(e) => handleLogin(e)}>
          <div className='bike-field'>
            <label>Choose a date:</label>
            <DatePicker className='date-picker' selected={date} onChange={(date) => setDate(date)} />
          </div>
          <div className='bike-field'>
            <label>Number of hours:</label>
            <select className='hour-picker' onChange={e => setHours(e.target.value)}>
              {
                hourOptions.map((hour) => {
                  return <option value={hour}>{hour}</option>
                })
              }
            </select>
          </div>
          <button className='book-button' type='submit'>
            Book Now
          </button>
          <span>{errorMessage}</span>
        </form>
      </div>
    </div>
  )
}

export default Bike;