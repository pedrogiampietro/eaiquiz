import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

const AddFriendInput = ({ newFriendName, setNewFriendName, handleAddFriend }: any) => (
  <View style={styles.addFriendContainer}>
    <TextInput
      style={styles.addFriendInput}
      placeholder="Nome do amigo..."
      value={newFriendName}
      onChangeText={setNewFriendName}
    />
    <TouchableOpacity onPress={handleAddFriend} style={styles.addFriendButton}>
      <Text style={styles.addFriendButtonText}>Adicionar</Text>
    </TouchableOpacity>
  </View>
);

export default AddFriendInput;
