import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom"
import { AppContext } from "../appContext";
import axios from "axios";

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})


function Public(){
    const { token, user } = useContext(AppContext)
    const [bands, setBands] = useState([])
    const [editText, setEditText] = useState({
        comment: '',
    })
    const [comments, setComments] = useState([])

    function getAllBands(){
        userAxios.get('api/bands')
            .then(response => {
                response.data.sort((a, b) => b.upvote - a.upvote)
                setBands(response.data)
            })
            .catch(error => console.log(error))
    }
    
    function handleEdit(index, id){
        let savedBand = bands.find((band) => band._id === id)
        savedBand.editActive = !savedBand.editActive
        
        setBands(prevState => ([
            ...prevState.slice(0, index),
            savedBand,
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

    function getBandComments(){
        userAxios.get(`/api/comments/`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err))
    }

    function handleEditSubmit(event, band){
        event.preventDefault()
        const bandId = event.currentTarget.parentElement.id;
        const comment = editText.comment ? editText.comment : band.comment;
        userAxios.post(`/api/comments`,
            {
                comment,
                bandId,
            }
        )
        .then(res => setComments(prevComments => [...prevComments, res.data]))
        .then(getBandComments())
        .catch(error => {
            console.log(error.message)
        })
        setEditText({
            comment: '',
        })
    }

    async function updateIssue(bandId, band){
        try {
            await userAxios.put(`api/issues/${bandId}`, band);
            getAllBands();
        } catch(err) {
            console.log(err);
        }
    }

    function handleUpvote(event){
        event.preventDefault()
        const bandId = event.currentTarget.parentElement.parentElement.id;
        const band = bands.find((band) => band._id === bandId)
        band.usersThatVoted.push(user._id)
        band.upvote = band.upvote + 1
        updateIssue(bandId, band)
    }

    function handleDownvote(event){
        event.preventDefault()
        const bandId = event.currentTarget.parentElement.parentElement.id;
        const band = bands.find((band) => band._id === bandId)
        band.usersThatVoted.push(user._id)
        band.downvote = band.downvote + 1
        updateIssue(bandId, band)
    }

    useEffect(() => {
        getAllBands()
        getBandComments()
    }, [])

    return(
        <div className="publicDiv">
            <h1>Public Issues</h1>
            {token &&
                <Link to='/profile'>
                    <button>Profile</button>
                </Link>
            }
            {bands.map((band, index) => {
                return(
                    <div key={band._id} id={band._id} className='publicIssue'>
                        <h1>{band.name}</h1>
                        <h2>{band.genre}</h2>
                        <ul>
                            {
                                comments ?
                                    comments.map(comment => {
                                        if(comment.bandId === band._id) {
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
                        <button onClick={() => handleEdit(index, band._id)}>Add Comment</button>
                        {band.editActive ? (
                            <form onSubmit={(event) => handleEditSubmit(event, band)}>
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
                        <h6>Up Vote: {band.upvote} Down Vote: {band.downvote}</h6>
                        {!band.usersThatVoted?.find(userId => userId === user._id) &&
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