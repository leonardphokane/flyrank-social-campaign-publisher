// tests/publish.test.js
const FakeInstagramPublisher = require('../src/adapters/FakeInstagramPublisher');
const { v4: uuidv4 } = require('uuid');

test("publish returns queued status", async () => {
  const instagram = new FakeInstagramPublisher();
  const post = { caption: "Test caption", imagePath: "./demo.jpg" };
  const key = uuidv4();

  const result = await instagram.publish(post, key);
  expect(result.status).toBe("queued");
});
