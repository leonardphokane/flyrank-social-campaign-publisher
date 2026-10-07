// src/scheduler/worker.js
const { Worker } = require('bullmq');
const Redis = require('ioredis');
const FakeInstagramPublisher = require('../adapters/FakeInstagramPublisher');
const FakeXPublisher = require('../adapters/FakeXPublisher');
const db = require('../config/db');

const connection = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const instagram = new FakeInstagramPublisher();
const x = new FakeXPublisher();

const worker = new Worker('publish-queue', async job => {
  const { post, idempotencyKey, platform } = job.data;

  let result;
  if (platform === 'instagram') {
    result = await instagram.publish(post, idempotencyKey);
  } else if (platform === 'x') {
    result = await x.publish(post, idempotencyKey);
  } else {
    throw new Error(`Unknown platform: ${platform}`);
  }

  // Persist post status
  db.run(
    `UPDATE posts SET status = ? WHERE id = ?`,
    [result.status, post.id],
    err => {
      if (err) console.error("DB update error:", err.message);
    }
  );

  return result;
}, { connection });

worker.on('completed', job => {
  console.log(`Job ${job.id} completed for platform ${job.data.platform}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed: ${err.message}`);
  db.run(
    `UPDATE posts SET status = ? WHERE id = ?`,
    ["failed", job.data.post.id],
    e => { if (e) console.error("DB update error:", e.message); }
  );
});

module.exports = worker;
