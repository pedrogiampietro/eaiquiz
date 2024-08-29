import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ProfileTab = ({ onTabChange }: any) => {
  const [activeTab, setActiveTab] = useState('Badge');

  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.tabsContainer}>
      {['Badge', 'Stats', 'History'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tabButton, activeTab === tab && styles.activeTab]}
          onPress={() => handleTabPress(tab)}>
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
    color: '#6A5AE0',
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6A5AE0',
  },
  activeTabText: {
    color: '#6A5AE0',
  },
});

export default ProfileTab;
