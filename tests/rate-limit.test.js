// tests/rate-limit.test.js
const FakeXPublisher = require('../src/adapters/FakeXPublisher');

test("rate limit triggers backoff", async () => {
  const x = new FakeXPublisher();
  const fakeResponse = { status: 429, headers: { 'Retry-After': 1 } };

  await expect(x.handleRateLimit(fakeResponse)).resolves.toBeUndefined();
});
