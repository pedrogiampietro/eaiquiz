import FontAwesome from '@expo/vector-icons/FontAwesome';
import { forwardRef } from 'react';
import { Pressable, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CustomHeaderHome = () => {
  const navigation = useNavigation() as any;

  const handleAvatarPress = () => {
    navigation.navigate('modal');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>GOOD MORNING</Text>
        <Text style={styles.username}>Pedro Giampietro</Text>
      </View>
      <TouchableOpacity onPress={handleAvatarPress} style={styles.avatarContainer}>
        <Image source={{ uri: 'https://github.com/pedrogiampietro.png' }} style={styles.avatar} />
      </TouchableOpacity>
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
  textContainer: {
    flexDirection: 'column',
    padding: 24,
  },
  greeting: {
    color: '#D3D3D3',
    fontSize: 12,
  },
  username: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#BF83FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  headerRight: {
    marginRight: 15,
  },
});
