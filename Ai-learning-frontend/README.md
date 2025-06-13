# AI Learning Platform – Frontend

A React + TypeScript client for an AI-based learning system.

---

## 🛠️ Main Technologies

- **React** (with TypeScript)
- **Redux Toolkit** (state management)
- **React Router v6** (routing)
- **Axios** (API requests)
- **Vite** (fast development/build)
- **Tailwind CSS** (styling)
- **Jest** (unit testing, if present)
- **ESLint + Prettier** (optional, code quality)
- **Docker** (optional containerization)

---

## 📁 Project Structure

```
Ai-learning-frontend/
│
├── src/
│   ├── api/                # API services (axios)
│   ├── components/         # Shared components (NavBar, etc.)
│   ├── pages/              # Main pages (Dashboard, AdminPage, Login, Signup, HomePage)
│   ├── redux/              # Redux slices and store
│   ├── types/              # TypeScript types (models.ts)
│   └── App.tsx             # Main app component
│
├── public/
├── .env.example            # Example environment variables
├── Dockerfile              # Docker configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Setup & Running Locally

### 1. Copy `.env.example` to `.env`

Set your backend API URL:
```env
VITE_API_URL=http://localhost:5217/api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development

```bash
npm run dev
```

### 4. Run tests (if present)

```bash
npm test
```

---

## 🐳 Running with Docker

To build and run the frontend using Docker:

```bash
docker build -t ai-frontend ./Ai-learning-frontend
docker run -p 5173:5173 ai-frontend
```

Or if using Docker Compose from the root directory:

```bash
docker-compose up --build
```

> Make sure the backend is running and accessible at the URL defined in your `.env`.

---

## 🔐 Environment Variables

- `VITE_API_URL` – Backend API URL (e.g., http://localhost:5217/api)
- **Do not include API keys or secrets in frontend `.env` files**

---

## 🔎 Development Notes

- All API calls are located in `src/api`
- User/session state is managed via Redux and localStorage
- All shared types and models are in `src/types/models.ts`
- Do not commit sensitive information – `.env` is in `.gitignore`

---

## 🧪 Testing

- Unit tests (if present) live in `src/__tests__` or files ending in `.test.ts(x)`
- Run tests with:
  ```bash
  npm test
  ```

---

## 🙌 Contribution & Maintenance

- Use clear variable names and maintain clean, readable code
- Remove unused code and console logs
- Update `.env.example` when adding new environment variables

---

## 👩‍💻 Authors

- Developed by [Your Name/Team]
- For questions: [your email/contact]
