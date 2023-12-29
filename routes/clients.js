// server/routes/clients.js
const express = require('express');
const router = express.Router();
const Client = require('../models/client');

// Get all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get client by ID
router.get('/clients/:id', getClient, (req, res) => {
  res.json(res.client);
});

// Create a new client
router.post('/clients', async (req, res) => {
  const client = new Client({
    name: req.body.name,
  });

  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to get client by ID
async function getClient(req, res, next) {
  let client;

  try {
    client = await Client.findById(req.params.id);
    if (client == null) {
      return res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.client = client;
  next();
}

module.exports = router;