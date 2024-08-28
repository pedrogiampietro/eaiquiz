import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomHeader from 'components/CustomHeader';
import { apiClient } from '~/services/api';
import { useAuth } from '~/hooks/useAuth';

export default function CreateQuiz() {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [quizDetails, setQuizDetails] = useState({ questions: 0, answers: 0 });
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const { user } = useAuth();

  const themes = ['Harry Potter', 'Lord of the Rings', 'Star Wars', 'Marvel Comics'];

  const handleGenerateQuiz = async () => {
    if (!selectedTheme) {
      Alert.alert('Please select a theme to generate a quiz.');
      return;
    }

    setLoading(true);

    try {
      const api = await apiClient();
      const response = await api.post('/quizzes/start-custom-game', {
        theme: selectedTheme,
        creatorId: user?.id,
      });

      console.log('response', response);

      if (response.status === 201) {
        setQuizDetails({
          questions: response.data.gameSession.quiz.questions.length,
          answers: response.data.gameSession.quiz.questions.flatMap((q: any) => q.answers).length,
        });
        setInviteLink(response.data.inviteLink);
        setQuizGenerated(true);
      } else if (response.status === 400) {
        Alert.alert('Error', 'Creator ID is required.');
      } else {
        Alert.alert('Error', 'Failed to generate quiz.');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      Alert.alert('Error', 'An error occurred while generating the quiz.');
    } finally {
      setLoading(false);
    }
  };

  const handleShareInvite = async () => {
    try {
      await Share.share({
        message: `Join my quiz on ${selectedTheme}! Click the link to join: ${inviteLink}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share the invite link.');
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.title}>Create Quiz</Text>
        <Text style={styles.instructions}>Select a theme to generate your quiz:</Text>

        {/* Theme Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTheme}
            onValueChange={(itemValue) => setSelectedTheme(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Select a theme" value="" />
            {themes.map((theme, index) => (
              <Picker.Item key={index} label={theme} value={theme} />
            ))}
          </Picker>
        </View>

        {/* Generate Quiz Button */}
        <TouchableOpacity style={styles.button} onPress={handleGenerateQuiz} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Generating...' : 'Generate Quiz'}</Text>
        </TouchableOpacity>

        {/* Success Message */}
        {quizGenerated && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Quiz generated successfully!</Text>
            <Text style={styles.detailsText}>
              {quizDetails.questions} questions and {quizDetails.answers} answers created.
            </Text>

            {/* Share Invite Link */}
            <TouchableOpacity style={styles.button} onPress={handleShareInvite}>
              <Text style={styles.buttonText}>Share Invite Link</Text>
            </TouchableOpacity>

            {/* Display Invite Link */}
            <Text style={styles.inviteLinkText}>{inviteLink}</Text>
          </View>
        )}
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
    paddingBottom: 20,
    backgroundColor: '#6A5AE0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#6A5AE0',
    fontWeight: 'bold',
  },
  successMessage: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A5AE0',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  inviteLinkText: {
    fontSize: 14,
    color: '#6A5AE0',
    marginTop: 10,
    textAlign: 'center',
  },
});
