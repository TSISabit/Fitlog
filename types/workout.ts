export interface Workout {
  id: string | number;
  name: string;
  category: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  difficulty?: string;
  sets?: number;
  reps?: string;
  image?: string;
  instructions?: string[];
  isDone?: boolean;
}