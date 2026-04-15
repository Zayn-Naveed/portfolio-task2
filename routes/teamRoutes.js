const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

// GET - Fetch all team members
router.get('/', async (req, res) => {
  try {
    const members = await Team.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST - Add new team member
router.post('/', async (req, res) => {
  try {
    const newMember = new Team(req.body);
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(400).json({ message: 'Error adding member' });
  }
});

// PUT - Edit existing team member
router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: 'Error updating member' });
  }
});

// DELETE - Remove team member
router.delete('/:id', async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting member' });
  }
});

module.exports = router;