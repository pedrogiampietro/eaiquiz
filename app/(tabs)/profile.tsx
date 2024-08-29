import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ProfileTab from 'components/ProfileTab';
import StatsSection from 'components/StatsSection';
import { useAuth } from '~/hooks/useAuth';
import { apiClient } from '~/services/api';
import { getInitials } from '~/utils';
import MatchHistory from '../layouts/match-history';

const maskGroupProfile = require('../../assets/mask-group-profile.png');
const lockedBadge = require('../../assets/badges/locked-badge.png');

const badges = [
  { id: 1, image: require('../../assets/badges/3.png'), obtained: false },
  { id: 2, image: require('../../assets/badges/4.png'), obtained: false },
  { id: 3, image: require('../../assets/badges/5.png'), obtained: false },
  { id: 4, image: require('../../assets/badges/6.png'), obtained: false },
  { id: 5, image: require('../../assets/badges/7.png'), obtained: false },
  { id: 6, image: require('../../assets/badges/8.png'), obtained: false },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Badge');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { logout, user, setUser } = useAuth();

  const changeHeaderImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert('Permissão necessária', 'Permita que sua aplicação acesse as imagens');
      return;
    }

    const { assets, canceled }: any = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (canceled) {
      ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
    } else if (assets && assets.length > 0) {
      setAvatarUri(assets[0].uri);
      await handleSave(assets[0].uri);
    }
  };

  const handleSave = async (uri: string) => {
    setLoading(true);
    const formData = new FormData() as any;
    formData.append('userId', user?.id);
    formData.append('name', user?.name);
    if (uri) {
      formData.append('avatar', {
        uri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      } as any);
    }

    try {
      const api = await apiClient();
      const response = await api.put('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        setUser({
          ...user,
          profileImage: response.data.user.profileImage,
        });
        ToastAndroid.show('Perfil atualizado com sucesso!', ToastAndroid.SHORT);
      } else {
        const errorMessage = response.data.message || 'Erro ao atualizar perfil.';
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      }
    } catch (error: any) {
      const errorText = error.message || 'Erro ao atualizar perfil.';
      ToastAndroid.show(errorText, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Badge':
        return (
          <View style={styles.badgesContainer}>
            {badges.map((badge) => (
              <View key={badge.id} style={styles.badge}>
                <Image source={badge.image} style={styles.badgeIcon} />
                {!badge.obtained && <Image source={lockedBadge} style={styles.lockedBadge} />}
              </View>
            ))}
          </View>
        );
      case 'Stats':
        return <StatsSection />;
      case 'History':
        return <MatchHistory userId={user?.id} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={maskGroupProfile} style={styles.backgroundImage}>
        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <MaterialIcons name="logout" size={30} color="#FFF" />
        </TouchableOpacity>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          {/* Profile Image */}
          <View style={styles.profileImageWrapper}>
            {avatarUri || user?.profileImage ? (
              <Image
                source={{ uri: avatarUri || user?.profileImage || '' }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{getInitials(user?.name || 'User')}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.changeButton} onPress={changeHeaderImage}>
              <Ionicons name="create-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <Text style={styles.profileName}>{user?.name}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <FontAwesome5 name="star" size={20} color="#FFF" />
              <Text style={styles.statLabel}>POINTS</Text>
              <Text style={styles.statValue}>{user?.points}</Text>
            </View>
            <View style={styles.statBox}>
              <FontAwesome5 name="globe" size={20} color="#FFF" />
              <Text style={styles.statLabel}>WORLD RANK</Text>
              <Text style={styles.statValue}>{user?.worldRank}</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialIcons name="location-on" size={20} color="#FFF" />
              <Text style={styles.statLabel}>LOCAL RANK</Text>
              <Text style={styles.statValue}>{user?.localRank}</Text>
            </View>
          </View>

          {/* Tabs */}
          <ProfileTab onTabChange={setActiveTab} />

          {/* Dynamic Content */}
          {renderContent()}
        </View>
      </ImageBackground>
      {loading && <ActivityIndicator size="large" color="#FFF" style={styles.loadingIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A5AE0',
    marginBottom: -40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 10,
  },
  logoutButton: {
    position: 'absolute',
    right: 20,
    backgroundColor: '#6A5AE0',
    padding: 10,
    borderRadius: 20,
  },
  cardContainer: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 50,
    borderRadius: 20,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    elevation: 5,
    flex: 1, // Allow card container to use flex
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
  flagContainer: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 2,
    elevation: 2,
  },
  flagIcon: {
    width: 25,
    height: 25,
  },
  profileName: {
    textAlign: 'center',
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#6A5AE0',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignSelf: 'center',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 5,
  },
  statValue: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    color: '#6A5AE0',
    fontWeight: 'bold',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  badge: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    position: 'relative',
  },
  badgeIcon: {
    width: 52,
    height: 52,
  },
  lockedBadge: {
    position: 'absolute',
    width: 62,
    height: 62,
    tintColor: '#000',
    opacity: 0.7,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -15,
    marginTop: -15,
    zIndex: 20,
  },
  avatarFallback: {
    width: 100,
    height: 100,
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
  changeButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2b1a12',
    borderRadius: 50,
    padding: 5,
  },
});
