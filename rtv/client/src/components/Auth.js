import React, {useState, useContext} from "react";
import AuthForm from "./AuthForm";
import { UserContext } from "../context/UserContext";

const initialInputs = {username: '', password: ''}

function Auth(){
    const [inputs, setInputs] = useState(initialInputs)
    const {signup, login} = useContext(UserContext)
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

    return(
        <div>
            <h1>RTV</h1>
            {! toggle ?
                <>
                    <AuthForm 
                        handleChange={handleChange}
                        handleSubmit={handleSignups}
                        inputs={inputs}
                        btnText='Sign up'
                    />
                    <p onClick={() => setToggle(prev => !prev)}>Already a member?</p>
                </>
            :
                <>
                    <AuthForm 
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText='Login'
                    />
                    <p onClick={() => setToggle(prev => !prev)}>Not a Member</p>
                </>
            }
        </div>
    )
}

export default Auth