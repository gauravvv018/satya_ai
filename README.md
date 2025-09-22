SatyaAI - AI-Powered Misinformation Detector

A project by Team Cloud Bots for the Gen AI Exchange Hackathon.

SatyaAI is an innovative, real-time detection and education platform built on Google Cloud to combat the spread of fake news and digital misinformation in India. It goes beyond simple verification by using a multi-layered AI engine to analyze content, perform live fact-checking against credible sources, and educate users on the manipulation tactics they encounter.

➡️ View the Live Demo: https://satya-ai-detection.netlify.app/

The Problem

Every day, millions in India are exposed to fake news, scams, and propaganda on social media and messaging apps. This digital contagion poses serious threats, causing misinformation-driven panic, social unrest, and financial scams. For the average person, distinguishing truth from falsehood has become increasingly difficult.

Our Solution

SatyaAI acts as a digital detective. Users can instantly verify any claim, message, or news article. Instead of a simple "true/false" verdict, it provides a comprehensive analysis, highlighting why a message may be misleading and teaching users to spot manipulation techniques.

(Consider adding a screenshot of your app here)

Key Features

Real-Time Analysis: Instant AI-powered reports on any text-based content.

Live Internet Fact-Checking: Uses Google Programmable Search Engine API to cross-reference claims against credible news sources in real-time.

Structured AI Feedback: Reports include:

Direct Verdict: e.g., "Confirmed False", "Unconfirmed/Misleading"

Trust Score: A 0-100 score for quick credibility assessment

Evidence Summary: Bullet points summarizing proof found online

Educational Insights: Explains why content may be suspicious and how to recognize similar tactics

Google Cloud Architecture

SatyaAI is a cloud-native solution leveraging Google Cloud Platform for scalability, reliability, and intelligence.

AI & Machine Learning – Vertex AI (Gemini 1.5 Flash): Core engine for deep contextual analysis, reasoning, and structured JSON reports.

Live Web Search – Programmable Search Engine API: Real-time fact-checking against pre-vetted credible sources.

Scalable Backend – Cloud Run: Serverless backend for handling unpredictable traffic spikes seamlessly.

Real-time Database – Firestore: Stores all analysis reports and user submissions for trend analysis and community insights.

User Management & Hosting – Firebase: Authentication, secure access, and optional hosting.

Backend Setup (Overview)

Google Cloud Project: Create a new project and enable Firestore, Cloud Run, and Vertex AI.

Gemini API Key: Generate via Google AI Studio.

Cloud Run Service: Deploy Python backend using functions-framework with google-generativeai and firebase-admin.

Firestore Integration: Store each analysis report for real-time access.

Backend Highlights:

Handles CORS and JSON requests.

Sends text to Gemini AI for deep analysis.

Stores structured results in Firestore.

Provides secure, scalable API endpoint.

Technology Stack

Frontend: React.js (Vite), Material-UI

AI Core: Google Gemini API (gemini-1.5-flash-latest)

Live Search: Google Programmable Search Engine API

Deployment: Netlify / GitHub Pages

Getting Started (Local Setup)

Prerequisites:

Node.js and npm installed

Code editor (e.g., VS Code)

Steps:

Clone the repo:

git clone https://github.com/wakeupr4x/satya-ai-detector.git
cd satya-ai-detector


Install dependencies:

npm install


Set up environment variables in src/App.jsx:

GEMINI_API_KEY

SEARCH_API_KEY

SEARCH_ENGINE_ID

Run the app:

npm run dev


Open http://localhost:5173
 to access the local demo.

Team

Team Cloud Bots – Built with passion to make India digitally safer!!
