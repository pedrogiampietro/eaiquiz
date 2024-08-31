import React, { useEffect, useState } from 'react';
import { useRouter, Stack } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { apiClient } from '~/services/api';
import { useAuth } from '~/hooks/useAuth';

const quizCardImage = require('../../assets/recent-quiz.png');
const featuredCardImage = require('../../assets/mask-group.png');
const topLeftIcon = require('../../assets/top-left-icon.png');
const bottomRightIcon = require('../../assets/bottom-right-icon.png');
const liveQuizIcon = require('../../assets/live-quiz-icon.png');

const sections = [
  { type: 'RecentQuiz', key: 'recentQuiz' },
  { type: 'Featured', key: 'featured' },
  { type: 'RecentQuizzes', key: 'recentQuizzes' },
];

export default function Home() {
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [mostQuizPlayed, setMostQuizPlayed] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecentQuizzes = async () => {
      try {
        console.log('chamando o recent quizes api');
        // const api = await apiClient();
        // const response = await api.get('/quizzes/recent');
        // console.log('response.data', response.data);
        // setRecentQuizzes(response.data);
      } catch (error) {
        console.error('Erro ao buscar quizzes recentes:', error);
      }
    };

    fetchRecentQuizzes();
  }, []);

  useEffect(() => {
    const fetchQuizMorePlaying = async () => {
      try {
        console.log('chamando o quiz mais jogado api');
        // const api = await apiClient();
        // const response = await api.get('/quizzes/most-played-quiz');
        // console.log('most played', response.data);
        // setMostQuizPlayed(response.data.mostPlayedQuiz);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchQuizMorePlaying();
  }, []);

  const handleQuizSelection = async (theme: string) => {
    try {
      const api = await apiClient();

      // Verifique se há quizzes existentes
      const existingQuizResponse = await api.get('/quizzes/getOrCreate', {
        params: { theme, userId: user?.id },
      });

      let quizId;
      let gameSessionId;

      if (existingQuizResponse.data.quiz) {
        // Utilize o quiz existente
        quizId = existingQuizResponse.data.quiz.id;
      }

      // Criar uma nova sessão de jogo ou juntar-se a uma existente
      const sessionResponse = await api.post('/games/sessions', {
        theme,
        quizId,
        userId: user?.id,
        isRealTime: false,
      });

      gameSessionId = sessionResponse.data.gameSession.id;

      router.push({
        pathname: '/duel-quiz',
        params: { quizId, gameSessionId: Number(gameSessionId) },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFriends = () => {
    router.push('/friends');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'RecentQuiz':
              return <RecentQuiz mostQuizPlayed={mostQuizPlayed} />;
            case 'Featured':
              return <Featured handleFriends={handleFriends} />;
            case 'RecentQuizzes':
              return <RecentQuizzes quizzes={recentQuizzes} onQuizSelect={handleQuizSelection} />;
            default:
              return null;
          }
        }}
        contentContainerStyle={styles.contentContainer}
      />
    </>
  );
}

const RecentQuiz = ({ mostQuizPlayed }: any) => (
  <View style={styles.quizContainer}>
    <View style={styles.quizContent}>
      <Image source={quizCardImage} style={styles.quizCardImage} />
      <Text style={styles.quizTitle}>Quiz mais jogado</Text>
      <View style={styles.quizTextOverlay}>
        <Text style={styles.quizName}>{mostQuizPlayed.title}</Text>
      </View>
      <View style={styles.quizPercentageContainer}>
        <Text style={styles.quizPercentage}>{mostQuizPlayed.playerCount}</Text>
      </View>
    </View>
  </View>
);

const Featured = ({ handleFriends }: any) => (
  <View style={styles.featuredContainer}>
    <Image source={featuredCardImage} style={styles.featuredCardImage} />
    <Image source={topLeftIcon} style={styles.topLeftIcon} />
    <Image source={bottomRightIcon} style={styles.bottomRightIcon} />
    <View style={styles.featuredContent}>
      <Text style={styles.featuredTitle}>FEATURED</Text>
      <Text style={styles.featuredText}>Take part in challenges with friends or other players</Text>
      <TouchableOpacity style={styles.findFriendsButton} onPress={() => handleFriends()}>
        <FontAwesome name="users" size={18} color="#6A5AE0" style={styles.buttonIcon} />
        <Text style={styles.findFriendsText}>Find Friends</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const RecentQuizzes = ({ quizzes, onQuizSelect }: any) => (
  <View style={styles.recentQuizzesContainer}>
    <View style={styles.recentQuizzesHeader}>
      <Text style={styles.recentQuizzesTitle}>Quizzes Recentes</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllText}>Ver todos</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      data={quizzes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onQuizSelect(item.theme)}>
          <View style={styles.recentQuizCard}>
            <Image source={liveQuizIcon} style={styles.liveQuizIcon} />
            <View style={styles.liveQuizInfo}>
              <Text style={styles.liveQuizName}>{item.title}</Text>
              <Text style={styles.liveQuizDetail}>{item.description}</Text>

              <Text style={styles.quizCode}>Código: {item?.gameSessions[0]?.code}</Text>
            </View>
            <FontAwesome name="chevron-right" size={18} color="#6A5AE0" />
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingTop: 24,
    backgroundColor: '#6A5AE0',
  },
  contentContainer: {
    paddingBottom: 20,
    backgroundColor: '#6A5AE0',
  },
  quizContainer: {
    marginBottom: 20,
    marginTop: 23,
    paddingHorizontal: 24,
  },
  quizTitle: {
    position: 'absolute',
    top: 10,
    left: 15,
    fontSize: 12,
    color: '#660012',
    fontWeight: 'bold',
  },
  quizContent: {
    position: 'relative',
  },
  quizCardImage: {
    width: '100%',
    borderRadius: 15,
  },
  quizTextOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  quizName: {
    fontSize: 18,
    color: '#660012',
    fontWeight: 'bold',
  },
  quizPercentageContainer: {
    position: 'absolute',
    top: 15,
    right: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizPercentage: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  featuredContainer: {
    position: 'relative',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 24,
  },
  featuredCardImage: {
    width: '100%',
  },
  topLeftIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 50,
    height: 50,
  },
  bottomRightIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
  },
  featuredContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  featuredTitle: {
    fontSize: 12,
    color: '#FFF',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  featuredText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  findFriendsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonIcon: {
    marginRight: 8,
  },
  findFriendsText: {
    fontSize: 16,
    color: '#6A5AE0',
    fontWeight: 'bold',
  },
  recentQuizzesContainer: {
    height: '100%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 60,
    paddingHorizontal: 24,
  },
  recentQuizzesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentQuizzesTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6A5AE0',
    fontWeight: 'bold',
  },
  recentQuizCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  liveQuizIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  liveQuizInfo: {
    flex: 1,
  },
  liveQuizName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  liveQuizDetail: {
    fontSize: 14,
    color: '#666',
  },
  quizCode: {
    fontSize: 12,
    color: '#777777',
    marginTop: 5,
  },
});
