
# AI-Driven Learning Platform (Mini MVP)

## Overview
This project is a mini learning platform that enables users to select learning topics by category and sub-category, send prompts to an AI service to generate lessons, and view their learning history. The system includes a REST API backend, AI integration, a PostgreSQL database, and a simple React frontend dashboard.

## Features
- User registration and management
- Selection of learning categories and sub-categories
- Submitting prompts to AI and receiving lesson responses
- Viewing personal learning history
- Admin dashboard to review users and their prompt history

## Technologies Used
- Backend: C# (.NET 8)
- AI Integration: OpenAI GPT API
- Database: SQL Server (with Entity Framework Core ORM)
- Frontend: React.js
- Version control: Git and GitHub

## Project Structure
- `API/` - Backend REST API with controllers, services, and models
- `DAL/` - Data Access Layer including database context and entities
- `BL/` - Business Logic Layer handling AI calls and core logic
- `Frontend/` - React app for user interface and dashboard

## Setup Instructions

### Prerequisites
- .NET 8 SDK
- Node.js (for React frontend)
- SQL Server or compatible database
- OpenAI API key

### Backend
1. Clone the repo:
   ```bash
   git clone https://github
