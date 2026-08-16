import GoalsGrid from '@/components/GoalsGrid';
import { getGoals, Goal } from '@/storage/goals';
import { globalStyles } from '@/styles/global';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import HomeHeader from '../../components/HomeHeader';

export default function HomeScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const loadGoals = useCallback(async () => {
    const goalsData = await getGoals();
    setGoals(goalsData);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGoals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Productivity</Text>
      <HomeHeader />
      <GoalsGrid goals={goals} />
    </ScrollView>
  );
}