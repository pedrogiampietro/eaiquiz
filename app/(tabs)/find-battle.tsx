import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { apiClient } from '~/services/api';

export default function FindBattle() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [_, setSelectedTheme] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
      setIsSearching(false);
    }, [])
  );

  const handleCardSelection = async (theme: string) => {
    setSelectedTheme(theme);
    setModalVisible(true);
    setIsSearching(true);

    try {
      const api = await apiClient();

      const existingQuizResponse = await api.get('/quizzes', {
        params: { theme },
      });

      let quizId;
      let gameSessionId;

      if (existingQuizResponse.data.length > 0) {
        quizId = existingQuizResponse.data[0].id;
      } else {
        const quizResponse = await api.post('/quizzes/generate', {
          theme,
          creatorId: 1,
        });

        console.log('Quiz generated:', quizResponse.data);
        quizId = quizResponse.data.quiz.id;
      }

      const sessionResponse = await api.post('/games/sessions', {
        theme,
        quizId,
        userId: 1,
        isRealTime: false,
      });

      console.log('Game session:', sessionResponse.data);
      gameSessionId = sessionResponse.data.gameSession.id;

      setIsSearching(false);
      router.push({
        pathname: '/duel-quiz',
        params: { quizId, gameSessionId: Number(gameSessionId) },
      });
    } catch (error) {
      console.error('Error:', error);
      setIsSearching(false);
      setModalVisible(false);
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha um tema para a batalha</Text>

        {/* Theme Cards */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            onPress={() => handleCardSelection('biologia e ciencias')}
            style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/biologia-ciencias.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('cinema e arte')}
            style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/cinema-arte.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('jogos e tecnologia')}
            style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/jogos-tecnologia.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('matematica e outros')}
            style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/matematica-fisica.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('historia e geografia')}
            style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/historia-geografia.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('linguas e literatura')}
            style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/linguas-literatura.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Modal for finding opponent */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {isSearching ? (
                <>
                  <Text style={styles.modalText}>Buscando oponente...</Text>
                  <ActivityIndicator size="large" color="#6A5AE0" />
                </>
              ) : (
                <Text style={styles.modalText}>Oponente encontrado!</Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#6A5AE0',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 20,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 100,
    height: 100,
    margin: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
