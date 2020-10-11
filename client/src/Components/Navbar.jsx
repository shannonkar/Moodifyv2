import React from 'react'

function Navbar(props) {
    return (
        <nav className='nav'>
            <button onClick={props.handleLogin}>Login</button>
            <button onClick={props.handleLogout}>Logout</button>
        </nav>

    )
}

export default Navbar
