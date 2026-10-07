// src/mockServer.js
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import fetch from 'node-fetch'; // install with: npm install node-fetch

const app = express();
app.use(bodyParser.json());

const SECRET = process.env.SECRET_KEY || "mock_secret";
const issuedTokens = new Set();
const publishedPosts = new Map();

// --- Token issuance ---
app.post('/token', (req, res) => {
  const token = crypto.randomBytes(16).toString('hex');
  issuedTokens.add(token);
  res.json({ token, issuedAt: new Date().toISOString() });
});

// --- Publish endpoint ---
app.post('/publish', (req, res) => {
  const { caption, imagePath, idempotencyKey, token } = req.body;

  if (!issuedTokens.has(token)) {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (publishedPosts.has(idempotencyKey)) {
    return res.json({ status: "duplicate", post: publishedPosts.get(idempotencyKey) });
  }

  if (Math.random() < 0.2) {
    return res.status(429).set('Retry-After', '2').json({ error: "Rate limit exceeded" });
  }

  const postId = crypto.randomUUID();
  const post = { postId, caption, imagePath, status: "queued" };
  publishedPosts.set(idempotencyKey, post);

  // Simulate async delivery callback
  setTimeout(() => {
    const payload = JSON.stringify({ postId, status: "published" });
    const hmac = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');

    fetch("http://localhost:3000/webhook/social-delivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-signature": hmac
      },
      body: payload
    }).catch(err => console.error("Webhook delivery failed:", err.message));
  }, 1000);

  res.json({ status: "accepted", post });
});

// --- Health check ---
app.get('/', (req, res) => res.send({ status: "mock server running" }));

const PORT = process.env.MOCK_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Mock social platform server running on http://localhost:${PORT}`);
});
