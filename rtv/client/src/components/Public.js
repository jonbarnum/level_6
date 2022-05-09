import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom"
import { UserContext } from "../context/UserContext";
import axios from "axios";

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


function Public(){
    const { token, user } = useContext(UserContext)
    const [allIssues, setAllIssues] = useState([])
    const [editText, setEditText] = useState({
        comment: '',
    })
    const [comments, setComments] = useState([])

    function getAllIssues(){
        userAxios.get('api/issues')
            .then(response => {
                response.data.sort((a, b) => b.upvote - a.upvote)
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

    function getIssueComments(){
        userAxios.get(`/api/comments/`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    }

    function handleEditSubmit(event, issue){
        event.preventDefault()
        const issueId = event.currentTarget.parentElement.id;
        const comment = editText.comment ? editText.comment : issue.comment;
        userAxios.post(`/api/comments`,
            {
                comment,
                issueId,
            }
        )
        .then(res => setComments(prevComments => [...prevComments, res.data]))
        .then(getIssueComments())
        .catch(error => {
            console.log(error.message)
        })
        setEditText({
            comment: '',
        })
    }

    async function updateIssue(issueId, issue){
        try {
            await userAxios.put(`api/issues/${issueId}`, issue);
            getAllIssues();
        } catch(err) {
            console.log(err);
        }
        // userAxios.put(`api/issues/${issueId}`, issue)
        //     .then(
        //         getAllIssues()
        //     )
        //     .catch(err => {
        //         console.log(err)
        //     })
    }

    function handleUpvote(event){
        event.preventDefault()
        const issueId = event.currentTarget.parentElement.parentElement.id;
        const issue = allIssues.find((issue) => issue._id === issueId)
        issue.usersThatVoted.push(user._id)
        issue.upvote = issue.upvote + 1
        updateIssue(issueId, issue)
    }

    function handleDownvote(event){
        event.preventDefault()
        const issueId = event.currentTarget.parentElement.parentElement.id;
        const issue = allIssues.find((issue) => issue._id === issueId)
        issue.usersThatVoted.push(user._id)
        issue.downvote = issue.downvote + 1
        updateIssue(issueId, issue)
    }

    useEffect(() => {
        getAllIssues()
        getIssueComments()
    }, [])

    return(
        <div>
            <h1>Public Issues</h1>
            {token &&
                <Link to='/profile'>
                    <button>Profile</button>
                </Link>
            }
            {allIssues.map((issue, index) => {
                return(
                    <div key={issue._id} id={issue._id}>
                        <h1>{issue.title}</h1>
                        <h2>{issue.description}</h2>
                        <ul>
                            {
                                comments ?
                                    comments.map(comment => {
                                        if(comment.issueId === issue._id) {
                                            return(
                                                <div key={comment._id} id={comment._id}>
                                                    <h4>{comment.comment}</h4>
                                                </div>
                                            )
                                        } 
                                        return '';
                                    })
                                : null
                            }
                        </ul>
                        <button onClick={() => handleEdit(index, issue._id)}>Add Comment</button>
                        {issue.editActive ? (
                            <form onSubmit={(event) => handleEditSubmit(event, issue)}>
                                <input 
                                    type='text'
                                    value={editText.comment}
                                    name='comment'
                                    onChange={handleTextEdit}
                                    placeholder="Comment"
                                />
                                <button>Submit</button>
                            </form>
                        ): null}
                        <h6>Up Vote: {issue.upvote} Down Vote: {issue.downvote}</h6>
                        {!issue.usersThatVoted?.find(userId => userId === user._id) &&
                            <div>
                                <button onClick={handleUpvote}>Up Vote</button>
                                <button onClick={handleDownvote}>Down Vote</button>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Public