import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserAuth } from '../context/UserAuthContext';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { isAdmin } = useUserAuth();

  const userMenus = [
    { title: 'ระบบโหวต', icon: 'checkmark-done-outline' },
    { title: 'กรอกแผนการเรียน', icon: 'create-outline' },
    { title: 'บันทึกคะแนนผลการเรียน', icon: 'school-outline' },
    { title: 'ติดตามการฝึกงาน', icon: 'briefcase-outline' },
  ];

  const adminMenus = [
    { title: 'จัดการโหวต', icon: 'settings-outline' },
  ];

  const menus = isAdmin ? [...userMenus, ...adminMenus] : userMenus;

  const ITEMS_PER_ROW = 4;

  const rows = [];
  for (let i = 0; i < menus.length; i += ITEMS_PER_ROW) {
    rows.push(menus.slice(i, i + ITEMS_PER_ROW));
  }

  const handleMenuPress = (item) => {
    if (item.title === 'ระบบโหวต') {
      navigation.navigate('Vote');
      return;
    }

    if (item.title === 'กรอกแผนการเรียน') {
      navigation.navigate('StudyPlan');
      return;
    }

    if (item.title === 'บันทึกคะแนนผลการเรียน') {
      navigation.navigate('Score');
      return;
    }

    if (item.title === 'ติดตามการฝึกงาน') {
      navigation.navigate('Internship');
      return;
    }

    if (item.title === 'จัดการโหวต') {
      navigation.navigate('AdminVote');
      return;
    }
  };

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
          <Text style={styles.bannerTitle}>ระบบหลักของโครงการ</Text>
          <Text style={styles.bannerText}>
            รวมระบบโหวต แผนการเรียน คะแนนผลการเรียน และติดตามการฝึกงาน
          </Text>
        </View>
        <Ionicons name="apps-outline" size={32} color="#fff" />
      </View>

      <Text style={styles.sectionTitle}>
        เมนูบริการ {isAdmin ? '(Admin)' : '(User)'}
      </Text>

      <View style={styles.menuWrapper}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex}>
            <View style={styles.row}>
              {row.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  activeOpacity={0.8}
                  onPress={() => handleMenuPress(item)}
                >
                  <View style={styles.circle}>
                    <Ionicons name={item.icon} size={26} color="#ff6b00" />
                  </View>
                  <Text style={styles.menuText}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {rowIndex !== rows.length - 1 && <View style={styles.stageLine} />}
          </View>
        ))}
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
  menuWrapper: {
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  menuItem: {
    width: (width - 52) / 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#d8d8d8',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    lineHeight: 20,
  },
  stageLine: {
    height: 1.2,
    backgroundColor: '#222',
    opacity: 0.35,
    width: '100%',
  },
});