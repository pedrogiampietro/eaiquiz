import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the new package

export default function CreateQuiz() {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [quizGenerated, setQuizGenerated] = useState(false);
  const [quizDetails, setQuizDetails] = useState({ questions: 0, answers: 0 });

  const themes = ['Harry Potter', 'Lord of the Rings', 'Star Wars', 'Marvel Comics']; // Example themes

  const handleGenerateQuiz = () => {
    if (!selectedTheme) {
      Alert.alert('Please select a theme to generate a quiz.');
      return;
    }

    // Simulate generating a quiz
    setTimeout(() => {
      const questions = Math.floor(Math.random() * 10) + 5; // Random questions count
      const answers = questions * 4; // Assume each question has 4 answers

      setQuizDetails({ questions, answers });
      setQuizGenerated(true);
    }, 1000);
  };

  const handleRedirectToQuiz = () => {
    Alert.alert('Redirecting to the quiz...');
    // Navigate to the quiz screen here
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
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
        <TouchableOpacity style={styles.button} onPress={handleGenerateQuiz}>
          <Text style={styles.buttonText}>Generate Quiz</Text>
        </TouchableOpacity>

        {/* Success Message */}
        {quizGenerated && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}>Quiz generated successfully!</Text>
            <Text style={styles.detailsText}>
              {quizDetails.questions} questions and {quizDetails.answers} answers created.
            </Text>

            {/* Redirect Button */}
            <TouchableOpacity style={styles.button} onPress={handleRedirectToQuiz}>
              <Text style={styles.buttonText}>Go to Quiz</Text>
            </TouchableOpacity>
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
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: '#6A5AE0',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
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
});
