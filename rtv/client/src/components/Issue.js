import React from "react";

function Issue(props){
    const {title, description, _id} = props
    return(
        <div>
            <h1>{title}</h1>
            <h3>{description}</h3>
        </div>
    )
}

export default Issue