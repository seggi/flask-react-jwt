import React , {useState} from 'react'
import { login } from '../auth'

function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = (e) => {
        e.preventDefault();

        let opts = {
            'username': username,
            'password': password
        }

        fetch("http://localhost:5000/login", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts)
        }).then(r => r.json())
        .then(token => {
            if(token.accessToken) {
                login(token)
                console.log(token)
                props.history.push("/main-page")
            }
            else {
                console.log("Username or Password incorect!")
            }
        })
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <h2>Login</h2>
                <form action="#">
                    <div>
                        <input type="text"
                            placeholder="Username"
                            onChange={handleUsernameChange}
                            value={username}
                        />
                        </div>
                        <div>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        </div>
                        <button onClick={ onSubmit } type="submit">
                            Login
                        </button>
                </form>
                
        </div>
    )
}

export default Login
