// src/seed.js
const publishQueue = require('./scheduler/queue');
const { v4: uuidv4 } = require('uuid');

async function seedDemoCampaign() {
  const campaignId = uuidv4();

  const demoPostInstagram = {
    post: {
      campaignId,
      caption: "📸 Demo Instagram caption",
      imagePath: "./demo/instagram.jpg",
      scheduledTime: new Date(Date.now() + 5000) // 5s from now
    },
    idempotencyKey: uuidv4(),
    platform: "instagram"
  };

  const demoPostX = {
    post: {
      campaignId,
      caption: "⚡ Demo X caption",
      imagePath: "./demo/x.jpg",
      scheduledTime: new Date(Date.now() + 10000) // 10s from now
    },
    idempotencyKey: uuidv4(),
    platform: "x"
  };

  await publishQueue.add('publish', demoPostInstagram, { delay: 5000 });
  await publishQueue.add('publish', demoPostX, { delay: 10000 });

  console.log("Demo campaign seeded with Instagram + X posts.");
}

seedDemoCampaign().catch(err => console.error(err));
