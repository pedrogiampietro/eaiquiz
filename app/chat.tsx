import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '~/hooks/useAuth';
import { apiClient } from '~/services/api';
import { styles } from './friends/styles';

const ChatScreen = () => {
  const route = useRoute() as any;
  const navigation = useNavigation();
  const { user } = useAuth();
  const friendId = route.params?.friendId;

  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (friendId) {
      fetchMessages();
    }
  }, [friendId]);

  const fetchMessages = async () => {
    if (!user?.id || !friendId) return;

    try {
      const api = await apiClient();
      const response = await api.get(`/messages/${user.id}/${friendId}`);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const api = await apiClient();
      const response = await api.post('/messages/send', {
        senderId: user?.id,
        recipientId: Number(friendId),
        content: newMessage,
      });

      setMessages((prevMessages: any) => [...prevMessages, response.data.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  const renderMessageItem = ({ item }: any) => {
    const isSentByUser = item.senderId === user?.id;

    // Se a mensagem é enviada pelo usuário, use o perfil do usuário; caso contrário, use o perfil do amigo
    const displayProfileImage = isSentByUser ? user?.profileImage : item.sender?.profileImage;
    const displayName = isSentByUser ? user?.name : item.sender?.name;

    return (
      <View style={styles.messageContainer}>
        {/* Avatar e Nome do Remetente */}
        {displayProfileImage ? (
          <Image source={{ uri: displayProfileImage }} style={styles.defaultAvatar} />
        ) : (
          <View style={styles.defaultAvatar}>
            <Text style={styles.avatarText}>{displayName?.[0]}</Text>
          </View>
        )}

        {/* Nome e Conteúdo da Mensagem */}
        <View style={isSentByUser ? styles.sentMessage : styles.receivedMessage}>
          <Text style={styles.messageSender}>{displayName}</Text>
          <Text style={styles.messageText}>{item.content}</Text>
          <Text style={styles.messageTime}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar e nome do amigo */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.friendName}>
          {messages.length > 0
            ? messages.find((message: any) => message.senderId !== user?.id)?.sender.name
            : ''}
        </Text>
      </View>

      {/* Lista de Mensagens */}
      <FlatList
        data={messages}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={renderMessageItem}
        inverted
      />

      {/* Input para nova mensagem */}
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          placeholder="Digite uma mensagem..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
