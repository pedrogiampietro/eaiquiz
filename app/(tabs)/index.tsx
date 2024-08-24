import { Stack } from 'expo-router';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const quizCardImage = require('../../assets/recent-quiz.png');
const featuredCardImage = require('../../assets/mask-group.png');
const topLeftIcon = require('../../assets/top-left-icon.png');
const bottomRightIcon = require('../../assets/bottom-right-icon.png');
const liveQuizIcon = require('../../assets/live-quiz-icon.png');

const liveQuizzesData = [
  { id: '1', name: 'Statistics Math Quiz', detail: 'Math • 12 Quizzes' },
  { id: '2', name: 'Integers Quiz', detail: 'Math • 10 Quizzes' },
  { id: '3', name: 'Integers Quiz', detail: 'Math • 10 Quizzes' },
];

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <RecentQuiz />
        <Featured />
        <LiveQuizzes />
      </ScrollView>
    </>
  );
}

const RecentQuiz = () => (
  <View style={styles.quizContainer}>
    <View style={styles.quizContent}>
      <Image source={quizCardImage} style={styles.quizCardImage} />
      <Text style={styles.quizTitle}>RECENT QUIZ</Text>
      <View style={styles.quizTextOverlay}>
        <Text style={styles.quizName}>A Basic Music Quiz</Text>
      </View>
      <View style={styles.quizPercentageContainer}>
        <Text style={styles.quizPercentage}>65%</Text>
      </View>
    </View>
  </View>
);

const Featured = () => (
  <View style={styles.featuredContainer}>
    <Image source={featuredCardImage} style={styles.featuredCardImage} />
    <Image source={topLeftIcon} style={styles.topLeftIcon} />
    <Image source={bottomRightIcon} style={styles.bottomRightIcon} />
    <View style={styles.featuredContent}>
      <Text style={styles.featuredTitle}>FEATURED</Text>
      <Text style={styles.featuredText}>Take part in challenges with friends or other players</Text>
      <TouchableOpacity style={styles.findFriendsButton}>
        <FontAwesome name="users" size={18} color="#6A5AE0" style={styles.buttonIcon} />
        <Text style={styles.findFriendsText}>Find Friends</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const LiveQuizzes = () => (
  <View style={styles.liveQuizzesContainer}>
    <View style={styles.liveQuizzesHeader}>
      <Text style={styles.liveQuizzesTitle}>Live Quizzes</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      data={liveQuizzesData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.liveQuizCard}>
          <Image source={liveQuizIcon} style={styles.liveQuizIcon} />
          <View style={styles.liveQuizInfo}>
            <Text style={styles.liveQuizName}>{item.name}</Text>
            <Text style={styles.liveQuizDetail}>{item.detail}</Text>
          </View>
          <FontAwesome name="chevron-right" size={18} color="#6A5AE0" />
        </View>
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
  },
  quizContainer: {
    marginBottom: 20,
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
    right: 23,
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
  liveQuizzesContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 20,
    paddingHorizontal: 24,
  },
  liveQuizzesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveQuizzesTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6A5AE0',
    fontWeight: 'bold',
  },
  liveQuizCard: {
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
});
