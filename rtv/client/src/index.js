import React from "react";
import {createRoot} from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import App from "./App";

const root = createRoot(document.getElementById('root'))

root.render(
    <Router>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </Router>
)

