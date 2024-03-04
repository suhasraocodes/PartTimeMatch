import React, { useState } from "react";
import "./Search.css";

const SearchPage = () => {
  const [ageFilter, setAgeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const handleSearch = () => {
    // Perform search logic based on filters
    console.log(
      "Searching with filters:",
      ageFilter,
      locationFilter,
      genderFilter
    );
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
  };

  return (
    <div className="search-container">
      <div className="form-group">
        <input
          type="text"
          id="age"
          value={ageFilter}
          onChange={(e) => setAgeFilter(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <select
          id="location"
          value={locationFilter}
          onChange={handleLocationChange}
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
        <select
          id="gender"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="form-select"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchPage;
