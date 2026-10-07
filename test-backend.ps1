Write-Host "🚀 Starting Backend Automated Tests..."

# 1. Publish a campaign
Write-Host "`n📤 Publishing campaign..."
$publishResponse = curl -X POST http://localhost:3000/publish `
  -H "Content-Type: application/json" `
  -d '{"caption":"Launching our new AI-powered campaign 🚀 #FlyRank","imagePath":"/images/flyrankdashboard.png"}'

Write-Host "Publish Response:"
$publishResponse

# 2. Check campaign status
Write-Host "`n📊 Checking campaign status..."
$statusResponse = curl http://localhost:3000/status
Write-Host "Status Response:"
$statusResponse

# 3. Simulate webhook delivery (use the signature you generated with sign.js)
Write-Host "`n🔔 Simulating webhook delivery..."
$webhookResponse = curl -X POST http://localhost:3000/webhook/social-delivery `
  -H "Content-Type: application/json" `
  -H "x-signature: dfb1a97dd4aaa4fd970cc66dd8e854e000c6507f9c94487d57fab43234506a92" `
  -d '{"postId":1,"status":"delivered"}'

Write-Host "Webhook Response:"
$webhookResponse

# 4. Verify status update
Write-Host "`n✅ Verifying updated status..."
$finalStatus = curl http://localhost:3000/status
Write-Host "Final Status:"
$finalStatus

Write-Host "`n🎯 Backend test flow complete!"
