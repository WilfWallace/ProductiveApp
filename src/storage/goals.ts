import AsyncStorage from '@react-native-async-storage/async-storage';

export type Goal = {//define attributes for goal
  id: string;
  name: string;
  goal: number;
  unit: string;
  per: string;
  createdAt: string;
};

export type GoalInput = Omit<Goal, "id" | "createdAt">; //define attributes for goal input, omits id and created at as these are generated automatically

export type GoalItemProps = { //define attributes for goal item
  goal: Goal;
  onDelete: (id: string) => void; //function that runs when goal is deleted, refreshes list of goals
};

const GOALS_KEY = 'goals'; //define key which goals are stored under in async storage

export const getGoals = async (): Promise<Goal[]> => { //async function that returns a goal array used in all goals page
  const data = await AsyncStorage.getItem(GOALS_KEY); //fetches raw json string stored under goal key
  return data ? JSON.parse(data) : []; //if data exists parse json into an array of goal if not return empty array
};

export const addGoal = async (//add goal function used in add goal page
  goal: GoalInput, //accept goal object without id or created at
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

export const deleteGoal = async (id: string): Promise<void> => { //async function that deletes a goal from storage
  const goals = await getGoals();
  const filtered = goals.filter((goal) => goal.id !== id); //filter out the goal with the matching id
  await AsyncStorage.setItem(GOALS_KEY, JSON.stringify(filtered)); //save updated list as JSON and store its
};