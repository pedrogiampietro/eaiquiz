import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { apiClient } from '~/services/api';
import { getInitials } from '~/utils';

const podiumImage = require('../../assets/podium.png');
const kingIcon = require('../../assets/king-icon.png');
const backgroundO = require('../../assets/(O).png');
const crownIcon = require('../../assets/medals/crown-medal.png');
const silverMedalIcon = require('../../assets/medals/silver-medal.png');
const bronzeMedalIcon = require('../../assets/medals/bronze-medal.png');

const getFlagUri = (countryCode: string) => `https://flagcdn.com/w20/${countryCode}.png`;

export default function Highscores() {
  const [highscores, setHighscores] = useState<any>([]);
  const [activeTab, setActiveTab] = useState<string>('all-time');

  useEffect(() => {
    const fetchHighscores = async () => {
      try {
        const api = await apiClient();
        const response = await api.get(`/highscores/${activeTab}`);
        setHighscores(response.data);
      } catch (error) {
        console.error('Error fetching highscores:', error);
      }
    };
    fetchHighscores();
  }, [activeTab]);

  const renderPodium = () => {
    return (
      <View style={styles.podiumContainer}>
        <ImageBackground source={backgroundO} style={styles.backgroundO}>
          <ImageBackground source={podiumImage} style={styles.podiumImage}>
            {highscores.slice(0, 3).map((player: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.playerPosition,
                  index === 0
                    ? styles.firstPlace
                    : index === 1
                      ? styles.secondPlace
                      : styles.thirdPlace,
                ]}>
                {player?.profileImage ? (
                  <Image source={{ uri: player?.profileImage || '' }} style={styles.playerImage} />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarText}>{getInitials(player.user.name || 'User')}</Text>
                  </View>
                )}

                {index === 0 && <Image source={kingIcon} style={styles.kingIcon} />}
                <Text style={styles.playerName}>{player.user.name}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{player.points} QP</Text>
                </View>
              </View>
            ))}
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setActiveTab('weekly')}>
            <Text style={activeTab === 'weekly' ? styles.tabActive : styles.tabInactive}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('all-time')}>
            <Text style={activeTab === 'all-time' ? styles.tabActive : styles.tabInactive}>
              All Time
            </Text>
          </TouchableOpacity>
        </View>

        {/* Podium with Leaderboard */}
        {renderPodium()}

        <View style={styles.playersList}>
          {highscores.map((player: any, index: number) => (
            <View key={index} style={styles.playerCard}>
              <View style={styles.rankContainer}>
                <View style={styles.rankCircle}>
                  <Text style={styles.playerRank}>{index + 1}</Text>
                </View>
              </View>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarContainer}>
                  {player?.profileImage ? (
                    <Image
                      source={{ uri: player?.profileImage || '' }}
                      style={styles.playerAvatar}
                    />
                  ) : (
                    <View style={styles.avatarFallback}>
                      <Text style={styles.avatarText}>
                        {getInitials(player.user.name || 'User')}
                      </Text>
                    </View>
                  )}
                </View>

                <Image
                  source={{ uri: getFlagUri(player.user.country) }}
                  style={styles.playerCountryIcon}
                />
              </View>
              <View style={styles.playerInfoContainer}>
                <Text style={styles.playerListName}>{player.user.name}</Text>
                <Text style={styles.playerListPoints}>{player.points} QP</Text>
              </View>
              {index === 0 && <Image source={crownIcon} style={styles.medalIcon} />}
              {index === 1 && <Image source={silverMedalIcon} style={styles.medalIcon} />}
              {index === 2 && <Image source={bronzeMedalIcon} style={styles.medalIcon} />}
            </View>
          ))}
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
    color: '#b3ade6',
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
  profileImageWrapper: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#BF83FF',
  },
  avatarFallback: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#5f52c5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
