import React, { useState, useEffect } from "react";
import "./Search.css";
import { notify } from "../components/toast";
import axios from "axios";
import { getAuth } from "firebase/auth";
import app from "../Firebase/firebase";
import { useNavigate } from "react-router-dom";
const SearchPage = () => {
  const [skillsFilter, setSkillsFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false); // State to track loading
  const [ratings, setRatings] = useState({}); // State to store ratings
  const auth = getAuth(app);
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch ratings when component mounts
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/ratings");
      const ratingsData = response.data;
      const calculatedRatings = {};
      ratingsData.forEach((rating) => {
        const email = rating.email;
        const reviews = rating.reviews || [];
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        calculatedRatings[email] = totalRating;
      });
      setRatings(calculatedRatings);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading to true when search starts
      // Convert date objects to ISO string format
      const formattedStartDate = startDate.toString();
      const formattedEndDate = endDate.toString();
  
      const url = `http://localhost:3001/api/seekers?skills=${skillsFilter}&location=${locationFilter}`;
      const response = await axios.get(url);
      // Introduce a delay of 2 seconds
      setTimeout(() => {
        setSearchResults(response.data);
        setLoading(false); // Set loading to false after search results are fetched
        console.log('success');
        setSelectedPerson(null); // Reset selected person
        console.log(response);
      }, 2000);
    } catch (error) {
      console.error('Error searching:', error);
      notify("Error searching. Please try again later.", "error");
      setLoading(false); // Set loading to false if there's an error
    }
  };

  const handleCardClick = (person) => {
    setSelectedPerson(person);
  };

  const handleAddToTeam = () => {
    setTeamMembers([...teamMembers, selectedPerson]); // Store person in teamMembers
    notify("Added to Team!", "success"); // Display success toast
    setSelectedPerson(null); // Reset selected person
    // Remove selected person from search results
    setSearchResults(searchResults.filter((person) => person.email !== selectedPerson.email));
  };

  const handleRemoveFromTeam = async (email) => {
    try {
      setLoading(true); // Set loading to true while making the API call

      // Make a PUT request to the backend to remove the member from the team
      await axios.put(`http://localhost:3001/api/remove-from-team/${encodeURIComponent(email)}`);
    
      // Update the teamMembers state by filtering out the removed member
      setTeamMembers(teamMembers.filter((member) => member.email !== email));
      
      // Display success toast
      notify("Removed from Team!", "success");
    } catch (error) {
      console.error('Error removing from team:', error);
      notify("Error removing from team. Please try again later.", "error");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCreateTeam = async () => {
    const teamName = prompt("Enter team name:");
    if (teamName) {
      try {
        setLoading(true); // Set loading to true while making the API call
  
        // Define the request body
        const requestBody = {
          createdBy: auth.currentUser.email, // Replace this with the actual email of the current user
          members: teamMembers.map(member => member.email), // Extract emails of team members
        };
        // Make a POST request to the API endpoint
        await axios.post('http://localhost:3001/api/teams', requestBody);
  
        // Display success toast
        notify("Team Created!", "success");
  
        // Reset team name and members
        setTeamName("");
        setTeamMembers([]);
        navigate('/team')
        // Reset loading state
        setLoading(false);
      } catch (error) {
        console.error('Error creating team:', error);
        notify("Error creating team. Please try again later.", "error");
        setLoading(false); // Reset loading state in case of error
      }
    } else {
      notify("Team creation canceled.", "error"); // Display error toast if team name is empty
    }
  };

  return (
    <div>
      <div className="search-container">
        <div className="form-group">
          <input
            type="text"
            id="skills"
            value={skillsFilter}
            onChange={(e) => setSkillsFilter(e.target.value)}
            className="form-input"
            placeholder="Skills"
          />
        </div>
        <div className="form-group">
          <select
            id="location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="form-select"
          >
            <option value="">Select Location</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Jaipur">Jaipur</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="datetime-local"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-input"
            placeholder="Start Date"
          />
        </div>
        <div className="form-group">
          <input
            type="datetime-local"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-input"
            placeholder="End Date"
          />
        </div>
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="loading-indicator">
          <div className="loading-spinner"></div>
        </div>
      )}

      <div className="cards-container">
        {searchResults.map((person) => (
          <div key={person.id} className="card" onClick={() => handleCardClick(person)}>
            <img src={person.photo} alt={person.name} className="card-image" />
            <div className="card-text">
              <h3>{person.name}</h3>
              {/* Display sum of ratings */}
              <p>Total Rating: {ratings[person.email]}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedPerson && (
        <div className="person-info-container">
          <div className="person-info">
            <span className="close" onClick={() => setSelectedPerson(null)}>&times;</span>
            <h2>{selectedPerson.name}</h2>
            <img src={selectedPerson.photo} alt={selectedPerson.name} className="person-image" />
            <p>Email: {selectedPerson.email}</p>
            <p>Age: {selectedPerson.age}</p>
            <p>Location: {selectedPerson.location}</p>
            <p>Total Rating: {selectedPerson.ratings}</p>
            <button onClick={handleAddToTeam} className="btn btn-primary">Add to Team</button>
          </div>
        </div>
      )}

      <div className="team-container">
        <h2>Team Members</h2>
        <ul className="team-list">
          {teamMembers.map((member, index) => (
            <li key={index}>
              <div>
                <p>Name: {member.name}</p>
                <p>Email: {member.email}</p>
                <p>Total Rating: {ratings[member.email]}</p>
                <button onClick={() => handleRemoveFromTeam(member.email)} className="btn btn-danger">Remove</button>
              </div>
            </li>
          ))}
        </ul>
        {teamMembers.length >= 2 && <button onClick={handleCreateTeam} className="btn btn-primary">Create Team</button>}
      </div>
    </div>
  );
};

export default SearchPage;
