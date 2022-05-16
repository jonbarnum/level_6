import React, {useContext} from "react";
import {Link} from 'react-router-dom'
import {AppContext} from './appContext'

function Header(){
    const {token, logout} = useContext(AppContext)

    return(
        <div>
            <Link to='/profile'>
                <button>
                    Profile
                </button>
            </Link>
            <Link to='/public'>
                <button>
                    Public
                </button>
            </Link>
            { token && <button onClick={logout}>Logout</button>}
            <div className="headerDiv">
                <h1 className="headerTitle">
                    <Link to='/BandSearch' className='headerLink'>
                        Search for your favorite band
                    </Link> 
                </h1>
                <h1 className="headerTitle">
                    <Link to='/FavBands' className="headerLink">
                        Your favorite bands
                    </Link>
                </h1>
                <h1 className="headerTitle">
                    <Link to='/TopTracks' className="headerLink">
                        Top Tracks
                    </Link>
                </h1>
            </div>
    </div>
    )
}

export default Header 