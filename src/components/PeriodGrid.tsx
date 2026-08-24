import { globalStyles } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';
import ValBox from './ValBox';

//what gets passed into this object
type GoalItemProps = {
  name: string;
  goal: number;
  goalID: string;
  unit: string;
  per: string;
};

export default function PeriodGrid({ name, goal, goalID, unit, per }: GoalItemProps) {
  //displays nice title before each progress tracker to identify goal, name, etc
  //passes in default red colour, default 0 value, goal id so can locate what the goal is when fetching real values, position in 3 
  //week "calander" so can calculate date and fetch real value to display
  return (
    <View style={styles.container}>
      <Text style={globalStyles.sectionTitle}>{name} {goal} {unit} per {per}</Text> 
      <View style={styles.grid}>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {0} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {1} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {2} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {3} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {4} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {5} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {6} goal = {goal}/>
      </View>
      <View style={styles.grid}>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {7} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {8} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {9} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {10} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {11} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {12} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {13} goal = {goal}/>
      </View>
      <View style={styles.grid}>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {14} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {15} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {16} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {17} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {18} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {19} goal = {goal}/>
        <ValBox value="0" color="#880000" goalID = {goalID} pos = {20} goal = {goal}/>
      </View>
    </View>
  );
}
//base layout
const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 10,
  },
  container: {
    backgroundColor: '#162130',
    borderRadius: 10,
    padding: 5,
  },
});