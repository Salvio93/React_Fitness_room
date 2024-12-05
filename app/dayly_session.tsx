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
  const router = useRouter();

  const dayList =  ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']

  const [chartData, setChartData] = useState({
    session_time: {  data_page:0, datasets: { data: [] } },
  });
  const [text, setText] = useState(`${dayList[index]} of ${week} - ${month} - ${year}`); //to update text 
  const [datatext, setdataText] = useState(`random data`); 


  const handleFetchData = async(direction : string, dataType: string, frequence='dayly') =>{


    try {
      if (direction==="current"){
          const current_data = await fetchData(dataType,frequence,year,month,week,index); 
          

          setChartData((prevData) => ({ 
            ...prevData,
            [dataType]: {
              data_page : index,
              datasets: { data: current_data.data },//fetch
            },
          }));

          setText(`${dayList[index]} - ${week}- ${month} - ${year}`);
          setdataText(`current data`);


      }else{

        if ((chartData[dataType].data_page != 0 && direction==="previous") || (chartData[dataType].data_page != 6 && direction ==="next")){
          var newPage = direction === 'previous' ? chartData[dataType].data_page - 1 : chartData[dataType].data_page -0 +1; //to declare as int
            const newResp = await fetchData(dataType,frequence,year,month,week,newPage); 
            
            setChartData((prevData) => ({
              ...prevData,
              [dataType]: {
                data_page : newPage,
                datasets: { data: newResp.data },
              },
            }));
            
            setText(`${dayList[newPage]} of ${week} - ${month} - ${year}`);
            setdataText(`notcurrent data`);

        }
      }
    } catch (error) {
      console.error(`Failed to fetch current data:`, error);
    }
    
  };
  

  const handleBarPress = (session_num, year,month,day) => {
    router.push({
      pathname: '/session_detail',
      params: {session_num, year,month,day },
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
    
  

  //chartData[dataType].datasets.data.session_count
  const session_j = 3;
  // for each session, data of session

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title"> {text}</ThemedText>
      </ThemedView>

      
      <ThemedView style={styles.titleContainer}>
            <ThemedText>Temps de seance par session à la date du {text}</ThemedText> 

            <View style={[styles.chartContainer, {left:-310, bottom:-60}]}>
            <ThemedText>
                  <FontAwesome.Button
                    name="chevron-left"
                    backgroundColor="green"
                    size={10}
                    onPress={() => handleFetchData('previous', 'session_time')} 
                  ></FontAwesome.Button>
                  {'                                       '}

                  {'                                       '}
                  <FontAwesome.Button
                    name="chevron-right"
                    backgroundColor="green"
                    size={10}
                    onPress={() => handleFetchData('next', 'session_time')} 
                  ></FontAwesome.Button>
            </ThemedText>

              <View >
                {Array.from({ length: session_j }).map((_, index) => (
                  <View key={`button-${index}`}>
                    <ThemedText>Detail session {index + 1}</ThemedText>
                    {/*debut session: {chartData.session_time.datasets[index+1].begin}  fin dession: {chartData.session_time.datasets[index+1].end} */}  
                    <FontAwesome.Button
                      name="forward"
                      backgroundColor="red"
                      size={10}
                      onPress={() => handleBarPress(index + 1, year, month, chartData.session_time.data_page)}
                    >
                    </FontAwesome.Button>
                  </View>
                ))}
              </View>



              </View>
              
          </ThemedView>
      
      





    </ParallaxScrollView>
  );
}

var styles = customStyle;

      /*<LineChart
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
              <View style={styles.overlay}>

                  {chartData.session_time?.datasets?.[0]?.data?.length > 0 &&
                    chartData.session_time.labels?.length > 0 &&
                  chartData.session_time.datasets[0].data.map((value, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.barArea,
                        {
                          height:200,
                          top:10,
                          left: (index*0.85 * Dimensions.get('window').width*0.95) / chartData.session_time.labels.length + 70,
                          width: Dimensions.get('window').width*0.95  / chartData.session_time.labels.length ,
                        },
                      ]}
                      onPress={() => handleBarPress(year,month, dayList[chartData.session_time.data_page])}
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
      
      