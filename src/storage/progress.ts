import AsyncStorage from '@react-native-async-storage/async-storage';

export type Progress = { //defines Progress attributes
  id: string;
  progress: number;
  goal: string;
  createdAt: string;
};

const PROGRESS_KEY = 'progress'; //all progress is stored under this key in async storage

type ProgressStore = { //defines nested structure so progress is stored per goal per day
  [goalId: string]: {
    [date: string]: Progress[];
  };
};

export const getProgress = async (): Promise<ProgressStore> => { //fetching entire store
  const data = await AsyncStorage.getItem(PROGRESS_KEY);//fetches raw json string
  return data ? JSON.parse(data) : {}; //return empty object if no data
};

export const addProgress = async ( //accept progress withou id or created at
  progress: Omit<Progress, 'id' | 'createdAt'>
): Promise<Progress> => {
  const store = await getProgress(); //load entire store

  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD todays date
  const existingProgress = store[progress.goal]?.[date]?.[0]; //check if already a progress entry for date and goal

  const newProgress: Progress = { //if entry already exists today, reuse its id and created at, if not, create a new one
    ...progress,
    id: existingProgress?.id ?? Date.now().toString(),
    createdAt: existingProgress?.createdAt ?? new Date().toISOString(),
  };

  // if goal has never been stored before, create its object
  if (!store[progress.goal]) {
    store[progress.goal] = {};
  }

  // if dates for this goal have not been created yet, create an empty array
  if (!store[progress.goal][date]) {
    store[progress.goal][date] = [];
  }

  // Keep one editable progress value per goal and date.
  store[progress.goal][date] = [{
    ...newProgress, //store all progress entrys to associated fields bar progress
    progress: newProgress.progress + (existingProgress?.progress ?? 0), //store total progress
  }];

  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(store)); //save to async storage using progresskey and convert to json

  return newProgress; //allows caller to update UI immediately
};

// fetch progress for a specific goal + date
export const getProgressFor = async (
  goalId: string,
  date: string
): Promise<Progress[]> => {
  const store = await getProgress(); //fetch the entire store

  if (!store[goalId]) return []; //if goal or date doesnt exist, return empty array
  if (!store[goalId][date]) return [];

  return store[goalId][date]; //otherwise return Progress object array stored here
};