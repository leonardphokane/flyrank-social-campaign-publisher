// src/scheduler/queue.js
const { Queue } = require('bullmq');
const Redis = require('ioredis');

const connection = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

const publishQueue = new Queue('publish-queue', { connection });

module.exports = publishQueue;
