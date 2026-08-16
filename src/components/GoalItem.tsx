import { StyleSheet, Text, View } from 'react-native';

type GoalItemProps = {
  name: string;
  goal: number;
  unit: string;
  per: string;
};

export default function GoalItem({
  name,
  goal,
  unit,
  per,
}: GoalItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.goalItems}>
        {goal} {unit}/{per}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  goalItems: {
    fontSize: 13,
    color: '#a0a0b0',
    marginTop: 4,
  },
});