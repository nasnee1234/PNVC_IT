import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>บัตรนักศึกษา</Text>

      <View style={styles.card}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.college}>PNVC</Text>
            <Text style={styles.cardLabel}>STUDENT CARD</Text>
          </View>
          <Ionicons name="school-outline" size={30} color="#fff" />
        </View>

        <View style={styles.middleRow}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100x120.png?text=PHOTO' }}
            style={styles.avatar}
          />

          <View style={styles.infoBox}>
            <Text style={styles.name}>นัสนี</Text>
            <Text style={styles.detail}>รหัสนักศึกษา: 66319010001</Text>
            <Text style={styles.detail}>แผนก: เทคโนโลยีสารสนเทศ</Text>
            <Text style={styles.detail}>ระดับชั้น: ปวส.</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.expire}>Valid Until 2027</Text>
          <Text style={styles.id}>#PNVC-001</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>ข้อมูลเพิ่มเติม</Text>
        <Text style={styles.infoText}>สถานะ: กำลังศึกษา</Text>
        <Text style={styles.infoText}>เบอร์โทร: 08X-XXX-XXXX</Text>
        <Text style={styles.infoText}>อีเมล: student@pnvc.ac.th</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: '#f6f8fb',
    flexGrow: 1,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1b2a4a',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  college: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardLabel: {
    color: '#d7e3ff',
    fontSize: 12,
    marginTop: 4,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 95,
    height: 115,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginRight: 16,
  },
  infoBox: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    color: '#d7e3ff',
    fontSize: 13,
    marginBottom: 6,
  },
  bottomRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expire: {
    color: '#fff',
    fontSize: 12,
  },
  id: {
    color: '#fff',
    fontSize: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },
  infoText: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
  },
});