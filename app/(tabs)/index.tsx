import { Stack } from 'expo-router';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importando FontAwesome para o ícone

const quizCardImage = require('../../assets/recent-quiz.png');
const featuredCardImage = require('../../assets/mask-group.png'); // Imagem de fundo do card "Featured"
const topLeftIcon = require('../../assets/top-left-icon.png'); // Imagem do canto superior esquerdo
const bottomRightIcon = require('../../assets/bottom-right-icon.png'); // Imagem do canto inferior direito

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View style={styles.container}>
        <RecentQuiz />
        <Featured />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#6A5AE0',
  },
  quizContainer: {
    marginBottom: 20,
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
});
