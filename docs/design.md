# Design Document — Multi‑Platform Social Campaign Publisher

## 1. Problem Statement
Turn one blog post into a complete social campaign with image variants, captions, and reliable publishing.

## 2. Data Model
Entities: Campaign, Post, Token, Status (with fields defined).

## 3. API Surface
Endpoints: /campaigns, /posts/:id/publish, /schedule, /webhook/social-delivery, /status/:post_id.

## 4. Architecture Sketch
Blog Post → Caption Composer + Image Pipeline → Durable Queue → SocialPublisher → Fake Adapters → Webhook → Status.

## 5. Non‑Goal
No polished frontend UI; backend reliability only.
