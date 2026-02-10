import { supabase } from './supabase';

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }

  return data;
};

export const markOnboardingComplete = async (userId: string) => {
  return updateProfile(userId, {
    onboarding_completed: true,
    onboarding_step: 'completed',
  });
};
