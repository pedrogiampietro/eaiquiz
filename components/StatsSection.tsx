import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const maskGroupStats = require('../assets/mask-group-stats.png');

const StatsSection = () => {
  const progress = 37;
  const total = 50;
  const percentage = (progress / total) * 100;

  const radius = 70;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Card with Background Image */}
        <ImageBackground source={maskGroupStats} style={styles.cardBackground}>
          {/* Title and Subtitle */}
          <Text style={styles.statsTitle}>You have played a total</Text>
          <Text style={styles.statsSubtitle}>24 quizzes this month!</Text>

          {/* Progress Ring Section */}
          <View style={styles.progressRingSection}>
            {/* SVG Progress Ring */}
            <Svg width={radius * 2} height={radius * 2}>
              <G rotation="-90" origin={`${radius}, ${radius}`}>
                {/* Background Circle */}
                <Circle
                  cx={radius}
                  cy={radius}
                  r={radius}
                  stroke="#fff"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Foreground Circle */}
                <Circle
                  cx={radius}
                  cy={radius}
                  r={radius}
                  stroke="#6A5AE0"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </G>
            </Svg>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>
                {progress}/{total}
              </Text>
              <Text style={styles.progressSubtext}>quiz played</Text>
            </View>
          </View>

          {/* Stats Boxes */}
          <View style={styles.quizStats}>
            <View style={styles.quizStatBox}>
              <Text style={styles.quizStatNumber}>5</Text>
              <Text style={styles.quizStatLabel}>Quiz Created</Text>
            </View>
            <View style={styles.quizStatBox}>
              <Text style={styles.quizStatNumber}>21</Text>
              <Text style={styles.quizStatLabel}>Quiz Won</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Category Performance Card */}
        <View style={styles.categoryStatsCard}>
          <Text style={styles.categoryTitle}>Top performance by category</Text>
          <View style={styles.categoryBars}>
            {/* Example data for category performance */}
            {[
              { category: 'Math', progress: 30, total: 100 },
              { category: 'Sports', progress: 80, total: 100 },
              { category: 'Music', progress: 60, total: 100 },
            ].map((item, index) => (
              <View key={index} style={styles.categoryBar}>
                <Text style={styles.categoryBarLabel}>{item.category}</Text>
                <View style={styles.barContainer}>
                  <View
                    style={[styles.filledBar, { width: `${(item.progress / item.total) * 100}%` }]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {},
  cardBackground: {
    borderRadius: 15,
    overflow: 'hidden',
    padding: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 5,
  },
  statsSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A5AE0',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressRingSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  progressSubtext: {
    fontSize: 14,
    color: '#999',
  },
  quizStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quizStatBox: {
    width: '45%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  quizStatNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A5AE0',
    marginBottom: 5,
  },
  quizStatLabel: {
    fontSize: 14,
    color: '#666',
  },
  categoryStatsCard: {
    backgroundColor: '#6A5AE0',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  categoryBars: {},
  categoryBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryBarLabel: {
    fontSize: 14,
    color: '#fff',
    width: 70,
  },
  barContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  filledBar: {
    height: '100%',
    backgroundColor: '#A9ADF3',
  },
});

export default StatsSection;
