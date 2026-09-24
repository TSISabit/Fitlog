export interface Workout {
  id: string | number;
  name: string;
  category: string[];
  equipment: string;
  duration: number | string;
  calories?: number | string;
  calorie?: number | string;
  caloriesBurned?: number | string;
  rating: number;
  difficulty?: string;
  sets?: number;
  reps?: string;
  image?: string;
  instructions?: string[];
  isDone?: boolean;
}