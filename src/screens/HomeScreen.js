import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const menus = [
    { title: 'ยื่นคำร้อง', icon: 'document-text-outline' },
    { title: 'ข่าวสาร', icon: 'newspaper-outline' },
    { title: 'กิจกรรม', icon: 'calendar-outline' },
    { title: 'แผนที่', icon: 'location-outline' },
    { title: 'ตารางเรียน', icon: 'grid-outline' },
    { title: 'ติดต่อ', icon: 'call-outline' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.welcome}>ยินดีต้อนรับ</Text>
        <Text style={styles.title}>PNVC Smart Service</Text>
        <Text style={styles.subtitle}>
          ระบบบริการนักศึกษาแบบสะดวกและทันสมัย
        </Text>
      </View>

      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>ประกาศสำคัญ</Text>
          <Text style={styles.bannerText}>
            ติดตามข่าวสาร การแจ้งเตือน และบริการต่าง ๆ ของวิทยาลัยได้ที่นี่
          </Text>
        </View>
        <Ionicons name="notifications-outline" size={32} color="#fff" />
      </View>

      <Text style={styles.sectionTitle}>เมนูบริการ</Text>
      <View style={styles.grid}>
        {menus.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={item.icon} size={24} color="#ff6b00" />
            </View>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>ข่าวล่าสุด</Text>

      <View style={styles.newsCard}>
        <Text style={styles.newsBadge}>แนะนำ</Text>
        <Text style={styles.newsTitle}>เปิดรับสมัครนักศึกษาใหม่ ประจำปีการศึกษา</Text>
        <Text style={styles.newsDesc}>
          สามารถติดตามรายละเอียดการสมัคร ข่าวประชาสัมพันธ์ และกำหนดการต่าง ๆ ได้ในแอป
        </Text>
      </View>

      <View style={styles.newsCard}>
        <Text style={styles.newsTitle}>แจ้งตารางกิจกรรมประจำเดือน</Text>
        <Text style={styles.newsDesc}>
          ตรวจสอบกิจกรรมที่กำลังจะมาถึง และติดตามการเข้าร่วมของนักศึกษาได้สะดวกขึ้น
        </Text>
      </View>
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
  welcome: {
    fontSize: 14,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 6,
  },
  banner: {
    backgroundColor: '#ff6b00',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bannerText: {
    color: '#fff',
    fontSize: 13,
    width: 240,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff3eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  newsBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff3eb',
    color: '#ff6b00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  newsDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
});