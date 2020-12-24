import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

function Home() {
    const [message, setMessage] = useState('');

    useEffect (() => {
        fetch("http://localhost:5000/", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(rsp => {
            setMessage(rsp.message);
        })
    });

    return (
        <div>
            <h1>{ message }</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home
