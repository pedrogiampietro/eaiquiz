import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { apiClient } from '~/services/api';

export default function MatchHistory({ userId }: any) {
  const [completedMatches, setCompletedMatches] = useState([]);
  const [ongoingMatches, setOngoingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const api = await apiClient();
        const response = await api.get(`/auth/match-history/${userId}`);

        setCompletedMatches(response.data.completedMatches);
        setOngoingMatches(response.data.ongoingMatches);
      } catch (error) {
        console.error('Erro ao carregar histórico de partidas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchHistory();
  }, [userId]);

  const renderCompletedMatchItem = ({ item }: any) => (
    <View style={styles.matchItem}>
      <Text style={styles.matchTitle}>Quiz: {item.quiz.title}</Text>
      <Text style={styles.matchResult}>Status: Completa</Text>
      <Text style={styles.matchDate}>Data: {new Date(item.playedAt).toLocaleDateString()}</Text>
    </View>
  );

  const renderOngoingMatchItem = ({ item }: any) => (
    <View style={styles.matchItem}>
      <Text style={styles.matchTitle}>Quiz: {item.quiz.title}</Text>
      <Text style={styles.matchResult}>Status: {item.status}</Text>
      <Text style={styles.matchDate}>Data: {new Date(item.createdAt).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6A5AE0" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* Lista de Partidas Completas */}
          <Text style={styles.sectionTitle}>Partidas Completas</Text>
          <FlatList
            data={completedMatches}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={renderCompletedMatchItem}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>Nenhuma partida completa encontrada.</Text>
            }
            scrollEnabled={false}
          />

          {/* Lista de Partidas em Andamento */}
          <Text style={styles.sectionTitle}>Partidas em Andamento</Text>
          <FlatList
            data={ongoingMatches}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={renderOngoingMatchItem}
            ListEmptyComponent={
              <Text style={styles.emptyMessage}>Nenhuma partida em andamento encontrada.</Text>
            }
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 20,
    paddingBottom: 100, // Padding extra para evitar que o conteúdo seja coberto por elementos fixos na parte inferior
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  matchItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchResult: {
    fontSize: 14,
    color: '#333',
  },
  matchDate: {
    fontSize: 12,
    color: '#666',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
