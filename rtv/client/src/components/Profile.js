import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import IssueForm from "./IssueForm";
import IssueList from "./IssueList";
import Header from "../Header";

function Profile(){
    const {
        user: {
            username
        },
        addIssue,
        issues,
        logout
    } = useContext(UserContext)

    return(
        <div>
            <h1>Welcome {username}</h1>
            <Header logout={logout} />
            <h3>Add an Issue</h3>
            <IssueForm addIssue={addIssue} />
            <h3>Your Issues</h3>
            <IssueList issues={issues} />
        </div>
    )
}

export default Profile