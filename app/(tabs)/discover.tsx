import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import { apiClient } from '~/services/api';
import { useAuth } from '~/hooks/useAuth';

export default function Discover() {
  const router = useRouter();
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [friendsList, setFriendsList] = useState<any>([]);
  const [quizzes, setQuizzes] = useState<any>([]);

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
      setIsSearching(false);
      setRoomCode('');
    }, [])
  );

  useEffect(() => {
    fetchFriendsList();
  }, []);

  const fetchFriendsList = async () => {
    try {
      const api = await apiClient();
      const response = await api.get(`/friends/${user?.id}/friends`);
      setFriendsList(response.data.friends);
    } catch (error) {
      console.error('Erro ao buscar lista de amigos:', error);
    }
  };

  useEffect(() => {
    fetchCustomQuizzesByUser();
  }, []);

  const fetchCustomQuizzesByUser = async () => {
    try {
      const api = await apiClient();
      const response = await api.get(`/quizzes/custom/${user?.id}`);
      console.log('Response:', response.data);
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.error('Erro ao buscar listagem de quiz customizado:', error);
    }
  };

  const handleQuizSelection = async (quizId: number, quizTheme: string) => {
    setModalVisible(true);
    setIsSearching(true);

    setModalVisible(true);
    setIsSearching(true);

    try {
      const api = await apiClient();

      let gameSessionId;

      // Criar uma nova sessão de jogo ou juntar-se a uma existente
      const sessionResponse = await api.post('/games/sessions', {
        theme: quizTheme,
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

  const handleRoomCodeChange = (text: string) => {
    // Apenas permite números e limita a 4 dígitos
    const validatedCode = text.replace(/[^0-9]/g, '').slice(0, 4);
    setRoomCode(validatedCode);
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.mainCard}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <FontAwesome name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              keyboardType="number-pad"
              placeholder="Digite o código da sala"
              placeholderTextColor="#6A5AE0"
              maxLength={4}
              value={roomCode}
              onChangeText={handleRoomCodeChange}
            />
          </View>

          {/* Quiz Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quiz</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quizContainer}>
            {quizzes.map((quiz: any) => (
              <TouchableOpacity
                key={quiz.id}
                onPress={() => {
                  handleQuizSelection(quiz.id, quiz.theme);
                }}
                style={styles.quizCard}>
                {quiz.gameSessions && quiz.gameSessions.length > 0 && (
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{quiz.gameSessions[0].status}</Text>
                  </View>
                )}

                <Image
                  style={styles.quizIcon}
                  source={require('../../assets/live-quiz-icon.png')}
                />
                <View style={styles.quizContent}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.quizSubtitle}>{quiz.theme}</Text>
                  <Text style={styles.quizCode}>Código: {quiz?.gameSessions[0]?.code}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Friends Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Amigos</Text>
          </View>
          <View style={styles.friendsContainer}>
            {friendsList.map((friend: any) => (
              <View style={styles.friendCard} key={friend.id}>
                <Image
                  style={styles.friendAvatar}
                  source={{ uri: 'https://github.com/pedrogiampietro.png' }}
                />
                <View>
                  <Text style={styles.friendName}>{friend.recipient.name}</Text>
                  <Text style={styles.friendPoints}>
                    {friend.recipient.points === 0 ? '0' : friend.recipient.points} points
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Modal para buscar oponente */}
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
  },
  container: {
    flex: 1,
    backgroundColor: '#6A5AE0',
    paddingHorizontal: 10,
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginVertical: 10,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    fontSize: 16,
    color: '#6A5AE0',
    zIndex: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 40,
    fontSize: 16,
    color: '#6A5AE0',
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6A5AE0',
  },
  quizContainer: {
    marginTop: 10,
  },
  quizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    position: 'relative', // Necessário para o posicionamento absoluto do badge
  },
  quizIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  quizContent: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizSubtitle: {
    fontSize: 14,
    color: '#777777',
  },
  quizCode: {
    fontSize: 12,
    color: '#777777',
    marginTop: 5,
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6347', // Cor de fundo do badge
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  friendsContainer: {
    marginTop: 10,
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A5AE0',
  },
  friendPoints: {
    fontSize: 14,
    color: '#777777',
  },
});
