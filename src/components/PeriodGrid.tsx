import { globalStyles } from '@/styles/global';
import { StyleSheet, Text, View } from 'react-native';
import ValBox from './ValBox';

type GoalItemProps = {
  name: string;
  goal: number;
  unit: string;
  per: string;
};

export default function PeriodGrid({ name, goal, unit, per }: GoalItemProps) {
  return (
    <View style={styles.container}>
      <Text style={globalStyles.sectionTitle}>{name}</Text>
      <View style={styles.grid}>
        <ValBox value="0" color="#006600" goal = {goal} pos = {0}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {1}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {2}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {3}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {4}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {5}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {6}/>
      </View>
      <View style={styles.grid}>
        <ValBox value="0" color="#006600" goal = {goal} pos = {7}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {8}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {9}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {10}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {11}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {12}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {13}/>
      </View>
      <View style={styles.grid}>
        <ValBox value="0" color="#006600" goal = {goal} pos = {14}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {15}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {16}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {17}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {18}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {19}/>
        <ValBox value="0" color="#006600" goal = {goal} pos = {20}/>
      </View>
    </View>
  );
}

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