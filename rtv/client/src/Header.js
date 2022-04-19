import React from "react";
import {Link} from 'react-router-dom'

function Header(props){
    const { logout } = props
    return(
        <div>
            <Link to='/profile'>
                Profile
            </Link>
            <Link to='/public'>
                Public
            </Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Header