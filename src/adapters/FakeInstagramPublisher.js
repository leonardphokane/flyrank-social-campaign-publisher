// src/adapters/FakeInstagramPublisher.js
const SocialPublisher = require('./SocialPublisher');
const fetch = require('node-fetch');

class FakeInstagramPublisher extends SocialPublisher {
  constructor() {
    super("instagram");
  }

  async publish(post, idempotencyKey) {
    // Request token
    const tokenRes = await fetch("http://localhost:4000/token", { method: "POST" });
    const { token } = await tokenRes.json();

    // Publish post
    const res = await fetch("http://localhost:4000/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...post, idempotencyKey, token })
    });

    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After") || 1;
      console.log(`[Instagram] Rate limited. Retrying after ${retryAfter}s`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      return this.publish(post, idempotencyKey);
    }

    return res.json();
  }

  async getToken() {
    const res = await fetch("http://localhost:4000/token", { method: "POST" });
    return res.json();
  }

  async handleRateLimit(response) {
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After") || 1;
      console.log(`[Instagram] Rate limited. Retrying after ${retryAfter}s`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    }
  }
}

module.exports = FakeInstagramPublisher;
