// src/services/imagePipeline.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateVariants(sourceImagePath, outputDir) {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const variants = [
    { name: 'instagram', width: 1080, height: 1080 }, // 1:1 square
    { name: 'x', width: 1600, height: 900 }           // 16:9 landscape
  ];

  const results = [];

  for (const variant of variants) {
    const outputPath = path.join(outputDir, `${variant.name}.jpg`);
    await sharp(sourceImagePath)
      .resize(variant.width, variant.height, { fit: 'cover' })
      .toFile(outputPath);

    results.push({ platform: variant.name, path: outputPath });
  }

  return results;
}

module.exports = { generateVariants };
