import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserAuth } from '../context/UserAuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function ProfileScreen({ navigation }) {
  const { user, userData, loading, isAdmin } = useUserAuth();

    const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login'); // 👈 เด้งไป Login
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>กำลังโหลด...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>หน้า Profile</Text>
        <Text style={styles.text}>ยังไม่มีข้อมูลผู้ใช้</Text>
        <Text style={styles.text}>กรุณาเข้าสู่ระบบก่อน</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>ไปหน้า Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>หน้า Profile</Text>

      <Text style={styles.text}>ชื่อ: {userData?.name || '-'}</Text>
      <Text style={styles.text}>อีเมล: {userData?.email || '-'}</Text>
      <Text style={styles.text}>บทบาท: {userData?.role || '-'}</Text>

      {isAdmin && (
        <TouchableOpacity style={styles.adminButton}>
          <Text style={styles.buttonText}>เข้าสู่หน้าแอดมิน</Text>
        </TouchableOpacity>
      )}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>ออกจากระบบ</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ff6600',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  adminButton: {
    marginTop: 20,
    backgroundColor: '#ff6600',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
  marginTop: 20,
  backgroundColor: 'red',
  padding: 14,
  borderRadius: 10,
  alignItems: 'center',
},
});