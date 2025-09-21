SatyaAI - AI-Powered Misinformation Detector
A project by Team Cloud Bots for the Gen AI Exchange Hackathon.

SatyaAI is an innovative, real-time detection and education platform built on Google Cloud to combat the spread of fake news and digital misinformation in India. It goes beyond simple verification by using a multi-layered AI engine to analyze content, perform live fact-checking against credible sources, and educate users on the manipulation tactics they encounter.

➡️ View the Live Demo Here - https://satya-ai-detection.netlify.app/

The Problem
Every day, millions in India are exposed to fake news, scams, and propaganda on social media and messaging apps. This digital contagion poses a serious threat, capable of causing social unrest and significant harm. For the average person, it has become incredibly difficult to distinguish what is true and what is false.

Our Solution
SatyaAI is a user-friendly web application that acts as a digital detective. It empowers users to instantly verify any claim, message, or news article. Instead of a simple "true/false" verdict, it provides a comprehensive analysis that educates the user, fostering a more informed and critical digital citizenry.

(Consider adding a screenshot of your app here)

Key Features
Real-Time Analysis: Get an instant AI-powered report on any text-based content.

Live Internet Fact-Checking: Uses the Google Search API to cross-reference claims against a curated list of credible news sources in real-time.

Structured AI Feedback: The analysis is broken down into clear, actionable sections:

Direct Verdict: A final opinion (e.g., "Confirmed False", "Unconfirmed/Misleading").

Trust Score: A 0-100 score for a quick credibility assessment.

Evidence Summary: A bulleted list summarizing the evidence found (or not found) online.

Educational Approach: The "Deeper Dive" and "Educational Tip" sections explain why content is suspicious, helping users spot similar tactics in the future.

Google Cloud Architecture
This project is a fully cloud-native solution built to leverage the power and scalability of Google Cloud Platform.

AI & Machine Learning - Vertex AI (Gemini 1.5 Flash): The core of our platform. We use Google's powerful Gemini model for deep contextual analysis, reasoning, and generating the structured JSON reports that users see.

Live Web Search - Programmable Search Engine API: To ensure our fact-checking is based on the latest information, we use this API to perform targeted, real-time searches against a pre-vetted list of credible news sources.

Scalable Backend - Cloud Run: Our initial robust design utilized a serverless backend on Cloud Run. This architecture ensures our application can handle massive, unpredictable traffic spikes (e.g., during a viral news event) without any downtime.

Real-time Database - Firestore: Every analysis report and user submission was designed to be stored in Firestore. This NoSQL database allows for real-time data synchronization and would power future features like trend analysis and community reporting dashboards.

User Management & Hosting - Firebase: As part of the GCP ecosystem, Firebase Authentication was planned for secure user management, and Firebase Hosting was considered for its global CDN capabilities before we settled on our final deployment.

Technology Stack
Frontend: React.js (Vite), Material-UI

AI Core: Google Gemini API (gemini-1.5-flash-latest)

Live Search: Google Programmable Search Engine API

Deployment: Netlify / GitHub Pages

Getting Started (Local Setup)
To run this project on your local machine, follow these steps:

1. Prerequisites:

Node.js and npm installed.

A code editor like Visual Studio Code.

2. Clone the Repository:

git clone [https://github.com/wakeupr4x/satya-ai-detector.git](https://github.com/wakeupr4x/satya-ai-detector.git)
cd satya-ai-detector

3. Install Dependencies:

npm install

4. Set Up Environment Variables:
You will need three API credentials from Google Cloud:

GEMINI_API_KEY

SEARCH_API_KEY

SEARCH_ENGINE_ID

Open the src/App.jsx file and paste your keys into the placeholder constants at the top of the file.

5. Run the Application:

npm run dev

The application will be running on http://localhost:5173.

Team
This project was built with passion by Team Cloud Bots.
