/* eslint-disable import/no-duplicates */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Header } from '../components/Header';
import colors from '../../styles/colors';
import waterDrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps } from '../libs/storage';
import fonts from '../../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export function MyPlants(): JSX.Element {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [nextWaterd, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStoragePlants() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt },
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`,
      );

      setMyPlants(plantsStoraged);
    }

    loadStoragePlants();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1 }}
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <PlantCardSecondary data={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
