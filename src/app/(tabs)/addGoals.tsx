import { addGoal } from '@/storage/goals';
import { colors, globalStyles } from '@/styles/global';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
export default function AddGoalsScreen() {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [unit, setUnit] = useState('');
  const [per, setPer] = useState('');

  const handleAddGoal = async () => {
    if (!name || !goal) {
      Alert.alert('Error', 'Please enter a goal name and magnitude.');
      return;
    }

    await addGoal({
      name,
      goal: Number(goal),
      unit,
      per,
    });

    setName('');
    setGoal('');
    setUnit('');
    setPer('');

    Alert.alert('Success', 'Goal added successfully!');

    router.push('/');
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Goal</Text>

      <TextInput
        style={styles.input}
        placeholder='Goal name'
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Goal (magnitude)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={goal}
          onChangeText={setGoal}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Unit'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={unit}
          onChangeText={setUnit}
        />
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder='Per (day/week/month)'
          placeholderTextColor={colors.textSecondary}
          keyboardType='numeric'
          value={per}
          onChangeText={setPer}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddGoal}>
        <Text style={styles.buttonText}>Add Goal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});