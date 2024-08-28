import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { apiClient } from 'services/api';
import { useAuth } from 'hooks/useAuth';

export default function DuelQuiz() {
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState<any>(null);
  const [opponentStatus, setOpponentStatus] = useState('pending');
  const [timer, setTimer] = useState(10);
  const [showResultModal, setShowResultModal] = useState(false);

  const { quizId, gameSessionId } = useLocalSearchParams();
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const userId = user?.id;

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizId) return;

      try {
        const api = await apiClient();
        const response = await api.get(`/quizzes/${quizId}`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [quizId]);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedOption === null && !showResultModal) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedOption, showResultModal]);

  useEffect(() => {
    const fetchGameSessionDetails = async () => {
      try {
        const api = await apiClient();
        const response = await api.get(`/games/sessions/${gameSessionId}`);

        const playerTurns = response.data.gameTurns.filter((turn: any) => turn.playerId === userId);
        const opponentTurns = response.data.gameTurns.filter(
          (turn: any) => turn.playerId !== userId
        );

        setScore(playerTurns.filter((turn: any) => turn.isCorrect).length);

        if (opponentTurns.length > 0) {
          setOpponentScore(opponentTurns.filter((turn: any) => turn.isCorrect).length);
          setOpponentStatus('completed');
        } else {
          setOpponentStatus('pending');
        }
      } catch (error) {
        console.error('Error fetching game session details:', error);
      }
    };

    if (showResultModal) {
      fetchGameSessionDetails();
    }
  }, [showResultModal]);

  useEffect(() => {
    if (showResultModal) {
      updateUser();
      const redirectTimer = setTimeout(() => {
        router.push('/(tabs)');
      }, 1500);

      return () => clearTimeout(redirectTimer);
    }
  }, [showResultModal, router, updateUser]);

  const handleOptionPress = async (option: any) => {
    setSelectedOption(option);

    try {
      const api = await apiClient();
      const response = await api.post('/games/submit', {
        gameSessionId: Number(gameSessionId),
        userId: userId,
        questionId: questions[currentQuestionIndex].id,
        answerId: option.id,
      });

      if (response.data.isCorrect) {
        setScore(score + 1);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null);
      setTimer(10);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setShowResultModal(true);
  };

  useEffect(() => {
    if (selectedOption !== null) {
      const nextQuestionTimer = setTimeout(handleNextQuestion, 2000);
      return () => clearTimeout(nextQuestionTimer);
    }
  }, [selectedOption]);

  return (
    <ImageBackground source={require('../assets/mask-group-profile.png')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.topContainer}>
          <Text style={styles.questionCounter}>
            {currentQuestionIndex + 1}/{questions.length}
          </Text>
          <Text style={styles.timer}>Tempo: {timer}s</Text>
        </View>

        <Text style={styles.question}>{questions[currentQuestionIndex]?.content}</Text>
        <View style={styles.optionsContainer}>
          {questions[currentQuestionIndex]?.answers.map((option: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, selectedOption === option && styles.selectedOption]}
              onPress={() => handleOptionPress(option)}
              disabled={selectedOption !== null}>
              <Text style={styles.optionText}>{option.content}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Modal
          visible={showResultModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowResultModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {opponentStatus === 'pending' ? (
                <Text style={styles.modalText}>Waiting for opponent to finish...</Text>
              ) : score > opponentScore ? (
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
                </>
              )}
              <Text style={styles.modalScore}>Your Score: {score}</Text>
              <Text style={styles.modalScore}>
                Opponent's Score: {opponentScore !== null ? opponentScore : 'Pending'}
              </Text>
              <Text style={styles.modalText}>
                You answered {score} out of {questions.length} correctly.
              </Text>
              <Text style={styles.modalText}>
                Your opponent answered {opponentScore !== null ? opponentScore : 'pending'} out of{' '}
                {questions.length} correctly.
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    backgroundColor: '#ffeb3b',
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
