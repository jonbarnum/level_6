import React, {useContext, useEffect} from "react";
import {Link} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import Issue from "./Issue";


function Public(){
    const { token, getAllIssues, allIssues } = useContext(UserContext)
    
    useEffect(() => {
        getAllIssues()
    }, [])

    return(
        <div>
            <h1>Public Issues</h1>
            {token &&
                <Link to='/profile'>
                    <button>Profile</button>
                </Link>
            }
            {allIssues && allIssues.map(issues => {
                return(
                    <div key={issues._id} id={issues._id}>
                        <Issue {...issues} />
                    </div>
                )
            })}
        </div>
    )
}

export default Public