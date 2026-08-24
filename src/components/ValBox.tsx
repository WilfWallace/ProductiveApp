import { getProgressFor, Progress } from '@/storage/progress';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//what gets passed into this object
type ValBoxProps = {
  value: string; //base value of 0
  color: string; //base red colour
  goalID: string; //needed to find which type of goal this is to be able to fetch the correct value from storage
  pos: number; //used to determine the weeks shown and identify which value must be updated when a 
  //days values are inputted and also used to figure out what date to use to fetch value
  goal: number; //used to determine the colour of the box based on how much of the goal has been acheived
};

export default function ValBox({
  value,
  color,
  goalID, 
  pos,
  goal
}: ValBoxProps) {


  const today = new Date();//gets todays date
  const day = today.getDay(); //Sunday is originally 0 in this, i want it to be 7
  const adjustedDay = (day + 6) % 7;// Adjust day to make Sunday the end of the week and Monday the start
  const isDay = pos - 14 === adjustedDay; //check if current box is todays date

  const boxDate = new Date();//calculate the date of specific box based on its position in the grid, 
  boxDate.setDate(today.getDate() + (pos - 14 - adjustedDay)); //with pos 0 being (14+however many days have passed this week) ago

  const [progress, setProgress] = useState<Progress[]>([]); //create react state variabble, initialised as empty array 
  //of progress objects, setprogress is function to update state
  const loadProgress = async () => { //function to fetch progress value to display
    const data = await getProgressFor(goalID, boxDate.toISOString().split('T')[0]); // Fetch progress for 
    // //this specific valbox
    setProgress(data); //update and rerender to show correct values
  };


  useEffect(() => { //loads progress for specific goal and date automatically
    loadProgress();
  }, [goalID]);

  let cardColor = color; //initialise box colour
  const displayText = String(progress[0]?.progress ?? value); //display the progress value if it exists, 
  //otherwise display the default value 0
  switch (true) { //statement to have 8 different stages of progress and 8 differnt colours
    case 1.0 <= Number(displayText)/goal:
    cardColor = '#006400'; 
    break;
    case 0.875 <= Number(displayText)/goal: 
    cardColor = '#2E5A00'; 
    break;
    case 0.75 <= Number(displayText)/goal:
    cardColor = '#556B00'; 
    break;
    case 0.625 <= Number(displayText)/goal: 
    cardColor = '#8A7A00'; 
    break;
    case 0.5 <= Number(displayText)/goal:
    cardColor = '#CD8500'; 
    break;
    case 0.375 <= Number(displayText)/goal: 
    cardColor = '#B85C00'; 
    break;
    case 0.25 <= Number(displayText)/goal:
    cardColor = '#A23A00'; 
    break;
    case 0.125 <= Number(displayText)/goal: 
    cardColor = '#880000'; 
    break;
    default:
    cardColor = color; //display red card color by default
    break;
  }

  //display correct value
  //shows box with correct colour and correct border if the box is todays box
  return (
    <View style={[styles.card, { backgroundColor: cardColor }, {borderColor: isDay ? '#111111' : 'transparent', borderWidth: isDay ? 6 : 0}]}> 
      <Text style={styles.value}>{displayText}</Text> 
    </View>
    );
}



//default layout
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213e',
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'transparent',
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