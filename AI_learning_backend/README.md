# AI Learning Platform - Backend

Backend of the AI Learning Platform, built with a layered architecture using .NET 8.  
Provides RESTful APIs for user management, prompt handling, category management, and AI prompt validation using OpenAI.

---

## Technologies Used

- **.NET 8** (C# 12)  
- **ASP.NET Core Web API**  
- **Entity Framework Core** (Code First & Database First, SQL Server LocalDB)  
- **AutoMapper**  
- **JWT Authentication**  
- **xUnit** (Unit Testing)  
- **OpenAI API** (for AI prompt validation)

---

## Project Structure

AI_learning_backend/
├── API/ # ASP.NET Core Web API (Controllers, Startup, etc.)
├── BL/ # Business Logic Layer (Services, DTOs, Interfaces)
├── DAL/ # Data Access Layer (EF Core Models, DB Context)
├── AI_learning_backend.Tests/ # Unit Tests (xUnit)
├── DAL/Database/ # LocalDB MDF and LDF files (if used)
├── API/Properties/
│ ├── launchSettings.example.json # Example for local environment settings
│ └── launchSettings.json # (Gitignored, local use only)
├── API/appsettings.json # Configuration file (no secrets)
└── README.md # This file


---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)  
- [SQL Server Express **LocalDB**](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb)  
- [Node.js and npm](https://nodejs.org/) (only required if using the separate **React frontend**)  
- **OpenAI API key** (for AI features)

---

## Installation & Setup

1. Make sure **SQL Server Express LocalDB** is installed.  
2. Copy the database file `DAL/Database/AI_learning_platform_DB.mdf` to the appropriate path.  
3. Run the following command to update the database:
   ```bash
   dotnet ef database update
4. Copy API/Properties/launchSettings.example.json to API/Properties/launchSettings.json.
5. Insert your OpenAI API key in the "OpenAI__ApiKey" field of launchSettings.json.
6. Run the project

---

# Running the Application
## From the root directory, run:

dotnet build
dotnet run --project API

The API will be available at http://localhost:5217/swagger (or your configured URL).

---

# Running Tests

dotnet test

⚠️ Note: One test fails due to dual EF provider registration (SqlServer & InMemory). In production, only SqlServer is used.
Make sure to provide environment variables (like OpenAI__ApiKey) via launchSettings.json or a .env file.


---

# Main Features

- User Management: Register, retrieve, and manage users

- Prompt Management: Submit prompts, get user prompt history, get all prompts (admin)

- Category Management: Retrieve categories and subcategories

- AI Prompt Validation: Validate prompts using OpenAI GPT-3.5

- JWT Authentication: Secure endpoints for users and admins

- Unit Testing: xUnit tests for services and controllers

# Security and API Key Handling

Important: Do NOT commit your real OpenAI API key to the repository.

To use the application securely:

- Use the placeholder "YOUR_OPENAI_API_KEY_HERE" in launchSettings.example.json

- Instruct users (or the reviewer/instructor) to add their actual API key locally in launchSettings.json

- Share your real API key privately with reviewers (e.g., via email or private message)

This is essential for maintaining security and demonstrating best practices

---

# Usage Examples

- Register a user: POST /api/user/register

- Submit a prompt: POST /api/prompt

- Validate a prompt: POST /api/subCategory/validate-prompt

- Get user prompt history: GET /api/prompt/user/{userId}

# Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

# License

MIT

For questions or issues, please open an issue on GitHub.