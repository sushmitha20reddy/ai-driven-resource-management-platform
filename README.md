# 🚀 AI Driven Intelligent Resource Management Platform

## 📌 Project Overview

AI Driven Intelligent Resource Management Platform is a full-stack web application designed to assist students and professionals in learning, career development, and resource management using Artificial Intelligence.

The platform provides features such as AI-powered chat assistance, quiz generation, resume analysis, AI roadmap generation, study resources, performance analytics, and user profile management.

The objective of this project is to create a centralized intelligent learning ecosystem that helps users improve technical skills, prepare for placements, and track learning progress efficiently.

---

## 🎯 Key Features

### 👤 User Management

* User Registration
* User Login Authentication
* JWT Token-Based Authentication
* Profile Management

### 🤖 AI Assistant

* AI Chat Support
* Coding Assistance
* DSA Guidance
* Career Advice
* Project Recommendations

### 📝 Quiz Generator

* Subject-wise Quiz Creation
* Score Evaluation
* Performance Tracking
* Quiz History

### 📊 Dashboard Analytics

* Total Quiz Attempts
* Average Score
* Best Score
* Subject Statistics
* Performance Charts
* Recent Activities

### 📄 Resume Analyzer

* Resume Upload
* Resume Evaluation
* AI-Based Suggestions

### 🛣️ AI Roadmap Generator

* Personalized Learning Paths
* Skill Development Recommendations
* Career-Oriented Roadmaps

### 📚 Study Resources

* Coding Platforms
* AI & Machine Learning Resources
* Cloud Computing Resources
* Certification Platforms
* Placement Preparation Resources

### 🛠 Admin Panel

* View User Statistics
* Monitor Quiz Performance
* Track Platform Usage
* Manage Learning Data

---

## 🏗️ System Architecture

Frontend → Next.js + React + Tailwind CSS

Backend → FastAPI

Database → PostgreSQL

Authentication → JWT

Deployment:

* Frontend → Vercel
* Backend → Render

---

## 💻 Technologies Used

### Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* Axios
* Recharts
* Lucide Icons

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication
* Uvicorn

### Database

* PostgreSQL

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

```text
AI-Driven-Resource-Management-Platform
│
├── backend
│   ├── database
│   ├── models
│   ├── routes
│   ├── schemas
│   ├── utils
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   ├── styles
│   └── package.json
│
└── README.md
```

## ⚙️ Installation Steps

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 🚀 Deployment

### Frontend Deployment

Platform: Vercel

### Backend Deployment

Platform: Render

---

## 📈 Major Challenges Faced

### 1. CORS Issues

Problem:
Frontend and Backend were hosted on different domains.

Solution:
Configured CORS middleware in FastAPI.

### 2. JWT Authentication Errors

Problem:
Token validation failures.

Solution:
Implemented proper token generation and verification methods.

### 3. Database Connectivity Issues

Problem:
Deployment environment could not connect to PostgreSQL.

Solution:
Configured environment variables and connection strings properly.

### 4. Dashboard Analytics Issues

Problem:
Performance charts were not displaying data.

Solution:
Created dedicated chart-data API and connected Recharts correctly.

### 5. Deployment Failures

Problem:
Render deployment errors due to package issues.

Solution:
Updated requirements.txt and fixed imports.

---

## ✅ Advantages

* User-Friendly Interface
* AI-Powered Assistance
* Centralized Learning Platform
* Real-Time Analytics
* Personalized Learning Support
* Scalable Architecture
* Responsive Design

---

## ❌ Limitations

* Requires Internet Connectivity
* AI Responses Depend on API Availability
* Limited Offline Support
* Large File Upload Handling Can Be Improved

---

## 🔮 Future Enhancements

* Real-Time AI Voice Assistant
* Video Learning Recommendations
* AI Mock Interviews
* Placement Prediction System
* Mobile Application
* Multi-Language Support
* Dark/Light Theme Toggle
* Advanced Admin Dashboard

---



## 🎓 Academic Importance

This project demonstrates practical implementation of:

* Full Stack Development
* Database Management
* REST API Development
* Authentication Systems
* Artificial Intelligence Integration
* Cloud Deployment
* UI/UX Design
* Data Visualization

---

## 👩‍💻 Author

Sushmitha Reddy

B.Tech – Computer Science Engineering

Project: AI Driven Intelligent Resource Management Platform

Year: 2026

---

## 📜 License

This project is developed for academic and educational purposes.
