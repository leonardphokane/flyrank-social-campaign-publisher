// tests/idempotency.test.js
const FakeInstagramPublisher = require('../src/adapters/FakeInstagramPublisher');
const { v4: uuidv4 } = require('uuid');

test("duplicate publish yields one post", async () => {
  const instagram = new FakeInstagramPublisher();
  const post = { caption: "Test caption", imagePath: "./demo.jpg" };
  const key = uuidv4();

  const first = await instagram.publish(post, key);
  const second = await instagram.publish(post, key);

  expect(first).toEqual(second);
});
