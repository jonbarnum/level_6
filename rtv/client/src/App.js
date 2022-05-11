import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import Profile from "./components/Profile";
import Public from "./components/Public";
import Footer from "./Footer";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Auth from "./components/Auth";
import './stylesheet.css'

function App(){
    const {token, user} = useContext(UserContext)
    return(
        <div>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <React.Fragment>
                            {token && user ? <Navigate to="/profile"/> : <Auth />}
                        </React.Fragment>
                    }
                />
                <Route 
                    path="/profile"
                    element={<Profile/>}
                />
                <Route 
                    path="/public"
                    element={<Public/>}
                />
            </Routes>
            <Footer />
        </div>
    )
}

export default App