import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
function Login() {
    const { token, user, loginHandler, signupHandler, logoutHandler } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        loginHandler({email, password})
    }
    return (
        <main className='login-container'>
            <form className='form login-form'>
                <label htmlFor="email">Email Address
                </label>
                    <input type="email" name='email' id='email' placeholder='name@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password
                </label>
                    <input type="password" name='password' id='password' placeholder='Enter password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit' onClick={handleLogin}>Login</button>
                <button>Login as guest</button>
                <Link to="/signup">Don't have an account? {" "}
                    <span>
                        SignUp
                    </span>
                </Link>
            </form>
        </main>
    )
}

export default Login