import React, { useEffect, useState } from 'react';
import { View,  Dimensions,Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LineChart,BarChart } from 'react-native-chart-kit';
import { fetchData } from './api_fetch'; 
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {customStyle} from './style';
import { useLocalSearchParams } from 'expo-router';


export default function DailyScreen() {
  var { label, index, dataType, year, month, week } = useLocalSearchParams<{ label; index; dataType; year;month;week}>();
  console.log(dataType+' - '+week+' - '+year +' - '+month+' - day '+index)
    
  const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']
  const [text, setText] = useState(`${dayList[index]} of ${week} - ${month} - ${year}`); 
  const [datatext, setdataText] = useState(`random data`); 


  const handleFetchData = async(dataType: string, frequence='daily') =>{


    try {
        const current_data = await fetchData(dataType,frequence,year,month,week,index); 
        //treat data

        setdataText(`${current_data.exo_time_day.day_avg}`);

    } catch (error) {
      console.error(`Failed to fetch current data:`, error);
    }
    
  };
  

  useEffect(()=> {
    console.log('start fetch')
    handleFetchData(dataType)
    console.log('end fetch')

    const updatedStyles = { ...customStyle };
    updatedStyles.titleContainer = {
    ...updatedStyles.titleContainer,
    display: "flex",
    };
    styles = updatedStyles; // Reassign the updated styles

  })
    
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> {text}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText>Nombre de visites à la date du {text} </ThemedText> 
        <View style={[styles.chartContainer, {left:-170, bottom:-50}]}>
            <ThemedText>
                temps de seance, temps d'exo, temps pause, nombre de serie, nombre de rep, lier machine?
                {datatext}
            </ThemedText>
              
           
            
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

      
      
      
var styles = customStyle;
