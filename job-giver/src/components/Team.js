import React, { useState, useEffect } from "react";
import axios from "axios";
import './Team.module.css' // Use CSS file specific to SeekersList
import { useNavigate } from 'react-router-dom'
import app from "../Firebase/firebase";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import StarRating from "./StartRating";

const SeekersList = () => {
  const auth = getAuth(app);
  const currentUserEmail = auth.currentUser?.email;
  const navigate = useNavigate();
  
  const [seekers, setSeekers] = useState([]);
  const [error, setError] = useState(null);
  const [ratingValues, setRatingValues] = useState({}); // Object to store rating values for each seeker

  const fetchSeekers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/seekers/current-team?currentTeam=${encodeURIComponent(currentUserEmail)}`);
      setSeekers(response.data);
      // Initialize rating values object with default value of 0 for each seeker
      const initialRatingValues = {};
      response.data.forEach((seeker) => {
        initialRatingValues[seeker.email] = 0;
      });
      setRatingValues(initialRatingValues);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchSeekers();
  }, []); // Empty dependency array to trigger the effect only on component mount

  const handleClick = async () => {
    await fetchSeekers();
    if (seekers.length === 0) {
      // navigate('/home');
      // toast.error('No current team');
    }
  };

  const submitRating = async (email) => {
    try {
      // Make a PUT request to the backend to submit the rating
      await axios.put(`http://localhost:3001/api/rate/${encodeURIComponent(email)}`, { rating: ratingValues[email] });
      // Reload the page by calling fetchSeekers again
      fetchSeekers();
      // Display success toast
      toast.success("Rating submitted successfully");
    } catch (error) {
      setError(error.message);
    }
  };
  // Function to update the rating value for a specific seeker
  const handleRatingChange = (email, value) => {
    // Update the rating value in the ratingValues object
    setRatingValues({ ...ratingValues, [email]: value });
  };

  const markJobCompleted = async () => {
    console.log('done')
    navigate('/home')
    toast.success("Doneeeee")
    try {
      await axios.put(`http://localhost:3001/api/reset-current-team?currentTeam=${encodeURIComponent(currentUserEmail)}`)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Seekers List</h1>
      <button className="refresh-button" onClick={handleClick}>Refresh Seekers</button>
      {error && <div className="error-message">Error: {error}</div>}
      <ul>
        {seekers.map((seeker) => (
          <li key={seeker._id}>
            <p>Name: {seeker.name}</p>
            <p>Email: {seeker.email}</p>
            <p>Skills: {seeker.skills.join(", ")}</p>
            {/* Replace the button with a star rating component */}
            <div>
              <StarRating value={ratingValues[seeker.email]} onClick={(value) => handleRatingChange(seeker.email, value)} />
              <button onClick={() => submitRating(seeker.email)}>Submit Rating</button>
            </div>
            {/* Add other fields as needed */}
          </li>
        ))}
      </ul>
      <button className="completed-button" onClick={markJobCompleted}>Mark Job Completed</button>
    </div>
  );
};

export default SeekersList;
