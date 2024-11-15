import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

export default function DetailsScreen() {
    const { label, value } = useLocalSearchParams<{ label; value}>();
  
    const emptyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         datasets: [{ data: [1,2,3,4,5,6,7,8,9,10,11,12] }
        ],
      };
    
        
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="person" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Details {label}</ThemedText>
      </ThemedView>


      <Collapsible title="Personal data">
      <View >
            <LineChart
                  data={emptyData} // Display dynamic data for num_visits
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
