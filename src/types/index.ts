export interface UserProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  location: string;
  budget_min: number;
  budget_max: number;
  move_in_date: string;
  cleanliness: number;
  noise_tolerance: number;
  guest_frequency: number;
}

export interface OnboardingData {
  name?: string;
  age?: number;
  gender?: string;
  location?: string;
  budget_min?: number;
  budget_max?: number;
  move_in_date?: string;
  cleanliness?: number;
  noise_tolerance?: number;
  guest_frequency?: number;
}
