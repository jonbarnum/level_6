import React from "react";


function AuthForm(props){
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        inputs: {
            username,
            password
        },
    } = props

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    text='text'
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input 
                    text='password'
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder='Password'
                />
                <button>{btnText}</button>
                <p>{ errMsg }</p>
            </form>
        </div>
    )
}

export default AuthForm