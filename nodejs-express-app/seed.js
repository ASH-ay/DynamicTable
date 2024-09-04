const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB Connection
const dbURI = 'mongodb+srv://ASH:<MjeYfVOYrssKwRSC>@cluster0.rrmec8q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // replace with your MongoDB URI
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', UserSchema);

// Load Data from JSON File
const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));

// Insert Data into MongoDB
User.insertMany(users)
    .then(() => {
        console.log('Data successfully inserted!');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error inserting data:', err);
        mongoose.connection.close();
    });
