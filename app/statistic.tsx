import React, { useEffect, useState } from 'react';
import { View, Dimensions,Alert } from 'react-native';
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
export default function TabTwoScreen() {
  const router = useRouter();
  var today = new Date();
  
  const [chartData, setChartData] = useState({
    num_visits: { data_page: 0 ,labels: [], datasets: [{ data: [] }] },
    pause_time: {  data_page:0 ,labels: [], datasets: [{ data: [] }] },
    exo_time: {  data_page:0 ,labels: [], datasets: [{ data: [] }] },
  });
  
  // Function to handle fetch for previous or next data set for a specific data type
  const handleFetchData = async(direction : string, dataType: string, frequence='yearly') =>{
    try {
      if (direction==="current"){
          const current_data = await fetchData(dataType,frequence, today.getFullYear()-0);
          console.log(current_data)


          var dynamicKey = `${dataType}_year`;
          if (dataType == "num_visits"){
            var dynamicKey1 = `monthly_count`;

          }
          if (dataType == "exo_time"){
            var dynamicKey1 = `monthly_moy`;

          }


          setChartData((prevData) => ({
            ...prevData,
            [dataType]: {
              data_page : 0,
              labels: ['Janvier', 'Fevier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
              datasets: [{ data: current_data[dynamicKey][dynamicKey1]  }],
            },
          }));
          


      }else{

        if ((chartData[dataType].data_page != 0 && direction==="previous") || (chartData[dataType].data_page != (today.getFullYear() -2000) && direction ==="next")){
            var newPage = direction === 'previous' ? chartData[dataType].data_page - 1 : chartData[dataType].data_page+ 1;
            const newResp = await fetchData(dataType,frequence, today.getFullYear()-newPage); // Fetch data from backend with page and data type
            
            console.log(newResp)
            var dynamicKey = `${dataType}_year`;
            if (dataType == "num_visits"){
              var dynamicKey1 = `monthly_count`;
  
            }
            if (dataType == "exo_time"){
              var dynamicKey1 = `monthly_moy`;
  
            }

            setChartData((prevData) => ({
              ...prevData,
              [dataType]: {
                data_page : newPage,
                labels: newResp.labels || prevData[dataType].labels,
                datasets: [{ data: newResp[dynamicKey][dynamicKey1] }],
              },
            }));
        }
      }
    } catch (error) {
      console.error(`Failed to fetch current data:`, error);
    }
    
  };
  const handleBarPress = (label, index, dataType, year) => {
    router.push({
      pathname: '/monthly',
      params: { label, index, dataType, year },
    });

  };

  useEffect(()=> {
    handleFetchData("current","num_visits")
    handleFetchData("current","exo_time")

  },[])

  return (


    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="bar-chart" style={styles.headerImage} />}
    >
      
      <ThemedView style={styles.titleContainer}>
        
        <Collapsible title="Nombres de visites">
        <View style={styles.chartContainer}>
            <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="red"
                size={10}
                onPress={() => handleFetchData('previous', 'num_visits')} // Fetch previous dataset for num_visits
              ></FontAwesome.Button>
              {'                              '}
              <View style={styles.legendContainer}><ThemedText> Année { today.getFullYear() - chartData.num_visits.data_page}</ThemedText></View>

              {'                              '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="red"
                size={10}
                onPress={() => handleFetchData('next', 'num_visits')} // Fetch next dataset for num_visits
              ></FontAwesome.Button>
            </ThemedText>
            <BarChart
              data={chartData.num_visits}
              width={Dimensions.get('window').width*0.95}
              height={300}
              verticalLabelRotation={90}
              fromZero
              chartConfig={{
                barPercentage: .68,
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
            <View style={styles.overlay}>

              {chartData.num_visits?.datasets?.[0]?.data?.length > 0 &&
                chartData.num_visits.labels?.length > 0 &&
              chartData.num_visits.datasets[0].data.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.barArea,
                    {
                      height:200,
                      top:50,
                      left: (index*0.85 * Dimensions.get('window').width*0.95) / chartData.num_visits.labels.length + 70,
                      width: Dimensions.get('window').width*0.95  / chartData.num_visits.labels.length ,
                    },
                  ]}
                  onPress={() => handleBarPress(chartData.num_visits.labels[index], index,"num_visits", today.getFullYear()- chartData.num_visits.data_page)}
                />
              ))}
            </View>
          </View>
        </Collapsible>
      </ThemedView>
      

      

      <ThemedView style={styles.titleContainer}>
        <Collapsible title="Temps de seance en moyenne">
        <View style={styles.chartContainer}>
        <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'exo_time')} 
              ></FontAwesome.Button>
              {'                              '}
              <View style={styles.legendContainer}><ThemedText>  Année { today.getFullYear()- chartData.exo_time.data_page}</ThemedText></View>

              {'                              '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'exo_time')} 
              ></FontAwesome.Button>
            </ThemedText>
              
            <BarChart
              data={chartData.exo_time}
              width={Dimensions.get('window').width*0.95}
              height={300}
              verticalLabelRotation={90}
              fromZero
              chartConfig={{
                barPercentage: .68,
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
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
                      top:50,
                      left: (index*0.85 * Dimensions.get('window').width*0.95) / chartData.exo_time.labels.length + 70,
                      width: Dimensions.get('window').width*0.95  / chartData.exo_time.labels.length ,
                    },
                  ]}
                  onPress={() => handleBarPress(chartData.exo_time.labels[index], index,"exo_time", today.getFullYear() - chartData.pause_time.data_page)}
                />
              ))}
            </View>
          </View>
        </Collapsible>
      </ThemedView>


    </ParallaxScrollView>
  );
}
/*
      <ThemedView style={styles.titleContainer}>
        <Collapsible title="Temps de pause moyen par seance">
        <View style={styles.chartContainer}>
        <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'pause_time')} 
              ></FontAwesome.Button>
              {'                       '}
              <View style={styles.legendContainer}><ThemedText> Année { today.getFullYear() - chartData.pause_time.data_page}</ThemedText></View>

              {'                             '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'pause_time')} 
              ></FontAwesome.Button>
            </ThemedText>
              
            <BarChart
              data={chartData.pause_time}
              width={Dimensions.get('window').width*0.95}
              height={300}
              verticalLabelRotation={90}
              fromZero
              chartConfig={{
                barPercentage: .68,
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
            <View style={styles.overlay}>

              {chartData.pause_time?.datasets?.[0]?.data?.length > 0 &&
                chartData.pause_time.labels?.length > 0 &&
              chartData.pause_time.datasets[0].data.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.barArea,
                    {
                      height:200,
                      top:50,
                      left: (index*0.85 * Dimensions.get('window').width*0.95) / chartData.pause_time.labels.length + 70,
                      width: Dimensions.get('window').width*0.95  / chartData.pause_time.labels.length ,
                    },
                  ]}
                  onPress={() => handleBarPress(chartData.pause_time.labels[index], index,"pause_time", today.getFullYear() - chartData.pause_time.data_page)}
                />
              ))}
            </View>
          </View>
        </Collapsible>
      </ThemedView> */

const styles = customStyle;
