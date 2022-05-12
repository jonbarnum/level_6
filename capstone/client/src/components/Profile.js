import React, { useContext } from "react";
import { AppContext } from "../appContext";
import Header from "../Header";


function Profile(){
    const {
        user: {
            username
        },
        logout
    } = useContext(AppContext)

    return(
        <div className="profileFormDiv">
            <h1>Welcome {username}</h1>
            <Header logout={logout} />
        </div>
    )
}

export default Profile