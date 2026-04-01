import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  ref,
  onValue,
  runTransaction,
} from 'firebase/database';
import { db } from '../../firebase';

export default function VoteScreen({ navigation }) {
  const [votes, setVotes] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const votesRef = ref(db, 'votes');

    const unsubscribe = onValue(votesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const voteList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setVotes(voteList.reverse());
      } else {
        setVotes([]);
      }

      setPageLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleVote = async (voteId, option) => {
    try {
      const optionCountRef = ref(db, `votes/${voteId}/optionVotes/${option}`);

      await runTransaction(optionCountRef, (currentValue) => {
        return (currentValue || 0) + 1;
      });

      Alert.alert('สำเร็จ', `คุณโหวต "${option}" แล้ว`);
    } catch (error) {
      console.log('vote error:', error);
      Alert.alert('ผิดพลาด', 'โหวตไม่สำเร็จ');
    }
  };

  const renderVoteCard = ({ item }) => {
    const options = item.options || [];
    const optionVotes = item.optionVotes || {};

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        {!!item.description && (
          <Text style={styles.cardDesc}>{item.description}</Text>
        )}

        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleVote(item.id, option)}
          >
            <Text style={styles.optionText}>{option}</Text>
            <Text style={styles.countText}>
              {optionVotes[option] || 0} โหวต
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (pageLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6b00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
      >
        <Text style={styles.backBtn}>← กลับหน้าแรก</Text>
      </TouchableOpacity>

      <Text style={styles.header}>ระบบโหวต</Text>

      <FlatList
        data={votes}
        keyExtractor={(item) => item.id}
        renderItem={renderVoteCard}
        ListEmptyComponent={
          <Text style={styles.emptyText}>ยังไม่มีหัวข้อโหวต</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtn: {
    color: '#ff6b00',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#fff3eb',
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionText: {
    fontWeight: '600',
    fontSize: 15,
  },
  countText: {
    color: '#ff6b00',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
  },
});