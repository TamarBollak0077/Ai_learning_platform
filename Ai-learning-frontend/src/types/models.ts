export interface Category {
  id: number | string;
  name: string;
}
export interface SubCategory {
  id: number | string;
  name: string;
}
export interface User {
  id: number | string;
  name?: string;
}
export interface PromptHistoryItem {
  id: number | string;
  prompt: string;
  response?: string;
}
export interface Prompt {
  id: number | string;
  userId: number | string;
  categoryId: number | string;
  subCategoryId: number | string;
  prompt: string;
  response?: string;
  createdAt: string;
}
export interface PromptsState {
  list: Prompt[];
  loading: boolean;
  error?: string;
}

export interface RootState {
  user: {
    user: User | null;
  };
  prompts: PromptsState;
  // ...סלייסים נוספים אם יש...
}