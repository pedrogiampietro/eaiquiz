import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from './styles';
import { getInitials } from '~/utils';

const ConversationsList = ({ conversations }: any) => {
  const router = useRouter();

  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push(`/chat?friendId=${item.counterpartId}`)}>
          <View style={styles.conversationContainer}>
            {item.counterpartProfileImage ? (
              <Image
                source={{ uri: item.counterpartProfileImage }}
                style={styles.conversationAvatar}
              />
            ) : (
              <View style={styles.initialsAvatar}>
                <Text style={styles.initialsText}>{getInitials(item.counterpartName)}</Text>
              </View>
            )}
            <View style={styles.conversationContent}>
              <Text style={styles.conversationName}>{item.counterpartName}</Text>
              <Text style={styles.conversationMessage}>{item.content}</Text>
            </View>
            <View style={styles.conversationTimeContainer}>
              <Text style={styles.conversationTime}>
                {new Date(item.createdAt).toLocaleTimeString()}
              </Text>
              {item.allMessagesRead ? (
                <View style={styles.readIndicator} />
              ) : (
                <View style={styles.unreadIndicator} />
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ConversationsList;
