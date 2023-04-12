import { useLayoutEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import ValidatonError from './ValidationError';

import "../assets/css/components/signup.scss"

function Signup() {
  const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()

        const form = e.target
        const user = {
            full_name: form[0].value,
            email: form[1].value,
            password: form[2].value,
        }

        try {
            const res = await fetch(process.env.REACT_APP_API_URL + "/register", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await res.json()
            setErrorMessage(data.message)
        } catch (err) {
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
        .then(data => data.isLoggedIn ? navigate.push("/"): null)
        .catch(err => setErrorMessage(err)) 
    }, [navigate])

  return (
    <div className='signup-page'>
      <form className='signup-form' onSubmit={(e) => handleRegister(e)}>
        <h1>Signup</h1>
        {errorMessage === "Success" ? <Navigate to="/"/>: <ValidatonError message={errorMessage} />}
        <div className='signup-field'>
          <label>Full Name</label>
          <input type="text" />
        </div>
        <div className='signup-field'>
          <label>Email</label>
          <input type="text" />
        </div>
        <div className='signup-field'>
          <label>Password</label>
          <input type="password"></input>
        </div>
        <button className='signup-button' type="submit">
          Sign Up
        </button>
      </form>
    </div>
 );
}

export default Signup;
