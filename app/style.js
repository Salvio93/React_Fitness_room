import {StyleSheet, Dimensions} from 'react-native';


export const customStyle = StyleSheet.create({
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
      left:-55,
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
      display : 'flex',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    overlay: {
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
    },
    legendContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
  });

