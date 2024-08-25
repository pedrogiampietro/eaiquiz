import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const CustomHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.headerButton}>
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {}} style={styles.headerButton}>
        <FontAwesome name="cog" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#6A5AE0',
    zIndex: 2,
  },
  headerButton: {
    padding: 10,
  },
});

export default CustomHeader;
