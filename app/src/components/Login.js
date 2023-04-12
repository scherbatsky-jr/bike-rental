import React, { useState, useLayoutEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'

import ValidatonError from './ValidationError';

import "../assets/css/components/login.scss"

function Login() {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  if (!!token) {
    navigate("/")
  }

  const [errorMessage, setErrorMessage] = useState("")
  
  // send login request to api
  async function handleLogin(e) {
    e.preventDefault()

    const form = e.target;
    const user = {
        email: form[0].value,
        password: form[1].value
    }

    try {
        const res = await fetch(process.env.REACT_APP_API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const data = await res.json()
        localStorage.setItem("token", data.token)
        setErrorMessage(data.message)
    } catch(err) {
        setErrorMessage(err)
    }
  }

  useLayoutEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? navigate.push("/bookings"): null)
    .catch(err => setErrorMessage(err)) 
  }, [navigate])

  return (
    <>
      <div className='login-page'>
        <form className='login-form' onSubmit={(e) => handleLogin(e)}>
          <h1>Login</h1>
          {
            errorMessage === "Success" ?
              <Navigate to="/"/> :
              <ValidatonError message={errorMessage} />
          }
          <div className='login-field'>
            <label>Email</label>
            <input type="text" name='email' id='email' />
          </div>
          <div className='login-field'>
            <label>Password</label>
            <input type="password" name='password' id="password"></input>
          </div>
          <button className='login-button' type='submit'>
            Log In
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
