import React from "react";


function AuthForm(){
    return(
        <div>
            <h2>Signup or Login RTV</h2>
            <form>
                <div>
                    <div>
                        <input 
                            text='text'
                            name="username"
                            // value={}
                            // onChange={}
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <input 
                            text='password'
                            name="password"
                            // value={}
                            // onChange={}
                            placeholder='Password'
                        />
                    </div>
                    <button>Signup</button>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
}

export default AuthForm