// src/adapters/SocialPublisher.js

class SocialPublisher {
  constructor(platformName) {
    this.platformName = platformName;
  }

  /**
   * Publish a post to the platform.
   * @param {Object} post - { caption, imagePath, scheduledTime }
   * @param {String} idempotencyKey - unique key for deduplication
   */
  async publish(post, idempotencyKey) {
    throw new Error("publish() must be implemented by subclass");
  }

  /**
   * Refresh or issue a token for the platform.
   */
  async getToken() {
    throw new Error("getToken() must be implemented by subclass");
  }

  /**
   * Handle rate limits (429 + Retry-After).
   */
  async handleRateLimit(response) {
    throw new Error("handleRateLimit() must be implemented by subclass");
  }
}

module.exports = SocialPublisher;
