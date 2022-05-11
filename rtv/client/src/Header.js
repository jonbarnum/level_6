import React, {useContext} from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "./context/UserContext";

function Header(){
    const {token, logout} = useContext(UserContext)

    return(
        <div>
            <Link to='/public'>
                <button>
                    Public
                </button>
            </Link>
            { token && <button onClick={logout}>Logout</button>}
        </div>
    )
}

export default Header