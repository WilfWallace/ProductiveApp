import GoalTitle from '@/components/GoalTitle';
import HomeHeader from '@/components/HomeHeader';
import { getGoals, Goal } from '@/storage/goals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';

export default function HomeScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const loadGoals = async () => {
    const data = await getGoals();
    setGoals(data);
    console.log('Loaded goals:', data);
  };

  useFocusEffect(
    useCallback(() => {
      loadGoals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Goals</Text>
      <HomeHeader />
      <GoalTitle goals={goals} />
    </ScrollView>
  );
}