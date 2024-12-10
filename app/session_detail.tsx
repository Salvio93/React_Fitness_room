import React, { useEffect, useState } from 'react';
import { View,  Dimensions,Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LineChart,BarChart } from 'react-native-chart-kit';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {customStyle} from './style';
import { useLocalSearchParams } from 'expo-router';


export default function SessionScreen() {
  const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']

  var {session_num,Json_data,year, month , day } = useLocalSearchParams<{session_num;Json_data; year;month;day}>();
  console.log(session_num + '-'+'- '+year +' - '+month+ ' - '+day)


  const [chartData, setChartData] = useState({
    parsedJsonData: [{ }],
  });
  const [datatext, setdataText] = useState(`${day} - ${month} - ${year}`);


  const handleFetchData = async() =>{
    try {
      var JsonData = JSON.parse(Json_data);
      console.log('Parsed JSON Data:', JsonData);  
      setChartData((prevData) => ({ 
        ...prevData,
        parsedJsonData: JsonData
      }));
      setdataText(`${dayList[day]} ${JsonData.day} ${month} ${year}`);

      
    } catch (error) {
      console.error('Failed to parse JSON data:', error);
    }
  };
  


  useEffect(()=> {
    console.log('start fetch')
    handleFetchData()
    console.log('end fetch')
  },[])

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">{datatext}</ThemedText>
        <View style={styles.stepContainer}>
        <ThemedText>Amplitude for session {session_num} with {chartData.parsedJsonData?.sessions?.[session_num - 1]?.sets?.length} set</ThemedText>

          {chartData.parsedJsonData?.sessions?.[session_num - 1]?.sets?.length > 0 ? (
            
            chartData.parsedJsonData?.sessions?.[session_num - 1]?.sets.map((set, index) => (
              <View key={`chart-${session_num}-${index}`} style={[styles.stepContainer,{left:-10}]}>
                <ThemedText>Set {index + 1} Weight {set?.weight}</ThemedText>
                <LineChart
                  data={{
                    labels: set?.times || [0],
                    datasets: [
                      {
                        data: set?.distance || [0],
                      },
                    ],
                  }}
                  segments={4}
                  width={Dimensions.get('window').width * 0.95}
                  height={300}
                  yAxisSuffix=""
                  fromZero
                  withDots= {false}
                  withInnerLines = {false}
                  chartConfig={{
                    backgroundGradientFrom: '#1E2923',
                    backgroundGradientTo: '#08480D',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(120, 255, 255, ${opacity})`,
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16
                  }}
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
