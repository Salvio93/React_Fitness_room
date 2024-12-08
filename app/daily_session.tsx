import React, { useEffect, useState } from 'react';
import { View,  Dimensions,Alert, KeyboardAvoidingView, Platform,ScrollView  } from 'react-native';
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
  const router = useRouter();

  const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']

  const [chartData, setChartData] = useState({
    exo_time: {  data_page:0, sessions_count : 0, Json_data : [{  }]  },
    num_visits: {  data_page:0, sessions_count : 0, Json_data : [{  }]  },

  });
  const [text, setText] = useState(`${dayList[index]} of ${week} - ${month} - ${year}`); //to update text 
  const [datatext, setdataText] = useState(`init data`); 


  const handleFetchData = async(direction : string, dataType: string, frequence='daily') =>{


    try {
      if (direction==="current"){
          var current_data = await fetchData(dataType,frequence,year,month,week,index); 
          console.log(current_data)

          //treat data
          setChartData((prevData) => ({ 
            ...prevData,
            [dataType]: {
              data_page : index,
              sessions_count : current_data.exo_time_day.sessions.length,
              Json_data : current_data,
            },
          }));
          setText(`${dayList[index]} - ${week}- ${month} - ${year}`);
          setdataText(`${current_data.exo_time_day.sessions.length} - ${current_data.exo_time_day.day}`);


      }else{

        if ((chartData[dataType].data_page != 0 && direction==="previous") || (chartData[dataType].data_page != 6 && direction ==="next")){
          var newPage = direction === 'previous' ? chartData[dataType].data_page - 1 : chartData[dataType].data_page -0 +1; //to declare as int
          var newResp = await fetchData(dataType,frequence,year,month,week,newPage); 

            
            //treat data

            setChartData((prevData) => ({ 
              ...prevData,
              [dataType]: {
                data_page : newPage,
                sessions_count : newResp.exo_time_day.sessions.length,
                Json_data : newResp,

              },
            }));
            setText(`${dayList[newPage]} of ${week} - ${month} - ${year}`);
            setdataText(`${chartData.exo_time.Json_data.exo_time_day.sessions.length} - ${newResp.exo_time_day.day}`);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch current data:`, error);
    }
    
  };
  

  const handleBarPress = (session_num,Json_data, year,month,day) => {
    router.push({
      pathname: '/session_detail',
      params: {session_num,Json_data: JSON.stringify(Json_data), year,month,day },
    });
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

  },[index])
    

  //Json_data.exo_time_day.session.length
  // for each session, data of session
  return (

    
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> {text}</ThemedText>
      </ThemedView>

      
      <ThemedView style={[styles.titleContainer,{display: dataType=="exo_time" ? 'flex' : 'none'}]}>
            
            <ThemedText>Temps de seance par session à la date du {text}</ThemedText> 
            <View style={[styles.chartContainer, {left:-310, bottom:-60}]}>
              <ThemedText>
                    <FontAwesome.Button
                      name="chevron-left"
                      backgroundColor="green"
                      size={10}
                      onPress={() => handleFetchData('previous', 'exo_time')} 
                    ></FontAwesome.Button>
                    {'                                       '}

                    {'                                       '}
                    <FontAwesome.Button
                      name="chevron-right"
                      backgroundColor="green"
                      size={10}
                      onPress={() => handleFetchData('next', 'exo_time')} 
                    ></FontAwesome.Button>
              </ThemedText>

              <View >
                <ThemedText>{datatext}</ThemedText>

                {Array.from({ length: chartData.exo_time.Json_data.exo_time_day?.sessions?.length ?? "0"}).map((_, index) => (
                  <View key={`button-${index}`}>
                    <ThemedText>Detail session {index + 1}</ThemedText>
                    {/*debut session: {Json_data.exo_time_day.session_duration}  fin dession: {chartData.exo_time.datasets[index+1].end} */}  
                    <FontAwesome.Button
                      name="forward"
                      backgroundColor="red"
                      size={10}
                      onPress={() => handleBarPress(index + 1,chartData.exo_time.Json_data, year, month, chartData.exo_time.data_page)}
                    >
                    </FontAwesome.Button>
                  </View>
                ))}
              </View>
            </View>
          </ThemedView>
      
      <ThemedView style={[styles.titleContainer,{display: dataType=="num_visits" ? 'flex' : 'none'}]}>
        <ThemedText>Information de seance à la date du {text} </ThemedText> 
        <View style={[styles.chartContainer, {left:-350, bottom:-50}]}>
            <ThemedText>
              Nombre de seance :   {chartData.num_visits.Json_data.exo_time_day?.sessions?.length ?? "0"} {"\n"} 
            </ThemedText>

            <View>
                {Array.from({ length: chartData.num_visits.Json_data.exo_time_day?.sessions?.length ?? "0"}).map((_, indexj) => (
                  <View key={`button-${indexj}`}>
                    <ThemedText>  
                      Nombre de serie pour la seance {indexj+1} : {chartData.num_visits.Json_data.exo_time_day?.sessions[indexj]?.sets?.length  ?? "0"}
                      temps de la seance {indexj+1}:{chartData.num_visits.Json_data.exo_time_day?.sessions[indexj]?.session_duration ?? "0"}

                    </ThemedText>
                    {Array.from({ length: chartData.num_visits.Json_data.exo_time_day?.sessions[indexj]?.sets?.length  ?? "0" }).map((_, indexi) => (
                      <View key={`button-${indexi}`}>
                        <ThemedText>
                          Detail seance {indexj + 1}
                          <FontAwesome.Button
                            name="forward"
                            backgroundColor="red"
                            size={10}
                            onPress={() => handleBarPress(indexj + 1,chartData.num_visits.Json_data, year, month, chartData.num_visits.data_page)}
                          >
                          </FontAwesome.Button>
                          Nombre de poids et de rep pour serie {indexi+1} de seance {indexj+1} : {chartData.num_visits.Json_data.exo_time_day?.sessions[indexj]?.sets[indexi]?.weight ?? "0"} - {chartData.num_visits.Json_data.exo_time_day?.sessions[indexj]?.sets[indexi]?.rep ?? "0"} 
                          temps de serie {indexi+1}: {chartData.num_visits.Json_data.exo_time_day?.sessions[indexj]?.sets[indexi]?.set_time ?? "0"}
                        </ThemedText>
                        
                      </View>
                    ))}
                  </View>
                ))}
              </View>
             
              {/*                temps de pause i : {chartData.exo_time_day.sessions[session_j].sets[session_i].set_end - chartData.exo_time_day.sessions[session_j].sets[session_i+1].set_begin} {"\n"} */}

        </View>
      </ThemedView>

    </ParallaxScrollView>
  );
}

var styles = customStyle;

      /*<LineChart
                    data={chartData.exo_time} 
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
              <View style={styles.overlay}>

                  {chartData.exo_time?.datasets?.[0]?.data?.length > 0 &&
                    chartData.exo_time.labels?.length > 0 &&
                  chartData.exo_time.datasets[0].data.map((value, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.barArea,
                        {
                          height:200,
                          top:10,
                          left: (index*0.85 * Dimensions.get('window').width*0.95) / chartData.exo_time.labels.length + 70,
                          width: Dimensions.get('window').width*0.95  / chartData.exo_time.labels.length ,
                        },
                      ]}
                      onPress={() => handleBarPress(year,month, dayList[chartData.exo_time.data_page])}
                    />
                  ))}
                </View>
          </ThemedView> */
    /*<ThemedView style={[styles.titleContainer,{display: dataType=="pause_time" ? 'flex' : 'none'}]}>
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
      </ThemedView>*/
      
      