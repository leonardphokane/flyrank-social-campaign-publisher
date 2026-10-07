// signPayload.js
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const payload = JSON.stringify({ postId: 1, status: "delivered" });
const secret = process.env.SECRET_KEY;

if (!secret) {
  console.error("SECRET_KEY is not defined in .env");
  process.exit(1);
}

const signature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");

console.log("Payload:", payload);
console.log("Signature:", signature);
