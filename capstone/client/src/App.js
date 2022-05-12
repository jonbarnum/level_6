import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import Profile from "./components/Profile";
import Public from "./components/Public";
import Footer from "./Footer";
import { useContext } from "react";
import { AppContext } from "./appContext";
import Auth from "./components/Auth";
import BandSearch from './components/BandSearch';
import FavBands from "./components/FavBands";
import TopTracks from './components/TopTracks'

function App(){
    const {token, user} = useContext(AppContext)

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
            <Route path="/bandSearch" element={<BandSearch />} />
            <Route path="/favBands" element={<FavBands />} />
            <Route path="/topTracks" element={<TopTracks />} />
        </Routes>
        <Footer />
    </div>
    )
}

export default App