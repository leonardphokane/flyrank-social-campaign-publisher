// src/models/Token.js
class Token {
  constructor(id, platform, encryptedValue, createdAt = new Date()) {
    this.id = id;
    this.platform = platform;
    this.encryptedValue = encryptedValue;
    this.createdAt = createdAt;
  }
}

module.exports = Token;
