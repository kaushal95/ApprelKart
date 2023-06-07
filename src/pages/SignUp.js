import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    return (
        <main className='login-container'>
            <form action="submit" className='form login-form'>
                <label htmlFor="email">Email Address
                </label>
                <input type="email" name='email' id='email' placeholder='name@gmail.com' />
                <label htmlFor="password">Password
                </label>
                <input type="password" name='password' id='password' placeholder='Enter password' />
                <label htmlFor="confirm-password">Confirm Password
                </label>
                <input type="password" name='confirm-password' id='confirm-password' placeholder='Confirm password' />
                <button>Signup</button>
                <Link to="/login">Already have an account? {" "}
                    <span>
                        Login
                    </span>
                </Link>
            </form>
        </main>
    )
}

export default Signup