import fs from "fs";
import OpenAI from "openai";
import { logCost, killSwitch } from "../utils/logger.js";
import { retry } from "../utils/retry.js";

// Configure OpenAI client to point at OpenRouter
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

/**
 * Calls the LLM to classify a support message.
 * @param {string} text - The support message text.
 * @returns {Promise<Object>} - Parsed JSON classification result.
 */
export async function triageMessage(text) {
  if (killSwitch()) {
    throw new Error("LLM disabled");
  }

  // Load prompt from file
  const prompt = fs.readFileSync("./prompts/triage_v1.txt", "utf8");

  // Retry wrapper for transient errors
  return await retry(async () => {
    const response = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text }
      ],
      timeout: 5000, // explicit timeout
    });

    // Log usage (tokens, cost)
    if (response.usage) {
      logCost(response.usage);
    }

    // Parse JSON output
    let parsed;
    try {
      parsed = JSON.parse(response.choices[0].message.content);
    } catch (err) {
      // Attempt one repair: hand the model its own error message
      const repairResponse = await client.chat.completions.create({
        model: "openrouter/free",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: `Your last output was invalid JSON: ${err.message}. Please return valid JSON only.` }
        ],
        timeout: 5000,
      });
      parsed = JSON.parse(repairResponse.choices[0].message.content);
    }

    return parsed;
  });
}
