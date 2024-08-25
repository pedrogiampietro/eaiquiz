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

export default function Discover() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // useFocusEffect é usado para resetar o estado sempre que a tela estiver focada
  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
      setIsSearching(false);
    }, [])
  );

  const handleQuizSelection = () => {
    setModalVisible(true); // Abrir o modal
    setIsSearching(true);

    // Simulação de "buscar oponente"
    setTimeout(() => {
      setIsSearching(false);
      router.push('/duel-quiz'); // Navegar para a tela DuelQuiz
    }, 10000); // 10 segundos de espera
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
              placeholder="Search"
              placeholderTextColor="#6A5AE0"
            />
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabText}>Top</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabText}>Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabText}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabButton}>
              <Text style={styles.tabText}>Friends</Text>
            </TouchableOpacity>
          </View>

          {/* Quiz Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quiz</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.quizContainer}>
            <TouchableOpacity onPress={handleQuizSelection} style={styles.quizCard}>
              {/* Adicionado onPress */}
              <Image style={styles.quizIcon} source={require('../../assets/live-quiz-icon.png')} />
              <View>
                <Text style={styles.quizTitle}>Statistics Math Quiz</Text>
                <Text style={styles.quizSubtitle}>Math • 12 Quizzes</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleQuizSelection} style={styles.quizCard}>
              {/* Adicionado onPress */}
              <Image style={styles.quizIcon} source={require('../../assets/live-quiz-icon.png')} />
              <View>
                <Text style={styles.quizTitle}>Matrices Quiz</Text>
                <Text style={styles.quizSubtitle}>Math • 6 Quizzes</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Friends Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Friends</Text>
          </View>
          <View style={styles.friendsContainer}>
            <View style={styles.friendCard}>
              <Image
                style={styles.friendAvatar}
                source={{ uri: 'https://github.com/pedrogiampietro.png' }}
              />
              <View>
                <Text style={styles.friendName}>Maren Workman</Text>
                <Text style={styles.friendPoints}>325 points</Text>
              </View>
            </View>
            <View style={styles.friendCard}>
              <Image
                style={styles.friendAvatar}
                source={{ uri: 'https://github.com/pedrogiampietro.png' }}
              />
              <View>
                <Text style={styles.friendName}>Brandon Matrovs</Text>
                <Text style={styles.friendPoints}>124 points</Text>
              </View>
            </View>
            <View style={styles.friendCard}>
              <Image
                style={styles.friendAvatar}
                source={{ uri: 'https://github.com/pedrogiampietro.png' }}
              />
              <View>
                <Text style={styles.friendName}>Manuela Lipshutz</Text>
                <Text style={styles.friendPoints}>437 points</Text>
              </View>
            </View>
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
    fontSize: 20,
    color: '#6A5AE0',
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#000000',
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
  },
  quizIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  quizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizSubtitle: {
    fontSize: 14,
    color: '#777777',
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
  },
  friendPoints: {
    fontSize: 14,
    color: '#777777',
  },
});
