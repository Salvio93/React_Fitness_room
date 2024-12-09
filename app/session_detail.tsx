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
  const sessionSets = parsedJsonData?.exo_time_day?.sessions?.[session_num - 1]?.sets || [];
  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">{datatext}</ThemedText>
        <View style={styles.stepContainer}>
          <ThemedText>
            Amplitude for session {session_num} with {sessionSets.length} set(s)
          </ThemedText>

          {sessionSets.length > 0 ? (
            sessionSets.map((set, index) => (
              <View key={`chart-${session_num}-${index}`} style={styles.stepContainer}>
                <ThemedText>Set {index + 1}</ThemedText>
                <LineChart
                  data={{
                    labels: set?.times || [],
                    datasets: [
                      {
                        data: set?.distance || [],
                      },
                    ],
                  }}
                  segments={3}
                  width={Dimensions.get('window').width * 0.95}
                  height={300}
                  yAxisSuffix=""
                  fromZero
                  chartConfig={{
                    barPercentage: .68,
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientTo: '#08130D',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  }}
                  bezier
                />
              </View>
            ))
          ) : (
            <ThemedText>No data available for this session</ThemedText>
          )}
        </View>
      </ThemedView>
    </ParallaxScrollView>

  );
}

      
      
      
var styles = customStyle;
