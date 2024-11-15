import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import data from './test.json';

export default function HomeScreen() {


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
        <ThemedText type="subtitle">Données perso</ThemedText>
        <ThemedText>
          height : <ThemedText type="defaultSemiItalic">{data.body.height}</ThemedText> {'         '}
          weight : <ThemedText type="defaultSemiItalic">{data.body.weight}</ThemedText>
        </ThemedText>

        <ThemedText>
          age : <ThemedText type="defaultSemiItalic">{data.body.age}</ThemedText>{'                 '}
          genre : <ThemedText type="defaultSemiItalic">{data.body.genre}</ThemedText>
        </ThemedText>

      </ThemedView>



      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Derniere séance</ThemedText>
        



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
  },
});
