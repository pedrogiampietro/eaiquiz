import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';

const FriendRequestsModal = ({
  modalVisible,
  setModalVisible,
  friendRequests,
  handleAcceptFriendRequest,
  handleDeclineFriendRequest,
}: any) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}>
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Solicitações de Amizade</Text>
        <FlatList
          data={friendRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.friendRequestCard}>
              <Text style={styles.friendName}>{item.requester.name}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAcceptFriendRequest(item.id)}>
                  <Text style={styles.acceptButtonText}>Aceitar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.declineButton}
                  onPress={() => handleDeclineFriendRequest(item.id)}>
                  <Text style={styles.declineButtonText}>Recusar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
          <Text style={styles.closeModalButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default FriendRequestsModal;
