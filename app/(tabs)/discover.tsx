import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, ImageBackground } from 'react-native';

const podiumImage = require('../../assets/podium.png');
const kingIcon = require('../../assets/king-icon.png');
const backgroundO = require('../../assets/(O).png');
const crownIcon = require('../../assets/medals/crown-medal.png');
const silverMedalIcon = require('../../assets/medals/silver-medal.png');
const bronzeMedalIcon = require('../../assets/medals/bronze-medal.png');

const getFlagUri = (countryCode: string) => `https://flagcdn.com/w20/${countryCode}.png`;

export default function Discover() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <Text style={styles.tabActive}>Weekly</Text>
          <Text style={styles.tabInactive}>All Time</Text>
        </View>

        {/* Highlight Box */}
        <View style={styles.highlightBox}>
          <Text style={styles.highlightText}>#4</Text>
          <Text style={styles.highlightSubtext}>
            You are doing better than 60% of other players!
          </Text>
        </View>

        {/* Podium with Leaderboard */}
        <View style={styles.podiumContainer}>
          <ImageBackground source={backgroundO} style={styles.backgroundO}>
            <ImageBackground source={podiumImage} style={styles.podiumImage}>
              {/* Player 1 - Center */}
              <View style={[styles.playerPosition, styles.firstPlace]}>
                <Image
                  source={{ uri: 'https://github.com/pedrogiampietro.png' }}
                  style={styles.playerImage}
                />
                <Image source={kingIcon} style={styles.kingIcon} />
                <Text style={styles.playerName}>Pedro</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>2,569 QP</Text>
                </View>
              </View>

              {/* Player 2 - Left */}
              <View style={[styles.playerPosition, styles.secondPlace]}>
                <Image
                  source={{ uri: 'https://github.com/pedrogiampietro.png' }}
                  style={styles.playerImage}
                />
                <Text style={styles.playerName}>Pedro</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>1,469 QP</Text>
                </View>
              </View>

              {/* Player 3 - Right */}
              <View style={[styles.playerPosition, styles.thirdPlace]}>
                <Image
                  source={{ uri: 'https://github.com/pedrogiampietro.png' }}
                  style={styles.playerImage}
                />
                <Text style={styles.playerName}>Pedro</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>1,053 QP</Text>
                </View>
              </View>
            </ImageBackground>
          </ImageBackground>
        </View>
      </View>

      <View style={styles.playersList}>
        {[
          { rank: 1, name: 'Madelyn Dias', points: '590 points', country: 'br' },
          { rank: 2, name: 'Madelyn Dias', points: '590 points', country: 'pt' },
          { rank: 3, name: 'Madelyn Dias', points: '590 points', country: 'in' },
          { rank: 4, name: 'Madelyn Dias', points: '590 points', country: 'in' },
          { rank: 5, name: 'Zain Vaccaro', points: '448 points', country: 'it' },
          { rank: 6, name: 'Skylar Geidt', points: '410 points', country: 'fr' },
        ].map((player, index) => (
          <View key={index} style={styles.playerCard}>
            <View style={styles.rankContainer}>
              <View style={styles.rankCircle}>
                <Text style={styles.playerRank}>{player.rank}</Text>
              </View>
            </View>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://github.com/pedrogiampietro.png' }}
                style={styles.playerAvatar}
              />
              <Image
                source={{ uri: getFlagUri(player.country) }}
                style={styles.playerCountryIcon}
              />
            </View>
            <View style={styles.playerInfoContainer}>
              <Text style={styles.playerListName}>{player.name}</Text>
              <Text style={styles.playerListPoints}>{player.points}</Text>
            </View>
            {player.rank === 1 && <Image source={crownIcon} style={styles.medalIcon} />}
            {player.rank === 2 && <Image source={silverMedalIcon} style={styles.medalIcon} />}
            {player.rank === 3 && <Image source={bronzeMedalIcon} style={styles.medalIcon} />}
          </View>
        ))}
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
  },
  container: {
    backgroundColor: '#6A5AE0',
    paddingHorizontal: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#6A5AE0',
    padding: 10,
    borderRadius: 20,
  },
  tabInactive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A5AE0',
    padding: 10,
  },
  highlightBox: {
    backgroundColor: '#FFA500',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  highlightText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  highlightSubtext: {
    fontSize: 16,
    color: '#FFF',
  },
  podiumContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  backgroundO: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  podiumImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerPosition: {
    position: 'absolute',
    alignItems: 'center',
  },
  firstPlace: {
    top: -20,
    left: '50%',
    marginLeft: -30,
  },
  secondPlace: {
    bottom: 170,
    left: 10,
  },
  thirdPlace: {
    bottom: 140,
    right: 10,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  kingIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -20,
    left: '50%',
    marginLeft: -15,
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 5,
  },
  badge: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6A5AE0',
  },
  playersList: {
    height: '100%',
    marginTop: -50,
    padding: 20,
    marginHorizontal: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#C4D0FB',
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    height: 90,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  rankCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6A5AE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 10,
  },
  playerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  playerCountryIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: -2,
    right: -5,
  },
  playerInfoContainer: {
    flex: 1,
  },
  playerListName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  playerListPoints: {
    fontSize: 12,
    color: '#666',
  },
  medalIcon: {
    width: 42,
    height: 42,
    marginLeft: 10,
  },
});
