const mongoose = require('mongoose');

// Define seeker schema
const seekerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    skills: [String],
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    startDateTime: {
      type: Date,
      required: true
    },
    stopDateTime: {
      type: Date,
      required: true
    },
    currentTeam: {
      type: String
    },
    ratings: [Number],
    location: {
      type: String,
      required: true
    },
    photo: {
      type: String // Assuming you will store the URL of the photo
    }
});

// Create seeker model
const Seeker = mongoose.model('Seeker', seekerSchema);

module.exports = Seeker;
