import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ScoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
      >
        <Text style={styles.backBtn}>← กลับหน้าแรก</Text>
      </TouchableOpacity>

      <Text style={styles.title}>ระบบบันทึกคะแนนผลการเรียน</Text>
      <Text style={styles.subtitle}>อ้างอิงตามแผนการเรียน</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>หน้านี้เตรียมไว้สำหรับ</Text>
        <Text style={styles.cardText}>- บันทึกคะแนนรายวิชา</Text>
        <Text style={styles.cardText}>- แสดงผลการเรียน</Text>
        <Text style={styles.cardText}>- เชื่อมกับข้อมูลแผนการเรียน</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fb',
    padding: 16,
  },
  backBtn: {
    color: '#ff6b00',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },
  cardText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
});