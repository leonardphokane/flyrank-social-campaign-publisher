// src/models/Campaign.js
class Campaign {
  constructor(id, title, body, url, status = "queued") {
    this.id = id;
    this.title = title;
    this.body = body;
    this.url = url;
    this.status = status;
  }
}

module.exports = Campaign;
