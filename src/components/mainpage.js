import React, { useEffect, useState } from 'react'
import { authFetch, logout } from '../auth'

function Mainpage() {
    const [message, setMessage] = useState('')

    useEffect(() => {
        authFetch("http://localhost:5000/protected").then(response => {
            if (response.status === 401) {
                setMessage("Sorry you aren't authorized!")
                return null
            }
            return response.json()
        })
        .then(response => {
            if (response && response.logged_in_as){
                setMessage(response.logged_in_as)
                console.log(response.logged_in_as)
            }
        })
    }, [])
    return (
        <div>
            <h2>Logged in as: {message}</h2>
            <button onClick={() => logout() }>Logout</button>
        </div>
    )
}

export default Mainpage
