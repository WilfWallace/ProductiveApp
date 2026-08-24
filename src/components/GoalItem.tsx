import type { Progress } from '@/storage/progress';
import { colors } from '@/styles/global';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

//what gets passed into object
type GoalItemProps = {
  goalId: string; //used to identify goal
  name: string; 
  goal: number; //goal magnitude
  unit: string; 
  per: string;
  addProgress: ( //function that stores progress in async storage
    progress: Omit<Progress, 'id' | 'createdAt'>
  ) => Promise<Progress>;
};

export default function GoalItem({
  goalId,
  name,
  goal,
  unit,
  per,
  addProgress,
}: GoalItemProps) {
  const [progress, setProgress] = useState(''); //holds text typed into the input, starts empty

  const handleAddProgress = async () => { //runs when addprogress is clicked
    const numericProgress = Number(progress); //convert input to a number

    if (!name.trim() || Number.isNaN(numericProgress)) {
      Alert.alert('Error', 'Please enter a valid progress value.');// if goal name is empty or progress isnt a number, show error
      return;
    }

    await addProgress({ //calls addprogress with paramaters goalID and progress, saves to async storage
      goal: goalId,
      progress: numericProgress,
    });

    setProgress(''); //resets form 

  };

  //UI made up of a row of values and a form, need to update to look a lot nicer
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.goalItems}>
        {goal} {unit}/{per}
      </Text>
      <TextInput
        style={[styles.input, styles.rowInput]}
        placeholder="Enter your progress..."
        placeholderTextColor={colors.textSecondary}
        value={progress}
        onChangeText={setProgress}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProgress}>
        <Text style={styles.buttonText}>Add Progress</Text>
      </TouchableOpacity>
    </View>
  );
}

//GUI
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