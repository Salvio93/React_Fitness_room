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


export default function WeeklyScreen() {
  var { label, index, dataType, year, month, week } = useLocalSearchParams<{ label; index; dataType; year;month;week}>();
  console.log(dataType+' - '+week+' - '+year +' - '+month+' - day '+index)
    
  const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']
  const [chartData, setChartData] = useState({
    num_visits: {  data_page:0 ,labels: ['0'], datasets: [{ data: [0] }] },
    pause_time: {  data_page:0 ,labels: ['0'], datasets: [{ data: [0] }] },
    session_time: {  data_page:0 ,labels: ['0'], datasets: [{ data: [0] }] },
  });
  const [text, setText] = useState(`${dayList[index]} of ${week} - ${month} - ${year}`); //to update text 


  const handleFetchData = async(direction : string, dataType: string, frequence='dayly') =>{


    try {
      if (direction==="current"){
          //const current_data = await fetchData(0, dataType); 
          

          setChartData((prevData) => ({ 
            ...prevData,
            [dataType]: {
              data_page : index,
              labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'], //deduis de temps en seconde
              datasets: [{ data: [index,5,5,5,5,5,5,5,5,0,0,0,0,0,5,5,5,5] }],//fetch
            },
          }));

          setText(`${dayList[index]} - ${week}- ${month} - ${year}`);


      }else{

        if ((chartData[dataType].data_page != 0 && direction==="previous") || (chartData[dataType].data_page != 6 && direction ==="next")){
          var newPage = direction === 'previous' ? chartData[dataType].data_page - 1 : chartData[dataType].data_page -0 +1; //to declare as int
            const newResp = await fetchData(newPage, dataType,frequence); 
            
            setChartData((prevData) => ({
              ...prevData,
              [dataType]: {
                data_page : newPage,
                labels: newResp.labels || prevData[dataType].labels,
                datasets: [{ data: newResp.data }],
              },
            }));
            
            setText(`${dayList[newPage]} of ${week} - ${month} - ${year}`);

        }
      }
    } catch (error) {
      console.error(`Failed to fetch current data:`, error);
    }
    
  };
  


  useEffect(()=> {
    console.log('start fetch')
    handleFetchData("current",dataType)
    console.log('end fetch')

    const updatedStyles = { ...customStyle };
    updatedStyles.titleContainer = {
    ...updatedStyles.titleContainer,
    display: "flex",
    };
    styles = updatedStyles; // Reassign the updated styles

  },[dataType,index])
    
  


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> dayly charts s{week} {month} {year}</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.titleContainer,{display: dataType=="num_visits" ? 'flex' : 'none'}]}>
        <ThemedText>Nombre de visites </ThemedText> 
        <View style={[styles.chartContainer, {left:-170, bottom:-50}]}>
            <ThemedText>
                temps de seance, temps d'exo, temps pause, nombre de serie, nombre de rep, lier machine?
            </ThemedText>
              
           
            
        </View>
      </ThemedView>

      <ThemedView style={[styles.titleContainer,{display: dataType=="pause_time" ? 'flex' : 'none'}]}>
        <ThemedText>Temps de pause moyen par seance</ThemedText> 
        <View style={[styles.chartContainer, {left:-290, bottom:-50}]}>
        <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'pause_time')} 
              ></FontAwesome.Button>
              {'               '}
              <View style={styles.legendContainer}><ThemedText> {text} </ThemedText></View>

              {'                  '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'pause_time')} 
              ></FontAwesome.Button>
            </ThemedText>
              
            <LineChart
              data={chartData.pause_time}
              segments={3}
              width={Dimensions.get('window').width*0.95}
              height={300}
              yAxisSuffix={' pause'}
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
      </ThemedView>
      <ThemedView style={[styles.titleContainer,{display: dataType=="session_time" ? 'flex' : 'none'}]}>
            <ThemedText>Temps de seance en moyenne</ThemedText> 

            <View style={[styles.chartContainer, {left:-230, bottom:-50}]}>
            <ThemedText>
                  <FontAwesome.Button
                    name="chevron-left"
                    backgroundColor="green"
                    size={10}
                    onPress={() => handleFetchData('previous', 'session_time')} 
                  ></FontAwesome.Button>
                  {'                  '}
                  <View style={styles.legendContainer}><ThemedText> {text}</ThemedText></View>

                  {'                       '}
                  <FontAwesome.Button
                    name="chevron-right"
                    backgroundColor="green"
                    size={10}
                    onPress={() => handleFetchData('next', 'session_time')} 
                  ></FontAwesome.Button>
                </ThemedText>
                  
                <LineChart
                    data={chartData.session_time} 
                    segments={3}
                    width={Dimensions.get('window').width*0.95}
                    height={300}
                    yAxisSuffix={' session'}
                    fromZero
                    chartConfig={{
                        decimalPlaces: 0,
                        backgroundGradientFrom: 'darkblue',
                        backgroundGradientTo: 'blue',
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    }}
                    bezier
                />
              </View>
          </ThemedView>
      
      





    </ParallaxScrollView>
  );
}

      
    /**/
      
      
var styles = customStyle;
