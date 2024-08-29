import { useRouter } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Image,
} from 'react-native';

// Importe a imagem do fundo do modal e as imagens das estrelas
const modalBackground = require('../assets/ui/modal-rewards-ui.png');
const starBig = require('../assets/star_big.png');
const starSmall = require('../assets/star_small.png');

export function RewardsModal({ visible, score, correctAnswers, rewardAmount, onClose }: any) {
  const router = useRouter();
  const getStarImages = () => {
    let starImages = [];

    if (correctAnswers >= 1) starImages.push(starSmall);
    if (correctAnswers >= 2) starImages.push(starBig);
    if (correctAnswers === 3) starImages.push(starSmall);

    return starImages;
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ImageBackground
            source={modalBackground}
            style={styles.backgroundImage}
            resizeMode="contain">
            <View style={styles.starsContainer}>
              {getStarImages().map((star, index) => (
                <Image
                  key={index}
                  source={star}
                  style={[
                    styles.starImage,
                    index === 0
                      ? styles.starSmallLeft
                      : index === 1
                        ? styles.starBig
                        : styles.starSmallRight,
                  ]}
                />
              ))}
            </View>

            <Text style={styles.scoreText}>{score}</Text>
            <Text style={styles.rewardText}>{rewardAmount}</Text>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                onClose();
                router.push('/(tabs)');
              }}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 247,
    height: 316,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starsContainer: {
    position: 'absolute',
    top: 30,
    left: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
  },
  starImage: {
    position: 'absolute',
  },
  starSmallLeft: {
    width: 47,
    height: 47,
    left: 0,
    bottom: -35,
  },
  starBig: {
    width: 57,
    height: 57,
    left: 33,
  },
  starSmallRight: {
    width: 47,
    height: 47,
    left: 78,
    bottom: -35,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#228AED',
    position: 'absolute',
    top: 145,
  },
  rewardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFCC00',
    position: 'absolute',
    bottom: 80,
    left: 125,
  },
  okButton: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
