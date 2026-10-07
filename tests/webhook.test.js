// tests/webhook.test.js
const { verifySignature } = require('../src/webhook/verifySignature');

test("valid signature passes verification", () => {
  const payload = JSON.stringify({ postId: "123", status: "published" });
  const secret = "test_secret";
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');

  const valid = verifySignature(payload, hmac, secret);
  expect(valid).toBe(true);
});
