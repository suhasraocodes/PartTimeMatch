<<<<<<< HEAD
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <p>
          Hello!!!
        </p>
    </div>    
    </Router>
  );
=======
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Navigate to="/signup" />} />
            </Routes>
        </div>
    );
>>>>>>> 320ecab8ea28604d8726e3ec8144040571671ae0
}

export default App;
