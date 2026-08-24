import AsyncStorage from '@react-native-async-storage/async-storage';

export type Goal = {//define attributes for goal
  id: string;
  name: string;
  goal: number;
  unit: string;
  per: string;
  createdAt: string;
};

const GOALS_KEY = 'goals'; //define key which goals are stored under in async storage

export const getGoals = async (): Promise<Goal[]> => { //async function that returns a goal array used in all goals page
  const data = await AsyncStorage.getItem(GOALS_KEY); //fetches raw json string stored under goal key
  return data ? JSON.parse(data) : []; //if data exists parse json into an array of goal if not return empty array
};

export const addGoal = async (//add goal function used in add goal page
  goal: Omit<Goal, 'id' | 'createdAt'>, //accept goal object without id or created at
): Promise<Goal> => {
  const goals = await getGoals(); //load array of existing goals from storage
  const newGoal: Goal = { //create new goal object
    ...goal, //assign passed paramaters to correct fields
    id: Date.now().toString(), //generate unique id using current timestamp
    createdAt: new Date().toISOString(), //add created at in ISO format
  };
  await AsyncStorage.setItem(GOALS_KEY, JSON.stringify([newGoal, ...goals])); //save updated list as JSON and store it under goals
  return newGoal; //so user can use newgoal immediately
};