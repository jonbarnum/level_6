// import React, { useEffect } from "react";
// import Issue from "./Issue";

// function HandleEditForm(issue){
//     const {initState} = useContext(UserContext)
//     const [previewActive, setPreviewActive] = useState(false)
//     const [editInputData, setEditInputData] = useState({
//         title: issue.title,
//         description: issue.description
//     })

//     function editHandleChange(event){
//         event.preventDefault()
//         const {name, value} = event.target
//         setEditInputData(prevData => ({...prevData, [name]: value}))
//     }

//     function handleEditIssue(event){
//         event.preventDefault()
        
//     }

//     return(
//         <div>

//         </div>
//     )
// }

import React, { useEffect, useContext } from "react";
import Issue from "./Issue";
import { UserContext } from "../context/UserContext";

function IssueList(props){
    const {issues} = props

    const {getUserIssues} = useContext(UserContext)


    useEffect(() => {
        getUserIssues()
    }, [])

    return(
        <div>
            {issues && issues.map(issue => {
                return (
                    <div>
                        <Issue {...issue} key={issue._id}/>
                    </div>
                )
            })}
        </div>
    )
}

export default IssueList

// import React, { useEffect, useState } from "react";
// import Issue from "./Issue";
// // import { UserContext } from "../context/UserContext";
// import axios from "axios";

// const userAxios = axios.create()

// function IssueList(props){
//     const {issues} = props
//     // const {getUserIssues} = useContext(UserContext)
//     const [allIssues, setAllIssues] = useState([])

//     useEffect(() => {
//         function getAllIssues(){
//             userAxios.get('/api/issues')
//                 .then(response => {
//                     setAllIssues(response.data)
//                 })
//                 .catch(error => console.log(error))
//             }
//             getAllIssues()
//     }, [])

//     return(
//         <div>
//             {issues.map(issue => {
//                 return (
//                     <div>
//                         <Issue {...issue} key={issue._id}/>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default IssueList