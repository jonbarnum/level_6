import React, {useContext} from "react";
import {Link} from 'react-router-dom'
import { UserContext } from "./context/UserContext";

function Header(){
    const {logout} = useContext(UserContext)
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
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Header