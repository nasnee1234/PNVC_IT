import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useUserAuth } from '../context/UserAuthContext';
import LoginScreen from './LoginScreen';

export default function ProfileScreen({ navigation }) {
  const { user, loading, logOut, isAdmin } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      Alert.alert('สำเร็จ', 'ออกจากระบบแล้ว');
    } catch (error) {
      console.log(error);
      Alert.alert('ผิดพลาด', 'ออกจากระบบไม่สำเร็จ');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff7a00" />
        <Text style={{ marginTop: 10 }}>กำลังโหลด...</Text>
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>

        <Text style={styles.title}>โปรไฟล์ผู้ใช้</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>อีเมล</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>UID</Text>
          <Text style={styles.value}>{user.uid}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>สิทธิ์การใช้งาน</Text>
          <Text style={styles.value}>{isAdmin ? 'Admin' : 'User'}</Text>
        </View>

        {isAdmin && (
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('AdminVote')}
          >
            <Text style={styles.adminButtonText}>ไปหน้าจัดการโหวต</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ff7a00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#f8f9fb',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#111',
    fontWeight: '600',
  },
  adminButton: {
    marginTop: 6,
    backgroundColor: '#4a90e2',
    width: '100%',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 6,
    backgroundColor: '#ff3b30',
    width: '100%',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});