# 🚀 AI Placement Copilot

AI Placement Copilot is a full-stack AI-powered platform that helps students prepare for placements by analyzing resumes, matching them with job descriptions, generating interview questions, and evaluating interview answers using Google Gemini AI.

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- Secure Login & Registration
- Refresh Token Support
- Spring Security

---

## 👤 User Profile

- Personal Profile Management
- Education Details
- Skills
- Social Links
- Professional Information

---

## 📄 Resume Management

- Upload Resume (PDF)
- Cloudinary Storage
- PDF Text Extraction
- Resume Download
- Resume Parsing

---

## 🤖 AI Resume Analyzer

Analyze resumes using Google Gemini AI.

Provides:

- ATS Score
- Professional Summary
- Strengths
- Weaknesses
- Missing Skills
- Improvement Suggestions

---

## 🎯 AI Job Matcher

Compare a resume against a Job Description.

Provides:

- Match Percentage
- Matched Skills
- Missing Skills
- Candidate Strengths
- Recommendations

---

## 🎤 AI Interview Generator

Generate interview questions based on:

- Resume
- Job Description
- Difficulty Level

Question Categories:

- Technical Questions
- HR Questions
- Project Questions
- Follow-up Questions

---

## 🧠 AI Interview Evaluation

Evaluate candidate answers.

Provides:

- Overall Score
- Technical Score
- Communication Score
- Confidence Score
- Strengths
- Improvement Suggestions
- Ideal Answer

---

# 🏗 Architecture

```
Frontend (Next.js)

↓

REST API

↓

Spring Boot Backend

↓

Business Services

↓

Gemini AI

↓

PostgreSQL

↓

Cloudinary
```

---

# 🛠 Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate

## Database

- PostgreSQL

## AI

- Google Gemini API

## Storage

- Cloudinary

## Build Tool

- Maven

---

# 📂 Project Structure

```
ai-placement-copilot/

│

├── backend/

│     └── Spring Boot Backend

│

├── frontend/

│     └── Next.js Frontend

│

├── docker/

├── docs/

└── scripts/
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/ethicalniket/ai-placement-copilot.git
```

---

## Backend

```bash
cd backend/backend
```

Run

```bash
./mvnw spring-boot:run
```

---

## Frontend

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

---

# 🔐 Environment Variables

Create your own configuration using the provided template.

```
application-example.yml
```

Fill your own values for:

- PostgreSQL
- JWT Secret
- Gemini API Key
- Cloudinary Credentials

Never commit your real secrets.

---

# 🚧 Roadmap

- [x] Authentication
- [x] Resume Upload
- [x] Resume Analysis
- [x] Job Matcher
- [x] Interview Generator
- [x] Interview Evaluation
- [ ] Dashboard UI
- [ ] Career Roadmap Generator
- [ ] AI Career Coach
- [ ] Cover Letter Generator
- [ ] Mock Interview
- [ ] Admin Dashboard
- [ ] Deployment

---

# 📌 Current Status

Backend API is functional and integrated with Google Gemini AI.

Frontend development is currently in progress.

---

# 👨‍💻 Author

**Niket Nayan**

GitHub

https://github.com/ethicalniket

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.
