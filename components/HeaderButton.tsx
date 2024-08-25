import FontAwesome from '@expo/vector-icons/FontAwesome';
import { forwardRef } from 'react';
import { Pressable, StyleSheet, View, Text, Image } from 'react-native';

export const CustomHeaderHome = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: 'https://github.com/pedrogiampietro.png' }} style={styles.avatar} />
      </View>

      <View style={styles.centerContainer}>
        <Text style={styles.username}>Pedro</Text>
        <View style={styles.levelPointsContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
            <Text style={styles.progressText}>12</Text>
          </View>
        </View>
      </View>

      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Points 231</Text>
      </View>
    </View>
  );
};

export const HeaderButton = forwardRef<typeof Pressable, { onPress?: () => void }>(
  ({ onPress }, ref: any) => {
    return (
      <Pressable onPress={onPress} ref={ref}>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={25}
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

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6A5AE0',
    padding: 10,
    paddingTop: 40,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#A9ADF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  username: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  levelPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: 100,
    height: 20,
    position: 'relative',
  },
  progressFill: {
    backgroundColor: '#A9ADF3',
    width: '50%',
    height: '100%',
  },
  progressText: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -10 }],
    color: '#000',
    fontWeight: 'bold',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    marginRight: 15,
  },
});
