import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import { handleDelivery } from './webhook/deliveryHandler.js';
import db from './db.js';

const app = express();
app.use(bodyParser.json());

// Health check
app.get('/', (req, res) => res.send({ status: "ok" }));

// Webhook endpoint
app.post('/webhook/social-delivery', handleDelivery);

// Campaign publish route
app.post('/publish', (req, res) => {
  const { caption, imagePath, idempotencyKey } = req.body;

  const stmt = db.prepare(`
    INSERT INTO campaigns (platform, caption, imagePath, status, updatedAt)
    VALUES (?, ?, ?, ?, ?)
  `);

  const updatedAt = new Date().toISOString();
  stmt.run("instagram", caption, imagePath, "queued", updatedAt);

  res.json({ platform: "instagram", caption, imagePath, status: "queued", updatedAt });
});

// Status route
app.get('/status', (req, res) => {
  const rows = db.prepare(`SELECT * FROM campaigns ORDER BY updatedAt DESC`).all();
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY); // Debug check
});
