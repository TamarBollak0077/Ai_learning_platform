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
- **Docker** (for backend containerization)

---

## Project Structure

```
AI_learning_backend/
├── API/                         # ASP.NET Core Web API (Controllers, Startup, etc.)
├── BL/                          # Business Logic Layer (Services, DTOs, Interfaces)
├── DAL/                         # Data Access Layer (EF Core Models, DB Context)
├── AI_learning_backend.Tests/   # Unit Tests (xUnit)
├── DAL/Database/                # LocalDB MDF and LDF files (if used)
├── API/Properties/
│   ├── launchSettings.example.json  # Example for local environment settings
│   └── launchSettings.json          # (Gitignored, local use only)
├── API/appsettings.json         # Configuration file (no secrets)
├── Dockerfile                   # Docker configuration file for backend
└── README.md                    # This file
```

---

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)  
- [SQL Server Express **LocalDB**](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb)  
- [Docker](https://www.docker.com/)   
- **OpenAI API key** (for AI features)

---

## Installation & Setup (Without Docker)

1. Make sure **SQL Server Express LocalDB** is installed.  
2. Copy the database file `DAL/Database/AI_learning_platform_DB.mdf` to the appropriate path.  
3. Run the following command to update the database:
   ```bash
   dotnet ef database update
   ```
4. Copy `API/Properties/launchSettings.example.json` to `launchSettings.json`.
5. Insert your OpenAI API key in the `OpenAI__ApiKey` field of `launchSettings.json`.
6. Run the project.

---

## 🐳 Running with Docker

This project includes a Dockerfile for running the backend inside a container.

### Build and run with Docker:

```bash
docker build -t ai-backend ./AI_learning_backend
docker run -p 5217:5217 ai-backend
```

Or, if using `docker-compose.yml` at project root:

```bash
docker-compose up --build
```

> ⚠️ Note: The backend still relies on a local `.mdf` SQL Server database. Ensure LocalDB is installed and accessible **outside the container** on the host machine.

---

## Running the Application (Without Docker)

From the root directory, run:

```bash
dotnet build
dotnet run --project API
```

The API will be available at `http://localhost:5217/swagger`.

---

## Running Tests

```bash
dotnet test
```

⚠️ Note: One test fails due to dual EF provider registration (SqlServer & InMemory). In production, only SqlServer is used.  
Make sure to provide environment variables (like `OpenAI__ApiKey`) via `launchSettings.json`.

---

## Main Features

- User Management: Register, retrieve, and manage users
- Prompt Management: Submit prompts, get user prompt history, get all prompts (admin)
- Category Management: Retrieve categories and subcategories
- AI Prompt Validation: Validate prompts using OpenAI GPT-3.5
- JWT Authentication: Secure endpoints for users and admins
- Unit Testing: xUnit tests for services and controllers

---

## Security and API Key Handling

**Important: Do NOT commit your real OpenAI API key to the repository.**

To use the application securely:

- Use the placeholder `"YOUR_OPENAI_API_KEY_HERE"` in `launchSettings.example.json`
- Instruct users (or reviewers) to add their real key locally
- Share your key privately (e.g., email)

---

## Usage Examples

- Register a user: `POST /api/user/register`
- Submit a prompt: `POST /api/prompt`
- Validate a prompt: `POST /api/subCategory/validate-prompt`
- Get user prompt history: `GET /api/prompt/user/{userId}`

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your suggestions.

---

## License

MIT

For questions or issues, please open an issue on GitHub.
