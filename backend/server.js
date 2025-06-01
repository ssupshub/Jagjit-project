require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1) Connect to Atlas
title = mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

// 2) Define schema & model
const Topic = new mongoose.Schema({ name: String, completed: Boolean });
const Subject = new mongoose.Schema({ name: String, topics: [Topic] });
const SubjectModel = mongoose.model('Subject', Subject);

// 3) Endpoints

// Fetch all subjects
app.get('/subjects', async (req, res) => {
  const subs = await SubjectModel.find();
  res.json(subs);
});

// Add a new subject
app.post('/subjects', async (req, res) => {
  const sub = new SubjectModel({ name: req.body.name, topics: [] });
  await sub.save();
  res.json(sub);
});

// Add a topic to a subject
app.post('/subjects/:id/topics', async (req, res) => {
  const sub = await SubjectModel.findById(req.params.id);
  sub.topics.push({ name: req.body.name, completed: false });
  await sub.save();
  res.json(sub);
});

// Toggle a topic's completion
app.patch('/subjects/:sId/topics/:tId', async (req, res) => {
  const sub = await SubjectModel.findById(req.params.sId);
  const topic = sub.topics.id(req.params.tId);
  topic.completed = !topic.completed;
  await sub.save();
  res.json(sub);
});

// Start server
app.listen(4000, () => console.log('Server listening on http://localhost:4000'));