import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';

const MessageInput = ({ message, setMessage, handleSendMessage }: any) => (
  <View style={styles.messageInputContainer}>
    <TextInput
      style={styles.messageInput}
      placeholder="Type a message..."
      value={message}
      onChangeText={setMessage}
    />
    <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
      <FontAwesome name="send" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);

export default MessageInput;
