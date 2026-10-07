// tests/image.test.js
const { generateVariants } = require('../src/services/imagePipeline');
const fs = require('fs');

test("image variants have correct dimensions", async () => {
  const results = await generateVariants("./demo.jpg", "./output");
  expect(results).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ platform: "instagram" }),
      expect.objectContaining({ platform: "x" })
    ])
  );
  results.forEach(r => expect(fs.existsSync(r.path)).toBe(true));
});
