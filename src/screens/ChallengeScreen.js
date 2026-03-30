import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengeScreen() {
  const challenges = [
    { title: 'เช็กชื่อเข้าแถว 5 วันติด', point: '+50 คะแนน' },
    { title: 'เข้าร่วมกิจกรรมจิตอาสา', point: '+100 คะแนน' },
    { title: 'ส่งงานครบทุกวิชา', point: '+80 คะแนน' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Challenge</Text>
        <Text style={styles.subtitle}>ภารกิจและกิจกรรมที่นักศึกษาสามารถเข้าร่วมได้</Text>
      </View>

      <View style={styles.scoreCard}>
        <Ionicons name="trophy-outline" size={34} color="#fff" />
        <View style={{ marginLeft: 14 }}>
          <Text style={styles.scoreLabel}>คะแนนสะสม</Text>
          <Text style={styles.scoreValue}>320 คะแนน</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>ภารกิจที่กำลังเปิด</Text>

      {challenges.map((item, index) => (
        <View key={index} style={styles.challengeCard}>
          <View style={styles.challengeLeft}>
            <View style={styles.iconBox}>
              <Ionicons name="flag-outline" size={24} color="#ff6b00" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.challengeTitle}>{item.title}</Text>
              <Text style={styles.challengePoint}>{item.point}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>เข้าร่วม</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
  },
  scoreCard: {
    backgroundColor: '#ff6b00',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#fff',
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 14,
  },
  challengeCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  challengeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff3eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  challengePoint: {
    fontSize: 14,
    color: '#ff6b00',
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: '#ff6b00',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});