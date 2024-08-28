import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

const MatchesList = ({ matches, onSelectFriend }: any) => {
  // Função para obter as iniciais do nome
  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map((n) => n[0]).join('');
    return initials;
  };

  return (
    <View style={styles.matchesContainer}>
      <Text style={styles.subtitle}>Amizades</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {matches.map((match: any) => (
          <TouchableOpacity
            key={match.id}
            style={styles.matchAvatarContainer}
            onPress={() => onSelectFriend(match)}>
            {match.image ? (
              <Image source={{ uri: match.image }} style={styles.matchAvatar} />
            ) : (
              <View style={styles.initialsAvatar}>
                <Text style={styles.initialsText}>{getInitials(match.requester.name)}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default MatchesList;
