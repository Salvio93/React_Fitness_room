import React, { useEffect, useState } from 'react';
import { View,  Dimensions,Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { fetchData } from './api_fetch'; 

import { LineChart,BarChart } from 'react-native-chart-kit';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {customStyle} from './style';
import { useLocalSearchParams } from 'expo-router';


export default function SessionScreen() {
    const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']

    var {session_num,year, month , day } = useLocalSearchParams<{session_num; year;month;day}>();
    console.log(session_num + '- '+year +' - '+month+ ' - '+day)

    const [text, setText] = useState(`${day} - ${month} - ${year}`); //to update text 


    const handleFetchData = async() =>{


    try {
        const current_data = await fetchData("session_time","session_data",year,month,day); 
        //treat data for num_session
        setText(`${dayList[day]} - ${month} - ${year}`);

    } catch (error) {
      console.error(`Failed to fetch current data:`, error);
    }
    
  };
  


  useEffect(()=> {
    console.log('start fetch')
    handleFetchData()
    console.log('end fetch')

    const updatedStyles = { ...customStyle };
    updatedStyles.titleContainer = {
    ...updatedStyles.titleContainer,
    display: "flex",
    };
    styles = updatedStyles; 

  },)
    
  

  //chartData[dataType].datasets.data[j].set_count
  const session_i = 3;
  //access each set data dynamiclly

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title"> {text}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.titleContainer}>
            <ThemedText>aplitude pour la session {session_num} et son i éme set</ThemedText> 
        </ThemedView>
      
      




          </ParallaxScrollView>

  );
}

      
      
      
var styles = customStyle;
