import { Goal } from '@/storage/goals';
import { globalStyles } from '@/styles/global';
import { Text, View } from 'react-native';
import GoalItem from './GoalItem';

type GoalTitleProps = {
    goals: Goal[];
};

export default function GoalTitle({ goals }: GoalTitleProps) {
  return (
    <View style={{ marginTop: 30 }}>
    <Text style={globalStyles.sectionTitle}>Goals</Text>
      {goals.length === 0 ? (
        <Text style={globalStyles.empty}>No goals logged yet.</Text>
      ) : (
        goals
          .map((goal) => (
            <GoalItem
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
