import crypto from "crypto";

// Usage: node src/utils/sign.js '{"postId":1,"status":"failed"}'
const args = process.argv[2];
if (!args) {
  console.error("Usage: node src/utils/sign.js '<json_payload>'");
  process.exit(1);
}

const payload = args;
const secret = process.env.SECRET_KEY || "my_secret_key_here";

const signature = crypto
  .createHmac("sha256", secret)
  .update(payload)
  .digest("hex");

console.log("Payload:", payload);
console.log("Signature:", signature);
