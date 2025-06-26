const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./model/user');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connected 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch(err => {
  console.log("❌ MongoDB connection failed!", err);
});

// ✅ Register route 
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

// ✅ Login route 
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.status(200).json({ message: "Login successful" });
});

// ✅ Home route
app.get('/', (req, res) => {
  res.send("API is running on port 5001");
});

const port = 5001;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

