import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/LoginSignup/SignUp";
import Login from "./components/LoginSignup/Login";
import Header from "./components/Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // Update isLoggedIn based on user authentication status
        });

        // Cleanup function
        return () => {
            unsubscribe(); // Unsubscribe from auth state changes when component unmounts
        };
    }, []);

    return (
        <div className="App">
            {/* Render the header if the user is logged in */}
            {isLoggedIn && <Header />}
            <Routes>
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                {/* Redirect to signup if the user is not logged in */}
                <Route path="/home" element={<Home/>} />
            </Routes>
        </div>
    );
}

export default App;
