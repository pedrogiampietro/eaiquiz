import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';

const Header = ({ onBack, onOpenModal, newFriendRequestsCount }: any) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack}>
      <FontAwesome name="chevron-left" size={24} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.title}>Messages</Text>
    <TouchableOpacity onPress={onOpenModal} style={styles.friendRequestIcon}>
      <FontAwesome name="user-plus" size={24} color="#fff" />
      {newFriendRequestsCount > 0 && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationBadgeText}>{newFriendRequestsCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

export default Header;
