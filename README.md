
# AI Learning Platform – Root Repository

Welcome to the **main repository** of the AI-powered Learning Platform.

This project is divided into two main components:

1. **Frontend** – React + TypeScript client
2. **Backend** – .NET 8 Web API using ASP.NET Core

---

## 📁 Project Structure
```
AI-learning-platform/
├── Ai-learning-frontend/ ← React client application
│ └── README.md ← Frontend usage guide
│
├── AI_learning_backend/ ← ASP.NET Core backend API
│ └── README.md ← Backend usage guide
│
└── README.md ← This general README
```

---

## 📚 Detailed Documentation

- 🔗 [Frontend README (React)](https://github.com/TamarBollak0077/Ai_learning_platform/blob/main/Ai-learning-frontend/README.md)
- 🔗 [Backend README (.NET)](https://github.com/TamarBollak0077/Ai_learning_platform/blob/main/AI_learning_backend/README.md)

---

## 🎯 Project Purpose

The platform allows users to:
- Submit prompts to OpenAI for validation
- View personal prompt history
- Manage users, categories, and subcategories
- Use an admin dashboard for advanced management

---

## 👨‍💻 Contributing

- Pull requests are welcome.
- For major changes, please open an issue first.
- Please refer to the frontend and backend README files before starting work.

---

## ⚙️ Configuration

Before running the project, make sure to set your environment variables.

### Frontend

Create a `.env` file in `Ai-learning-frontend/` with:

```env
VITE_API_URL=http://localhost:5217/api
```
### Backend

The backend uses appsettings.json for configuration. A template file is available at appsettings.Development.example.json.
Replace PATH_TO_YOUR_DB_FILE.mdf with your actual database file path.
Make sure to set the OpenAI__ApiKey in your launch profile or user secret
