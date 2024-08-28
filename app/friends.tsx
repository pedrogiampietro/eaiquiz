import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '~/hooks/useAuth';
import { apiClient } from '~/services/api';
import Header from './friends/header';
import MatchesList from './friends/matchesList';
import ConversationsList from './friends/conversationsList';
import AddFriendInput from './friends/addFriendInput';
import MessageInput from './friends/messageInput';
import FriendRequestsModal from './friends/friendRequestsModal';
import { styles } from './friends/styles';

const MessagesScreen = () => {
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<any>(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendRequestsCount, setNewFriendRequestsCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    fetchFriendsList();
    fetchFriendRequests();
    fetchLastMessages();
  }, []);

  const fetchFriendsList = async () => {
    try {
      const api = await apiClient();
      const response = await api.get(`/friends/${user?.id}/friends`);
      setMatches(response.data.friends);
    } catch (error) {
      console.error('Erro ao buscar amigos:', error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const api = await apiClient();
      const response = await api.get(`/friends/${user?.id}/requests`);
      setFriendRequests(response.data.requests);
      setNewFriendRequestsCount(response.data.requests.length);
    } catch (error) {
      console.error('Erro ao buscar solicitações de amizade:', error);
    }
  };

  const fetchLastMessages = async () => {
    try {
      const api = await apiClient();
      const response = await api.get(`/messages/lastMessages/${user?.id}`);
      setConversations(response.data.messages);
    } catch (error) {
      console.error('Erro ao buscar últimas mensagens:', error);
    }
  };

  const handleSendMessage = async () => {
    if (selectedFriend && message.trim() !== '') {
      try {
        const api = await apiClient();
        const response = await api.post('/messages/send', {
          senderId: user?.id,
          recipientId: selectedFriend.id,
          content: message,
        });

        console.log('Mensagem enviada:', response.data);
        setMessage('');
        // fetchMessages(user?.id, selectedFriend.id);
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    }
  };

  const handleAddFriend = async () => {
    if (newFriendName.trim() !== '' && user?.id) {
      try {
        const api = await apiClient();

        const { data } = await api.get(`/friends/getByName/${newFriendName}`);
        const recipientId = data.id;

        if (!recipientId) {
          console.error('Amigo não encontrado.');
          return;
        }

        await api.post('/friends/send-request', {
          requesterId: user.id,
          recipientId,
        });

        setNewFriendName('');
        console.log('Solicitação de amizade enviada!');
      } catch (error) {
        console.error('Erro ao enviar solicitação de amizade:', error);
      }
    } else {
      console.error('Nome do amigo ou ID do usuário está faltando.');
    }
  };

  const handleAcceptFriendRequest = async (requestId: number) => {
    try {
      const api = await apiClient();
      await api.post(`/friends/accept-request`, {
        friendshipId: requestId,
      });
      fetchFriendRequests();
    } catch (error) {
      console.error('Erro ao aceitar solicitação de amizade:', error);
    }
  };

  const handleDeclineFriendRequest = async (requestId: number) => {
    try {
      const api = await apiClient();
      await api.post(`/friends/decline-request`, {
        friendshipId: requestId,
      });
      fetchFriendRequests();
    } catch (error) {
      console.error('Erro ao recusar solicitação de amizade:', error);
    }
  };

  const openFriendRequestsModal = () => {
    setModalVisible(true);
    setNewFriendRequestsCount(0);
  };

  return (
    <View style={styles.container}>
      <Header
        onBack={() => router.back()}
        onOpenModal={openFriendRequestsModal}
        newFriendRequestsCount={newFriendRequestsCount}
      />
      <MatchesList
        matches={matches}
        onSelectFriend={(match: any) => {
          setSelectedFriend(match);
          // fetchMessages(user?.id, match.id);
        }}
      />
      <ConversationsList conversations={conversations} />

      <AddFriendInput
        newFriendName={newFriendName}
        setNewFriendName={setNewFriendName}
        handleAddFriend={handleAddFriend}
      />
      {selectedFriend && (
        <MessageInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
      <FriendRequestsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        friendRequests={friendRequests}
        handleAcceptFriendRequest={handleAcceptFriendRequest}
        handleDeclineFriendRequest={handleDeclineFriendRequest}
      />
    </View>
  );
};

export default MessagesScreen;
