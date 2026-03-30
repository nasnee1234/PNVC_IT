import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        <Ionicons name="camera-outline" size={80} color="#bbb" />
        <Text style={styles.previewText}>พื้นที่แสดงกล้อง</Text>
      </View>

      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.smallButton}>
          <Ionicons name="images-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton}>
          <View style={styles.captureInner} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallButton}>
          <Ionicons name="camera-reverse-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
  },
  preview: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 30,
    borderRadius: 24,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: '#bbb',
    fontSize: 16,
    marginTop: 12,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  smallButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 5,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#ff6b00',
  },
});