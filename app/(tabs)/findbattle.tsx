import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { apiClient } from '~/services/api';
import { useAuth } from 'hooks/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FindBattle() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [_, setSelectedTheme] = useState('');
  const { user } = useAuth();

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

      const existingQuizResponse = await api.get('/quizzes/getOrCreate', {
        params: { theme, userId: user?.id },
      });

      let quizId;
      let gameSessionId;

      if (existingQuizResponse.data.quiz) {
        quizId = existingQuizResponse.data.quiz.id;
        console.log(`Quiz existente encontrado: ${quizId}`);
      } else {
        const quizResponse = await api.post('/quizzes/generate', {
          theme,
          creatorId: user?.id,
        });

        console.log('Novo quiz gerado:', quizResponse.data);
        quizId = quizResponse.data.quiz.id;
      }

      const sessionResponse = await api.post('/games/sessions', {
        theme,
        quizId,
        userId: user?.id,
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
            style={[styles.card, styles.cardBiologia]}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="leaf" size={30} color="#4CAF50" />
            </View>
            <Text style={styles.cardTitle}>Biologia e Ciências</Text>
            <Text style={styles.cardSubtitle}>Gerado por IA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('cinema e arte')}
            style={[styles.card, styles.cardCinema]}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="movie" size={30} color="#FF5722" />
            </View>
            <Text style={styles.cardTitle}>Cinema e Arte</Text>
            <Text style={styles.cardSubtitle}>Gerado por IA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('jogos e tecnologia')}
            style={[styles.card, styles.cardJogos]}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="gamepad-variant" size={30} color="#9C27B0" />
            </View>
            <Text style={styles.cardTitle}>Jogos e Tecnologia</Text>
            <Text style={styles.cardSubtitle}>Gerado por IA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('matematica e outros')}
            style={[styles.card, styles.cardMatematica]}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="calculator" size={30} color="#2196F3" />
            </View>
            <Text style={styles.cardTitle}>Matemática e Outros</Text>
            <Text style={styles.cardSubtitle}>Gerado por IA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('historia e geografia')}
            style={[styles.card, styles.cardHistoria]}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="book" size={30} color="#FFEB3B" />
            </View>
            <Text style={styles.cardTitle}>História e Geografia</Text>
            <Text style={styles.cardSubtitle}>Gerado por IA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCardSelection('linguas e literatura')}
            style={[styles.card, styles.cardLinguas]}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="book-open-variant" size={30} color="#795548" />
            </View>
            <Text style={styles.cardTitle}>Línguas e Literatura</Text>
            <Text style={styles.cardSubtitle}>Gerado por IA</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/create-quiz')} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Criar um Customizado</Text>
        </TouchableOpacity>

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
    marginVertical: 10,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  cardBiologia: {
    backgroundColor: '#A8E6CF',
  },
  cardCinema: {
    backgroundColor: '#FFCCBC',
  },
  cardJogos: {
    backgroundColor: '#E1BEE7',
  },
  cardMatematica: {
    backgroundColor: '#BBDEFB',
  },
  cardHistoria: {
    backgroundColor: '#e6da73eb',
  },
  cardLinguas: {
    backgroundColor: '#D7CCC8',
  },
  iconContainer: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#FFF',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
  nextButtonText: {
    fontSize: 18,
    color: '#6A5AE0',
    fontWeight: 'bold',
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
