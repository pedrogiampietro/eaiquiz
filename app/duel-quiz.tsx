import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  // Adicione mais perguntas aqui
];

export default function DuelQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0); // Pontuação aleatória ou buscada de um servidor
  const [timer, setTimer] = useState(10); // Definindo o tempo do cronômetro
  const [showResultModal, setShowResultModal] = useState(false); // Estado para controlar a exibição do modal de resultado

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion(); // Avançar para a próxima pergunta se o cronômetro chegar a 0
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedOption === null && !showResultModal) {
        setTimer((prev) => prev - 1); // Diminuir o cronômetro a cada segundo
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedOption, showResultModal]);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    // Simulação da pontuação do oponente (para demonstração)
    setOpponentScore(opponentScore + Math.floor(Math.random() * 2)); // Random 0 ou 1
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null);
      setTimer(10); // Resetar o cronômetro para 10 segundos
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Todas as perguntas foram respondidas, mostrar o modal de resultado
      endQuiz();
    }
  };

  const endQuiz = () => {
    setShowResultModal(true);
  };

  useEffect(() => {
    // Mover automaticamente para a próxima pergunta após um atraso
    if (selectedOption !== null) {
      const timer = setTimeout(handleNextQuestion, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedOption]);

  return (
    <ImageBackground source={require('../assets/mask-group-profile.png')} style={styles.background}>
      <View style={styles.overlay}>
        {/* Contador de perguntas e cronômetro */}
        <View style={styles.topContainer}>
          <Text style={styles.questionCounter}>
            {currentQuestionIndex + 1}/{questions.length}
          </Text>
          <Text style={styles.timer}>Tempo: {timer}s</Text>
        </View>

        <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
        <View style={styles.optionsContainer}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
              onPress={() => handleOptionPress(option)}
              disabled={selectedOption !== null}>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal de resultado */}
        <Modal
          visible={showResultModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowResultModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {score > opponentScore ? (
                <>
                  <Text style={styles.modalTitle}>Congrats!</Text>
                  <LottieView
                    source={require('../assets/lotties/conffeti_lottie.json')}
                    autoPlay
                    loop={false}
                    style={styles.lottie}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.modalTitle}>Better Luck Next Time!</Text>
                  {/* <Image source={require('../assets/loser.png')} style={styles.modalImage} /> */}
                </>
              )}
              <Text style={styles.modalScore}>Your Score: {score}</Text>
              <Text style={styles.modalScore}>Opponent's Score: {opponentScore}</Text>
              <Text style={styles.modalText}>
                You answered {score} out of {questions.length} correctly.
              </Text>
              <Text style={styles.modalText}>
                Your opponent answered {opponentScore} out of {questions.length} correctly.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowResultModal(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para destacar o conteúdo
    padding: 20,
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  questionCounter: {
    fontSize: 18,
    color: '#fff',
  },
  timer: {
    fontSize: 18,
    color: '#ffeb3b',
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 10,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#ffeb3b', // Destaque para a opção selecionada
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
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
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6A5AE0',
    marginBottom: 10,
  },
  modalScore: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  lottie: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6A5AE0',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
