// src/models/Post.js
class Post {
  constructor(id, campaignId, platform, caption, imagePath, scheduledTime, status = "queued") {
    this.id = id;
    this.campaignId = campaignId;
    this.platform = platform;
    this.caption = caption;
    this.imagePath = imagePath;
    this.scheduledTime = scheduledTime;
    this.status = status;
  }
}

module.exports = Post;
