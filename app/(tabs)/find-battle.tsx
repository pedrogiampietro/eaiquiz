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

export default function FindBattle() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(false);
      setIsSearching(false);
    }, [])
  );

  const handleCardSelection = () => {
    setModalVisible(true); // Abrir o modal
    setIsSearching(true);

    // Simulação de "buscar oponente"
    setTimeout(() => {
      setIsSearching(false);
      router.push('/duel-quiz'); // Navegar para a tela DuelQuiz
    }, 5000); // 5 segundos de espera para simular o matchmaking
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha um tema para a batalha</Text>

        {/* Cards de Temas */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity onPress={handleCardSelection} style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/biologia-ciencias.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCardSelection} style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/cinema-arte.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCardSelection} style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/jogos-tecnologia.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCardSelection} style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/matematica-fisica.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCardSelection} style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/historia-geografia.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCardSelection} style={styles.card}>
            <Image
              style={styles.cardImage}
              source={require('../../assets/cards/linguas-literatura.png')}
            />
          </TouchableOpacity>
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
