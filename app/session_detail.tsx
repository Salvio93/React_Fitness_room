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

  var {session_num,Json_data,year, month , day } = useLocalSearchParams<{session_num;Json_data; year;month;day}>();
  console.log(session_num + '-'+'- '+year +' - '+month+ ' - '+day)


  const [datatext, setdataText] = useState(`${day} - ${month} - ${year}`);

  const handleFetchData = async() =>{


    try {

      //treat data for num_session of Json_data
        setdataText(`${dayList[day]}  ${parsedJsonData.exo_time_day.day} - ${month} - ${year} -`);

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
    
  var parsedJsonData = JSON.parse(Json_data)
  console.log( parsedJsonData.exo_time_day)
  //Json_data.exo_time_day.session[j].sets.length
  const session_i = parsedJsonData.exo_time_day.sessions[session_num-1].sets
  //access each set data dynamiclly

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title"> {datatext}</ThemedText>


            <View style={[styles.chartContainer, {left:-350, bottom:-50}]}>
            <ThemedText>aplitude pour la session {session_num} et son {session_i.length} éme set</ThemedText> 
                {Array.from({ length: session_i.length }).map((_, index) => (
                  <View key={`button-${index}`}>
                    
                      <LineChart
                        data={{ labels : parsedJsonData.exo_time_day.sessions[session_num-1].sets[index].times, datasets: [{ data: parsedJsonData.exo_time_day.sessions[session_num-1].sets[index].distance }]  }}
                        segments={3}
                        width={Dimensions.get('window').width*0.95}
                        height={300}
                        yAxisSuffix={''}
                        fromZero
                        chartConfig={{
                          decimalPlaces: 0,
                          backgroundGradientFrom: 'darkblue',
                          backgroundGradientTo: 'blue',
                          color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        bezier
                      />
                  </View>
                ))}
              </View>



        </ThemedView>


    </ParallaxScrollView>

  );
}

      
      
      
var styles = customStyle;
