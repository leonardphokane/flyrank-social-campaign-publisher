import { verifySignature } from './verifySignature.js';
import db from '../config/db.js';

export function handleDelivery(req, res) {
  const signature = req.headers['x-signature'];
  const secret = process.env.SECRET_KEY;
  const payload = JSON.stringify(req.body);

  if (!verifySignature(payload, signature, secret)) {
    return res.status(400).send({ error: "Invalid signature" });
  }

  const { postId, status } = req.body;
  console.log(`Webhook received for post ${postId}: ${status}`);

  const updatedAt = new Date().toISOString();

  try {
    if (status === "failed") {
      // Increment retryCount and set errorMessage
      db.run(
        `UPDATE campaigns 
         SET status = ?, created_at = ?, retryCount = retryCount + 1, errorMessage = ? 
         WHERE id = ?`,
        [status, updatedAt, "Delivery failed", postId],
        err => {
          if (err) console.error("DB update error:", err.message);
        }
      );
    } else {
      // Clear errorMessage on success/delivered
      db.run(
        `UPDATE campaigns 
         SET status = ?, created_at = ?, errorMessage = NULL 
         WHERE id = ?`,
        [status, updatedAt, postId],
        err => {
          if (err) console.error("DB update error:", err.message);
        }
      );
    }
  } catch (err) {
    console.error("DB update error:", err.message);
    return res.status(500).send({ error: "Database update failed" });
  }

  return res.status(200).send({ success: true });
}
