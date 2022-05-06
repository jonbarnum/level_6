import React, { useState } from "react";

const initialInputs = {
    title: "",
    description: '',
    userThatVoted: [],
}

function IssueForm(props){
    const [inputs, setInputs] = useState(initialInputs)
    const {addIssue} = props

    function handleChange(event){
        const {name, value} = event.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    
    function handleSubmit(event){
        event.preventDefault()
        addIssue(inputs)
        setInputs(initialInputs)
    }

    const {title, description} = inputs

    return(
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
            />
            <input 
                type='text'
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
            />
            <button>Add Issue</button>
        </form>
    )
}

export default IssueForm