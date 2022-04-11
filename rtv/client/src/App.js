import React from "react";
import Header from "./Header";
import {Routes, Route} from 'react-router-dom'
import Profile from "./components/Profile";
import Public from "./components/Public";

import Footer from "./Footer";

function App(){
    return(
        <div>
            <Header />
            <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/public" element={<Public />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App