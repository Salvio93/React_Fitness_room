import { Image, StyleSheet, Platform, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LineChart,BarChart } from 'react-native-chart-kit';
import { fetchData } from './api_fetch'; 
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native';
import {customStyle} from './style';
import { HelloWave } from '@/components/HelloWave';
import data from './test.json';

export default function HomeScreen() {

  const [chartData, setChartData] = useState({
    air_quality: {  temperature:0, humidity : 0, particulate : 0  },
    exo_time: {  Json_data : [{ }]  },

  });

  const handleFetchData = async(dataType : string) =>{
    try {
      if (dataType == "air_quality"){
        var current_data = await fetchData(dataType); 
          setChartData((prevData) => ({ 
            ...prevData,
            [dataType]: {
              temperature : current_data.env_data.temperature,
              humidity : current_data.env_data.humidity,
              particulate : current_data.env_data.particulate,
            },
          }));
      }
      if (dataType=="exo_time"){
          var current_data_exo = await fetchData(dataType,"last"); 
          setChartData((prevData) => ({ 
            ...prevData,
            [dataType]: {
              Json_data : current_data_exo,
            },
          }));
        }
         
      
          
    } catch (error) {
      console.error(`Failed to fetch current data:`, error);
    }
  };

  
  useEffect(()=> {
    console.log('start fetch')
    handleFetchData("air_quality")
    //handleFetchData("exo_time")

    console.log('end fetch')
  },[])
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> Bonjour User</ThemedText>
        <HelloWave />
      </ThemedView>



      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Données env</ThemedText>
        <ThemedText>
          température : <ThemedText type="defaultSemiItalic">{data.body.height}</ThemedText> {'         '}
          humidité : <ThemedText type="defaultSemiItalic">{data.body.weight}</ThemedText>
        </ThemedText>

        <ThemedText>
          particule : <ThemedText type="defaultSemiItalic">{data.body.age}</ThemedText>{'                 '}
        </ThemedText>
      </ThemedView>



      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Derniere série</ThemedText>
        



      </ThemedView>
    </ParallaxScrollView>


  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },chartContainer: {
    position: 'relative', // Keep the overlay positioned relative to this container
    height: 300, 
    marginBottom: 16, // Add space between this chart and the next component
    left:-55,
  },
});
