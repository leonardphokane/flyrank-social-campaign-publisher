// src/services/captionComposer.js

function composeCaption(sharedVoice, platformRules, contentSummary) {
  return `${sharedVoice} ${platformRules} ${contentSummary}`;
}

function generateCaptions(sharedVoice, contentSummary) {
  const platforms = {
    instagram: "📸 Keep it visual, hashtags encouraged.",
    x: "⚡ Short, sharp, trending tone.",
    linkedin: "💼 Professional, value-driven."
  };

  const captions = {};

  for (const [platform, rules] of Object.entries(platforms)) {
    captions[platform] = composeCaption(sharedVoice, rules, contentSummary);
  }

  return captions;
}

module.exports = { generateCaptions };
