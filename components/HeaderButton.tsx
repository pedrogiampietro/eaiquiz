import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { forwardRef } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useAuth } from '../hooks/useAuth';

const calculateProgress = (points: number) => {
  const maxPoints = 100;
  const progress = (points % maxPoints) / maxPoints;
  return `${progress * 100}%`;
};

export const CustomHeaderHome = () => {
  const { user } = useAuth();

  return (
    <View style={styles.headerContainer}>
      {/* Avatar e informações do usuário */}
      <View style={styles.userContainer}>
        <Image
          source={require('../assets/ui/ui-profile-avatar.png')}
          style={styles.avatarBackground}
        />
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://github.com/pedrogiampietro.png' }}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.points}>{user?.points}</Text>
          <Text style={styles.username}>{user?.name}</Text>

          {/* Barra de Progresso */}
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: calculateProgress(user?.points || 0) } as any]}
            />
          </View>

          <Text style={[styles.levelText, { right: user?.level === 1 ? 143 : 150 }]}>
            {user?.level}
          </Text>
        </View>
      </View>

      {/* Cristais e Moedas */}
      <View style={styles.resourcesContainer}>
        <View style={styles.resourceItem}>
          <Image
            source={require('../assets/ui/ui-gem-container.png')}
            style={styles.resourceIcon}
          />
          <Text style={styles.resourceText}>10</Text>
        </View>
        <View style={styles.resourceItem}>
          <Image
            source={require('../assets/ui/ui-gold-container.png')}
            style={styles.resourceIcon}
          />
          <Text style={styles.resourceText}>934</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6A5AE0',
    padding: 15,
    paddingTop: 50,
  },
  userContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  avatarImage: {
    width: 30,
    height: 30,
    left: -5,
    borderRadius: 5,
  },
  avatarBackground: {
    width: 149,
    height: 48,
    resizeMode: 'contain',
  },
  userInfoContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  points: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    left: -85,
    bottom: -9,
  },
  username: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
    bottom: -8,
    left: -110,
  },
  progressContainer: {
    width: 50,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 2,
    marginBottom: 2,
    left: -110,
    bottom: -5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00FF00',
  },
  levelText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    right: 150,
    bottom: 6,
  },
  resourcesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceIcon: {
    width: 72,
    height: 34,
    resizeMode: 'contain',
  },
  resourceText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    left: -35,
    bottom: 3,
  },
  headerRight: {
    marginRight: 15,
  },
});

export const HeaderButton = forwardRef<typeof Pressable, { onPress?: () => void }>(
  ({ onPress }, ref: any) => {
    return (
      <Pressable onPress={onPress} ref={ref}>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={28}
            color="gray"
            style={[
              styles.headerRight,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          />
        )}
      </Pressable>
    );
  }
);
