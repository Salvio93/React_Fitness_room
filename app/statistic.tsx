import React, { useState } from 'react';
import { View, StyleSheet, Dimensions,Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { LineChart,BarChart } from 'react-native-chart-kit';
import { fetchData } from './api_fetch'; 
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
export default function TabTwoScreen() {
  const router = useRouter();

  
  const [chartData, setChartData] = useState({
    num_visits: { data_page: 0 ,labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ data: [1,2,3,4,5,6,7,8,9,10,11,12] }] },
    pause: {  data_page:0 ,labels: ['date1','date2','date3','date4','date5','date6','date7','date8','date9'], datasets: [{ data: [131,130,123,124,125,126,127,128,129] }] },
  });
  
  // Function to handle fetch for previous or next data set for a specific data type
  const handleFetchData = async(direction : string, dataType: string) =>{
    if ((chartData[dataType].data_page != 0 && direction==="previous") || (chartData[dataType].data_page != 24 && direction ==="next")){

    
      try {
        var newPage = direction === 'previous' ? chartData[dataType].data_page - 1 : chartData[dataType].data_page+ 1;
        const newResp = await fetchData(newPage, dataType); // Fetch data from backend with page and data type
        
        var newData = newResp.data;
        //prevData[dataType].labels

        // Update the chart data for the specific data type
        setChartData((prevData) => ({
          ...prevData,
          [dataType]: {
            data_page : newPage,
            labels: newResp.labels || prevData[dataType].labels,
            datasets: [{ data: newData }],
          },
        }));

      } catch (error) {
        console.error(`Failed to fetch ${direction} ${dataType} data:`, error);
      }
    }
  };
  const handleBarPress = (label, value) => {
    // Navigate to the details screen with query parameters
    router.push({
      pathname: '/details',
      params: { label, value },
    });

  };

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
              {'                                                                            '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="red"
                size={10}
                onPress={() => handleFetchData('next', 'num_visits')} // Fetch next dataset for num_visits
              ></FontAwesome.Button>
            </ThemedText>
            <LineChart
              data={chartData.num_visits} // Display dynamic data for num_visits
              segments={3}
              width={360}
              height={300}
              yAxisSuffix={' visits'}
              fromZero
              chartConfig={{
                decimalPlaces: 0,
                backgroundGradientFrom: 'darkblue',
                backgroundGradientTo: 'blue',
                color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
          </View>
        </Collapsible>
      </ThemedView>

 
      <ThemedView style={styles.titleContainer}>
        <Collapsible title="Temps de pause moyen par seance">
        <View style={styles.chartContainer}>
        <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'pause')} 
              ></FontAwesome.Button>
              {'                       '}
              <View style={styles.legendContainer}><ThemedText> Séance {chartData.pause.data_page*9 +1} à {chartData.pause.data_page*9 +9}</ThemedText></View>

              {'                       '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'pause')} 
              ></FontAwesome.Button>
            </ThemedText>
              
            <BarChart
              data={chartData.pause}
              width={Dimensions.get('window').width*0.87}
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

              {chartData.pause?.datasets?.[0]?.data?.length > 0 &&
                chartData.pause.labels?.length > 0 &&
              chartData.pause.datasets[0].data.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.barArea,
                    {
                      height:200,
                      top:50,
                      left: (index*0.85 * Dimensions.get('window').width*0.87) / chartData.pause.labels.length + 70,
                      width: Dimensions.get('window').width*0.87  / chartData.pause.labels.length ,
                    },
                  ]}
                  onPress={() => handleBarPress(chartData.pause.labels[index], value)}
                />
              ))}
            </View>
          </View>
        </Collapsible>
      </ThemedView>

      

      <ThemedView style={styles.titleContainer}>

        <Collapsible title="Temps d'exercice moyen par seance">  // link to chart temps de pause et exo detaillée de la seance x
        <View style={styles.chartContainer}>
            <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'exo')} 
              ></FontAwesome.Button>
              {'                                                                            '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'exo')} 
              ></FontAwesome.Button>
            </ThemedText>
            <BarChart

              
              data={chartData.pause} 
              
              segments={3}
              width={Dimensions.get("window").width*0.87}
              height={300}
              yAxisSuffix={' s'}
              verticalLabelRotation={90}
              fromZero
              chartConfig={{
                
                barPercentage: .55,
                backgroundGradientFrom: 'black',
                backgroundGradientTo: 'blue',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                decimalPlaces: 0
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </Collapsible>
      </ThemedView>

      










      <ThemedView style={styles.titleContainer}>

        <Collapsible title="Nombre de rep moyen par seance"> // link to chart detaillée de la seance x
          <View>
            <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'rep')} 
              ></FontAwesome.Button>
              {'                                                                            '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'rep')} 
              ></FontAwesome.Button>
            </ThemedText>
            <BarChart
              data={chartData.pause} 
              segments={3}
              width={Dimensions.get("window").width*0.87}
              height={300}
              yAxisSuffix={' s'}
              verticalLabelRotation={90}
              fromZero
              chartConfig={{
                
                barPercentage: .55,
                backgroundGradientFrom: 'black',
                backgroundGradientTo: 'blue',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                decimalPlaces: 0
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </Collapsible>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>  

        <Collapsible title="Nombre de serie par seance">    // link to chart detaillée de la seance x
          <View>
            <ThemedText>
              <FontAwesome.Button
                name="chevron-left"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('previous', 'serie')} 
              ></FontAwesome.Button>
              {'                                                                            '}
              <FontAwesome.Button
                name="chevron-right"
                backgroundColor="green"
                size={10}
                onPress={() => handleFetchData('next', 'serie')} 
              ></FontAwesome.Button>
            </ThemedText>
            <BarChart
              data={chartData.pause} 
              segments={3}
              width={Dimensions.get("window").width*0.87}
              height={300}
              yAxisSuffix={' s'}
              verticalLabelRotation={90}
              fromZero
              chartConfig={{
                
                barPercentage: .55,
                backgroundGradientFrom: 'black',
                backgroundGradientTo: 'blue',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                decimalPlaces: 0
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </Collapsible>
      </ThemedView>


      



    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  chartContainer: {
    position: 'relative', // Keep the overlay positioned relative to this container
    height: 300, 
    marginBottom: 16, // Add space between this chart and the next component
    left:-20,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },overlay: {
    position: 'absolute',
    top: 0,
    height: 300,
    width: Dimensions.get('window').width*0.87,
    flexDirection: 'row',
  },
  barArea: {
    position: 'absolute',
    height: 300,
    backgroundColor: 'rgba(0,0,0,0)', // Transparent to simulate click-through
  },legendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
