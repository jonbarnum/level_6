// import React, {useContext} from "react";
// import {Link} from 'react-router-dom'
// import { UserContext } from "./context/UserContext";

// function Header(props){
//     const { logout } = props
//     const {token} = useContext(UserContext)

//     return(
//         <div>
//             { token && <Link to='/profile'>
//                 Profile
//             </Link>}
//             <Link to='/public'>
//                 Public
//             </Link>
//             { token && <button onClick={logout}>Logout</button>}
//         </div>
//     )
// }

// export default Header


import React, {useContext} from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "./context/UserContext";

function Header(){
    const {token, logout} = useContext(UserContext)

    return(
        <div>
            {/* { token && 
                <Link to='/profile'>
                    Profile
                </Link>
            } */}
            {/* <Link to='/public'>
                Public
            </Link> */}
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