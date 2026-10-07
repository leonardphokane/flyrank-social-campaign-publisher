// tests/webhookForgery.test.js
const { verifySignature } = require('../src/webhook/verifySignature');

test("forged webhook is rejected", () => {
  const payload = JSON.stringify({ postId: "123", status: "published" });
  const secret = "test_secret";
  const forgedSignature = "bad_signature";

  const valid = verifySignature(payload, forgedSignature, secret);
  expect(valid).toBe(false);
});
