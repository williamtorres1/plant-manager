/* eslint-disable import/no-duplicates */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

import waterDrop from '../assets/waterdrop.png';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';

import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

export function MyPlants(): JSX.Element {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [nextWatered, setNextWatered] = useState<string>();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }

    loadStoragePlants();
  }, []);

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel',
      },
      {
        text: 'Sim 😥',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants(oldData =>
              oldData.filter(item => item.id !== plant.id),
            );
          } catch {
            Alert.alert('Não foi possível remover! 😥');
          }
        },
      },
    ]);
  }

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
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
