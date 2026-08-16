import { Goal } from '@/storage/goals';
import { globalStyles } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';
import PeriodGrid from './PeriodGrid';

type GoalTitleProps = {
    goals: Goal[];
};

export default function GoalsGrid({ goals }: GoalTitleProps) {
  return (
    <View style={styles.grid}>
      <Text style={globalStyles.sectionTitle}>Goals</Text>
            {goals.length === 0 ? (
              <Text style={globalStyles.empty}>No goals logged yet.</Text>
            ) : (
              goals
                .map((goal) => (
                  <PeriodGrid
                    key={goal.id}
                    name={goal.name}
                    goal={goal.goal}
                    unit={goal.unit}
                    per={goal.per}
                  />
                ))
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    gap: 20,
  },
});