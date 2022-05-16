import React, {useState, useContext} from "react";
import AuthForm from "./AuthForm";
import { AppContext } from "../appContext";

const initialInputs = {username: '', password: ''}

function Auth(){
    const [inputs, setInputs] = useState(initialInputs)
    const {signup, login, errMsg, resetAuthErr} = useContext(AppContext)
    const [toggle, setToggle] = useState(false)

    function handleChange(event){
        const {name, value} = event.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
        }

        function handleSignups(event){
            event.preventDefault()
            signup(inputs)
        }

        function handleLogin(event){
            event.preventDefault()
            login(inputs)
        }

        function toggleForm(){
            setToggle(prev => !prev)
            resetAuthErr()
        }

    return(
        <div className="mainPageLogIn">
            <h1 className="loginHeaderTitle">For Music Lovers</h1>
            { !toggle ?
                <React.Fragment>
                    <AuthForm 
                        handleChange={handleChange}
                        handleSubmit={handleSignups}
                        inputs={inputs}
                        btnText='Sign up'
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Already a member?</p>
                </React.Fragment>
            :
                <React.Fragment>
                    <AuthForm 
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText='Login'
                        errMsg={errMsg}
                    />
                    <p onClick={toggleForm}>Not a Member</p>
                </React.Fragment>
            }
        </div>
    )
}

export default Auth