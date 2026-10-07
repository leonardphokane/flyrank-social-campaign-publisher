// src/models/Status.js
class Status {
  constructor(postId, state, updatedAt = new Date()) {
    this.postId = postId;
    this.state = state;
    this.updatedAt = updatedAt;
  }
}

module.exports = Status;
