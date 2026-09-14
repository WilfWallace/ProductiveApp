import { Goal } from '@/storage/goals';
import { addProgress } from '@/storage/progress';
import { globalStyles } from '@/styles/global';
import { Text, View } from 'react-native';
import GoalItem from './GoalItem';

type GoalTitleProps = {
    goals: Goal[];
    onDelete: () => void; //function that runs when goal is deleted, refreshes list of goals
};

export default function GoalTitle({ goals, onDelete }: GoalTitleProps) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Goals</Text>
      {goals.length === 0 ? (
        <Text style={globalStyles.empty}>No goals logged yet.</Text>
      ) : (
        goals.map((goal) => (
          <GoalItem
            key={goal.id}
            goalId={goal.id}
            name={goal.name}
            goal={goal.goal}
            unit={goal.unit}
            per={goal.per}
            addProgress={addProgress}
            onDelete={onDelete} 
          />
        ))
      )}
    </View>
  );
}
