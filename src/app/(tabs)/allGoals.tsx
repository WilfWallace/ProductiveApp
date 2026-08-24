import GoalTitle from '@/components/GoalTitle';
import HomeHeader from '@/components/HomeHeader';
import { getGoals, Goal } from '@/storage/goals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function AllGoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([]); //creates an array goals that starts offf empty and updates using setGoals

  const loadGoals = useCallback(async () => { //so react doesnt recreate it on every render
    const goalsData = await getGoals(); //fetches saved goals from async storage
    setGoals(goalsData); //updates state, ui refreshes w new goals
  }, []);

  useFocusEffect(//calls load goals when screen focuses
    useCallback(() => {
      loadGoals();
    }, []),
  );

  return (//displays goals using GoalTitle object in nice grid format, takes in goals
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Goals</Text>
      <HomeHeader />
      <GoalTitle 
      goals={goals}
      />
    </ScrollView>
  );
}