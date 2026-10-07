// src/routes/status.js
const express = require('express');
const router = express.Router();

// In-memory store for demo purposes
let campaignStatuses = [
  // Example entry:
  // { platform: "instagram", caption: "Hello World", status: "queued", updatedAt: new Date().toISOString() }
];

router.get('/status', (req, res) => {
  res.json(campaignStatuses);
});

// Export router
module.exports = { router, campaignStatuses };
