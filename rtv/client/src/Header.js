import React from "react";
import {Link} from 'react-router-dom'

function Header(){
    return(
        <div>
            <h1>
                Hello and Welcome to Rock the Vote
            </h1>
            <Link to='/profile'>
                Profile
            </Link>
            <Link to='/public'>
                Public
            </Link>
        </div>
    )
}

export default Header