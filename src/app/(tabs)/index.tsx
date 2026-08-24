import GoalsGrid from '@/components/GoalsGrid';
import { getGoals, Goal } from '@/storage/goals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import HomeHeader from '../../components/HomeHeader';

export default function HomeScreen() {
  const [goals, setGoals] = useState<Goal[]>([]); //creates an array goals that starts offf empty and updates using setGoals

  const loadGoals = useCallback(async () => { //so react doesnt recreate it on every render
    const goalsData = await getGoals(); //fetches saved goals from async storage
    setGoals(goalsData); //updates state, ui refreshes w new goals
  }, []);

  useFocusEffect( //calls load goals when screen focuses
    useCallback(() => {
      loadGoals();
    }, []),
  );

  //create nice layed out home screen using goals grid container that gets passed in goals array
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Productivity</Text>
      <HomeHeader />
      <GoalsGrid goals={goals} />
    </ScrollView>
  );
}