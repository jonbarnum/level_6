import React from "react";
import Header from "./Header";
import {Routes, Route, Navigate} from 'react-router-dom'
import Profile from "./components/Profile";
import Public from "./components/Public";
import Footer from "./Footer";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Auth from "./components/Auth";

function App(){
    const {token, logout} = useContext(UserContext)
    return(
        <div>
            <Header logout={logout}/>
            <Routes>
                {/* <Route path='/' render={() => token ? <Navigate to='/profile' /> : <Auth />} /> */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/public" element={<Public />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App