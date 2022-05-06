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
    const [editText, setEditText] = useState({
        title: '',
        description: ''
    })
    

    function getAllIssues(){
        userAxios.get('api/issues/user')
            .then(response => {
                response.data.sort((a, b) => a - b)
                setAllIssues(response.data)
            })
            .catch(error => console.log(error))
    }

    function handleEdit(index, id){
        let savedIssue = allIssues.find((issue) => issue._id === id)
        savedIssue.editActive = !savedIssue.editActive
        
        setAllIssues(prevState => ([
            ...prevState.slice(0, index),
            savedIssue,
            ...prevState.slice(index + 1),
        ]))
    }

    function handleTextEdit(event){
        event.preventDefault()
        const {name, value} = event.target
        setEditText(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    
    function handleEditSubmit(event, issue){
        event.preventDefault()
        userAxios.put(`/api/issues/${issue._id}`,
            {
                title: editText.title ? editText.title : issue.title,
                description: editText.description ? editText.description : issue.description
            }
        )
        .then(response => {
            getAllIssues()
        })
        .catch(error => console.log(error))
        setEditText({
            title: '',
            description: ''
        })
    }


    function handleDeleteIssue(event, issue){
        event.preventDefault()
        userAxios.delete(`/api/issues/${issue._id}`)
        .then(() => {
            getAllIssues()
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getAllIssues()
    }, [])

    return(
        <div>
            {allIssues.map((issue, index) => {
                return (
                    <div key={issue._id} id={issue._id}>
                        <h1>{issue.title}</h1>
                        <h3>{issue.description}</h3>
                        <button onClick={() => handleEdit(index, issue._id)}>Edit</button>
                        {issue.editActive ? (
                            <form onSubmit={(event) => handleEditSubmit(event, issue)}>
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