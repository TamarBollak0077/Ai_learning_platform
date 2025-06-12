# AI Learning Platform – Frontend

A React + TypeScript client for an AI-based learning system.

---

## Main Technologies

- **React** (with TypeScript)
- **Redux Toolkit** (state management)
- **React Router v6** (routing)
- **Axios** (API requests)
- **Vite** (fast development/build)
- **Tailwind CSS** (styling)
- **Jest** (unit testing, if present)
- **ESLint + Prettier** (optional, code quality)

---

## Project Structure

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
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Setup & Running

1. **Copy `.env.example` to `.env`**  
   And set your API URL:
   ```
   VITE_API_URL=http://localhost:5217/api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development**
   ```bash
   npm run dev
   ```

4. **Run tests (if present)**
   ```bash
   npm test
   ```

---

## Main Features

- **User registration and login** (with admin support)
- **Send prompts to AI (OpenAI)**
- **Personal prompt history**
- **Admin page – view all prompts**
- **Filter by category/user/sub-category**
- **Responsive design with Tailwind**

---

## Environment Variables

- `VITE_API_URL` – Backend API URL
- **Never put OpenAI API keys in the frontend!**

---

## Development Notes

- All API calls are in `src/api`.
- User/session management via Redux + localStorage.
- All data types are in `src/types/models.ts`.
- Do not commit secrets – only use `.env` (which is gitignored).

---

## Testing

- Unit tests (if present) are in `src/__tests__` or files with `.test.ts(x)`.
- Run tests with `npm test`.

---

## Contribution & Maintenance

- Use clear variable names, clean code, and remove unnecessary comments.
- Update `.env.example` if you add/change environment variables.

---

## Authors

- Developed by [Your Name/Team]
- For questions: [your email/contact]

---
