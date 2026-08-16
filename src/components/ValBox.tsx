import { StyleSheet, Text, View } from 'react-native';

type ValBoxProps = {
  value: string;
  color: string;
  goal: number;
  pos: number; //used to determine the weeks shown and identify which value must be updated when a days values are inputted
};

export default function ValBox({
  value,
  color,
  goal,
  pos,
}: ValBoxProps) {
  return (
    // this must be edited to show an appropiatly graded colour with value of goal acheived in front, need only one text
    <View style={[styles.card, { backgroundColor: color }]}>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

//
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213e',
    borderRadius: 4,
    padding: 2,
    width: '5%',
    aspectRatio: 1,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D0D0D0',
    marginTop: 4,
  },
});