import React, { useState, useEffect } from "react";
import axios from "axios";
import './Team.module.css'; // Use CSS file specific to SeekersList
import { useNavigate } from 'react-router-dom';
import app from "../Firebase/firebase";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import StarRating from "../utils/Feedback/StartRating";
import RatingPopup from "../utils/Feedback/RatingPopup"; // Assuming you have a RatingPopup component

const SeekersList = () => {
  const auth = getAuth(app);
  const currentUserEmail = auth.currentUser?.email;
  const navigate = useNavigate();

  const [seekers, setSeekers] = useState([]);
  const [error, setError] = useState(null);
  const [ratingValues, setRatingValues] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for controlling the popup
  const [selectedSeekerEmail, setSelectedSeekerEmail] = useState(null); // State to store the email of the selected seeker

  const fetchSeekers = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/seekers/current-team?currentTeam=${encodeURIComponent(currentUserEmail)}`);
      setSeekers(response.data);
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
  }, []);

  const handleClick = async () => {
    await fetchSeekers();
    if (seekers.length === 0) {
      // navigate('/home');
      // toast.error('No current team');
    }
  };

  const submitRating = async () => {
    try {
      await axios.put(`http://localhost:3001/api/rate/${encodeURIComponent(selectedSeekerEmail)}`, { rating: ratingValues[selectedSeekerEmail] });
      fetchSeekers();
      toast.success("Rating submitted successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRatingChange = (email, value) => {
    setRatingValues({ ...ratingValues, [email]: value });
  };

  const markJobCompleted = async () => {
    navigate('/home');
    toast.success("Done");
    try {
      await axios.put(`http://localhost:3001/api/reset-current-team?currentTeam=${encodeURIComponent(currentUserEmail)}`);
    } catch (error) {
      setError(error.message);
    }
  };

  const openPopup = (email) => {
    setSelectedSeekerEmail(email);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="container">
      <h1>Current Team Members</h1>
      <button className="refresh-button" onClick={handleClick}>Refresh Team Members</button>
      {error && <div className="error-message">Error: {error}</div>}
      <ul>
        {seekers.map((seeker) => (
          <li key={seeker._id}>
            <p>Name: {seeker.name}</p>
            <p>Email: {seeker.email}</p>
            <p>Skills: {seeker.skills.join(", ")}</p>
            <div>
              <button onClick={() => openPopup(seeker.email)}>Submit Rating</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="completed-button" onClick={markJobCompleted}>Mark Job Completed</button>
      
      {/* Render the RatingPopup component when the popup is open */}
      {isPopupOpen && (
        <RatingPopup
          onClose={closePopup}
          onSubmit={submitRating}
          seekerEmail={selectedSeekerEmail}
          ratingValue={ratingValues[selectedSeekerEmail]}
          onRatingChange={(value) => handleRatingChange(selectedSeekerEmail, value)}
        />
      )}
    </div>
  );
};

export default SeekersList;
