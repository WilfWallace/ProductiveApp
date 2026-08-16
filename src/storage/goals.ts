import AsyncStorage from '@react-native-async-storage/async-storage';

export type Goal = {
  id: string;
  name: string;
  goal: number;
  unit: string;
  per: string;
  createdAt: string;
};

const GOALS_KEY = 'goals';

export const getGoals = async (): Promise<Goal[]> => {
  const data = await AsyncStorage.getItem(GOALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addGoal = async (
  goal: Omit<Goal, 'id' | 'createdAt'>,
): Promise<Goal> => {
  const goals = await getGoals();
  const newGoal: Goal = {
    ...goal,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  await AsyncStorage.setItem(GOALS_KEY, JSON.stringify([newGoal, ...goals]));
  return newGoal;
};