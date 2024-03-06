const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors module
const Seeker = require('./models/seeker');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://suhas:suhas2244@cluster0.nhaclgq.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Define routes

// POST route to insert seeker data
app.post('/api/seekers', async (req, res) => {
    try {
      const { name, email, skills, age, startDateTime, stopDateTime, location, photo } = req.body;
  
      const newSeeker = new Seeker({
        name,
        email,
        skills,
        age,
        startDateTime,
        stopDateTime,
        location,
        photo
      });
  
      const savedSeeker = await newSeeker.save();
  
      res.status(201).json(savedSeeker);
    } catch (error) {
      console.error('Error inserting seeker:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// GET route to fetch seeker data
app.get('/api/seekers', async (req, res) => {
  try {
    let query = {}; // Initialize empty query object

    // Check if skills query parameter is present and construct query accordingly
    if (req.query.skills) {
      const selectedSkills = new RegExp(req.query.skills, 'i'); // Case-insensitive RegExp for skills
      query.skills = { $regex: selectedSkills };
    }

    // Check if location query parameter is present and construct query accordingly
    if (req.query.location) {
      const location = new RegExp(req.query.location, 'i'); // Case-insensitive RegExp for location
      query.location = location;
    }

    // Check if start date and end date query parameters are present and construct query accordingly
    if (req.query.startDate && req.query.endDate) {
      query.startDateTime = { $lte: req.query.endDate };
      query.stopDateTime = { $gte: req.query.startDate };
    }

    // Ensure currentTeam is null
    query.currentTeam = null;

    // Fetch seekers based on constructed query
    const seekers = await Seeker.find(query);
    res.json(seekers);
  } catch (error) {
    console.error('Error fetching seekers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/teams', async (req, res) => {
  const { createdBy, members } = req.body;

  try {
    // Update the current team of the selected person(s)
    await Seeker.updateMany({ email: { $in: members } }, { $set: { currentTeam: createdBy } });

    res.status(200).json({ message: 'Team created successfully' });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Fetch seekers based on currentTeam
app.get('/api/seekers/current-team', async (req, res) => {
  const { currentTeam } = req.query;

  try {
    const seekers = await Seeker.find({ currentTeam });
    res.json(seekers);
  } catch (error) {
    console.error('Error fetching seekers by current team:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.put('/api/remove-from-team/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Find the seeker by email and update their currentTeam to null
    const seeker = await Seeker.findOne({ email: email });
    if (!seeker) {
      return res.status(404).json({ message: 'Seeker not found' });
    }

    await Seeker.findOneAndUpdate({ email: email }, { $set: { currentTeam: null } });
    
    res.status(200).json({ message: 'Removed from team successfully' });
  } catch (error) {
    console.error('Error removing from team:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.put('/api/rate/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const rating = req.body.rating;

    await Seeker.updateOne({ email }, { $push: { ratings: rating } });

    res.status(200).send('Rating submitted successfully');
  } catch (error) {
    console.error('Error rating seeker:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/reset-current-team', async (req, res) => {
  const { currentTeam } = req.query;

  try {
    // Update the currentTeam of all seekers with currentTeam equal to currentUserEmail to null
    await Seeker.updateMany({ currentTeam }, { $set: { currentTeam: null } });

    res.status(200).json({ message: 'Current team reset successfully' });
  } catch (error) {
    console.error('Error resetting current team:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
