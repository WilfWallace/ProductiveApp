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
  const [name, setName] = useState('');//creates an array name that starts offf empty and updates using setName
  const [goal, setGoal] = useState(''); //creates an array goals that starts offf empty and updates using setGoals
  const [unit, setUnit] = useState('');//creates an array unit that starts offf empty and updates using setUnit
  const [per, setPer] = useState('');//creates an array per that starts offf empty and updates using setPer

  const handleAddGoal = async () => { //runs when user presses add goal
    if (!name || !goal) {
      Alert.alert('Error', 'Please enter a goal name and magnitude.'); //displays message if dont enter goal name and magnitude field
      return;
    }

    await addGoal({ //calls add goal with these paramaters to be written to storage
      name,
      goal: Number(goal),
      unit,
      per,
    });

    setName(''); //reset the form fields
    setGoal('');
    setUnit('');
    setPer('');

    Alert.alert('Success', 'Goal added successfully!');

    router.push('/');
  };

  //UI set up as a form onchangetexts calls set function and onpress calls handleADDGoal function
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

//design
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