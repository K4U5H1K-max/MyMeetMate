📋 MyMeetMate

MyMeetMate is your AI-powered meeting companion. It listens to your meeting transcripts, pulls out the important bits, and gives you instant clarity:

✅ Action items (with who’s responsible)

📌 Key decisions

❓ Open questions

📊 Meeting mood & sentiment

No more missed tasks or endless note-taking — MyMeetMate keeps your team aligned with crisp, shareable recaps.

🚀 Features

🔹 Real-time Transcript Analysis – works with Google Meet, Zoom, and MS Teams captions.

🔹 Structured Extraction – separates action items, decisions, and unresolved questions.

🔹 Mood Tracking – generates a simple heatmap of meeting positivity/negativity.

🔹 Instant Recap – end-of-meeting summary you can read in 1 minute.

🔹 Export Anywhere – send notes to Notion, Slack, or via email.

🔹 Privacy First – powered by Ollama running Mistral (7B) locally. Your data never leaves your machine.

🛠️ Tech Stack

Frontend

React + TailwindCSS

Framer Motion for smooth animations

Chrome Extension + Web App Dashboard

Backend

Python + FastAPI (robust API server)

Async processing for live transcripts

SQLite/Postgres for storage

AI

Ollama
 for local LLMs

Default model: mistral (7B)

Swappable with phi3:mini or other small models

⚙️ Installation
1. Clone the repo
git clone https://github.com/K4U5H1K-max/mymeetmate.git
cd mymeetmate

2. Install dependencies

Backend:

pip install -r requirements.txt


Frontend:

npm install

3. Install Ollama

Download Ollama → https://ollama.ai

Pull the model:

ollama pull mistral

4. Run the backend
uvicorn app.main:app --reload

5. Run the frontend
npm run dev

6. Start analyzing

Open your browser extension or dashboard → upload or stream meeting transcript → get instant recap 🚀

📡 API Endpoints

POST /analyze-transcript → takes transcript text, returns JSON with action items, decisions, open questions, sentiment.

POST /save-summary → saves recap to DB.

POST /export → exports recap to Notion/Slack/email.

📌 Roadmap

 Multi-speaker attribution (who said what)

 More export integrations (Google Docs, Trello, Jira)

 Advanced analytics (meeting participation stats, recurring blockers)

 Voice-based “Whisper Back” summaries

🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.
