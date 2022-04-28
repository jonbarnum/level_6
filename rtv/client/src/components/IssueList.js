// import React, { useEffect, useContext, useState } from "react";
// import Issue from "./Issue";
// import { UserContext } from "../context/UserContext";
// import axios from "axios";
// const userAxios = axios.create()

// function IssueList(props){
//     const {issues} = props

//     const {getUserIssues } = useContext(UserContext)


//     useEffect(() => {
//         getUserIssues()
//     }, [])

//     // function editHandleChange(event){
//     //     event.preventDefault()
//     //     const {name, value} = event.target
//     //     setEditInputData(prevData => ({
//     //         ...prevData,
//     //         [name]: value
//     //     }))
//     // }

//     function handleEdit(event){
//         event.preventDefault()
//         console.log('this is an edit button')
//     }

//     function handleDelete(event){
//         event.preventDefault()
//         console.log('this is a delete button')
//     }

//     return(
//         <div>
//             {issues && issues.map(issue => {
//                 return (
//                     <div key={issue._id} id={issue._id}>
//                         <Issue {...issue} />
//                         {/* <button onClick={() => setEditActive(!editActive)}>Edit</button>
//                         {editActive ? (
//                             <form>
//                                 <input 
//                                     type='text'
//                                     value={editInputData.title}
//                                     name='title'
//                                     onChange={editHandleChange}
//                                     placeholder='Title'
//                                 />
//                                 <input 
//                                     type='text'
//                                     value={editInputData.description}
//                                     name='description'
//                                     onChange={editHandleChange}
//                                     placeholder='Description'
//                                 />
//                                 <button>Save</button>
//                                 <button onClick={handleDelete}>Delete</button>
//                             </form>
//                         ): null} */}
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }

// export default IssueList




import React, { useEffect, useState } from "react";
import axios from "axios";

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


function IssueList(){
    const [allIssues, setAllIssues] = useState([])
    // const [editActive, setEditActive] = useState(false)
    const [editText, setEditText] = useState({
        title: '',
        description: ''
    })
    

    function getAllIssues(){
        userAxios.get('api/issues/user')
            .then(response => {
                setAllIssues(response.data)
            })
            .catch(error => console.log(error))
    }

    function handleEdit(index, id){
        // issues dont have a editActive variable on them. consider adding one.
        let savedIssue = allIssues.find((issue) => issue._id === id)
        savedIssue.editActive = !savedIssue.editActive
        // !undefined === true
        // !true === false
        // undefined == false
        // savedIssue.poop = true
        // savedIssue.noob = {
        //     cruple: 'loop'
        // }
        // {
        //     _id
        //     title
        //     description
        //     editActive
        // }
        // savedIssue.editActive === undefined
        // you dont need to send editActive to the api
        
        setAllIssues(prevState => ([
            ...prevState.slice(0, index),
            savedIssue,
            ...prevState.slice(index + 1),
        ]))
        // [
        //     {},
        //     {},
        //     {}, //savedIssue
        //     {},
        //     {},
        // ]
    }

    function handleTextEdit(event){
        event.preventDefault()
        const {name, value} = event.target
        setEditText(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleDeleteIssue(event, issue){
        event.preventDefault()
        // let issueId = allIssues[event.target.parentElement.parentElement.id]
        userAxios.delete(`/api/issues/${issue._id}`)
        .then(() => {
            getAllIssues()
        })
        .catch(error => console.log(error))
    }
    console.log(editText.title)
    console.log(editText.description)

    useEffect(() => {
        getAllIssues()
    }, [])

    // useEffect(() => {
    //     function getAllIssues(){
    //         userAxios.get('/api/issues/user')
    //             .then(response => {
    //                 setAllIssues(response.data)
    //                 console.log(response.data)
    //                 console.log(allIssues)
    //             })
    //             .catch(error => console.log(error))
    //         }
    //         getAllIssues()
    // }, [])

    return(
        <div>
            {allIssues.map((issue, index) => {
                return (
                    <div key={issue._id} id={issue._id}>
                        <h1>{issue.title}</h1>
                        <h3>{issue.description}</h3>
                        <button onClick={() => handleEdit(index, issue._id)}>Edit</button>
                        {issue.editActive ? (
                            <form>
                                <input 
                                    type='text'
                                    value={editText.title}
                                    name='title'
                                    onChange={handleTextEdit}
                                    placeholder="Title"
                                />
                                <input 
                                    type='text'
                                    value={editText.description}
                                    name='description'
                                    onChange={handleTextEdit}
                                    placeholder="Description"
                                />
                                <button>Save</button>
                                <button onClick={(event)=> handleDeleteIssue(event, issue) }>Delete</button>
                            </form>
                        ): null}
                    </div>
                )
            })}
        </div>
    )
}

export default IssueList