# LLM Chat Monitor & Inference Logging System

## Overview

This project is a lightweight full-stack LLM monitoring system built using React, Express.js, SQLite, and OpenRouter.

The application allows users to create multiple conversations, interact with an AI model, store chat history, and monitor inference metadata such as latency, provider, model, and request status.

---

## Features

### Chatbot Application

* Multi-turn conversations
* Conversation history persistence
* Resume previous conversations
* Multiple chat sessions
* OpenRouter AI integration

### Inference Monitoring

* Model tracking
* Provider tracking
* Latency measurement
* Request status tracking
* Timestamp logging

### Storage

* SQLite database
* Persistent chat history
* Persistent inference logs
* Conversation management

---

## Tech Stack

### Frontend

* React
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* SQLite

### LLM Provider

* OpenRouter
* GPT OSS 20B

---

## Architecture

Frontend (React)

↓

Backend API (Express)

↓

LLM Wrapper Service

↓

OpenRouter API

↓

SQLite Database

---

## Database Schema

### messages

| Column     | Type     |
| ---------- | -------- |
| id         | INTEGER  |
| role       | TEXT     |
| text       | TEXT     |
| created_at | DATETIME |

### conversations

| Column     | Type     |
| ---------- | -------- |
| id         | INTEGER  |
| title      | TEXT     |
| created_at | DATETIME |

### logs

| Column     | Type     |
| ---------- | -------- |
| id         | INTEGER  |
| provider   | TEXT     |
| model      | TEXT     |
| latency    | INTEGER  |
| status     | TEXT     |
| created_at | DATETIME |

---

## Setup Instructions

### Backend

Install dependencies

npm install

Start backend

node server.js

### Frontend

Install dependencies

npm install

Start frontend

npm run dev

---

## Inference Logging

Each LLM request generates an inference log containing:

* Provider
* Model
* Latency
* Status
* Timestamp

Logs are stored in SQLite and displayed through the Logs Dashboard.

---

## Tradeoffs

### SQLite vs MongoDB

SQLite was selected because:

* Lightweight
* Easy local setup
* No external infrastructure
* Suitable for assignment scope

### Single Backend Service

A single Express service was used to reduce complexity and improve development speed.

---

## Future Improvements

* Token usage tracking
* Input/output previews
* Streaming responses
* Multi-provider support
* Docker deployment
* Authentication
* Real-time dashboards
* Event-driven ingestion pipeline

---



<img width="1920" height="1080" alt="Screenshot (297)" src="https://github.com/user-attachments/assets/dcb0e091-9d57-4f5d-b4f1-c7bf5f9992ba" />


<img width="1920" height="1080" alt="Screenshot (298)" src="https://github.com/user-attachments/assets/fa8b4e22-b0c3-493c-b95b-68e977f378d6" />



## Author

Nirupadi S B

2026 Computer Science & Engineering
