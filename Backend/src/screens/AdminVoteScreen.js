import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  ref,
  push,
  set,
  onValue,
  update,
  remove,
} from 'firebase/database';
import { db } from '../../../firebase';
import { useUserAuth } from '../../../src/context/UserAuthContext';

export default function AdminVoteScreen({ navigation }) {
  const { isAdmin } = useUserAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [optionsText, setOptionsText] = useState('เข้าร่วม,ไม่เข้าร่วม');
  const [votes, setVotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const votesRef = ref(db, 'votes');

    const unsubscribe = onValue(votesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setVotes(list.reverse());
      } else {
        setVotes([]);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isAdmin) {
    return (
      <View style={styles.center}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        >
          <Text style={styles.backBtn}>← กลับหน้าแรก</Text>
        </TouchableOpacity>

        <Text style={styles.noAccess}>คุณไม่มีสิทธิ์เข้าใช้งานหน้านี้</Text>
      </View>
    );
  }

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setOptionsText('เข้าร่วม,ไม่เข้าร่วม');
    setEditingId(null);
  };

  const parseOptions = (text) => {
    return text
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const handleSaveVote = async () => {
    if (!title.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกหัวข้อโหวต');
      return;
    }

    const options = parseOptions(optionsText);

    if (options.length < 2) {
      Alert.alert('แจ้งเตือน', 'กรุณาใส่ตัวเลือกอย่างน้อย 2 ตัวเลือก');
      return;
    }

    const optionVotes = {};
    options.forEach((option) => {
      optionVotes[option] = 0;
    });

    try {
      if (editingId) {
        await update(ref(db, `votes/${editingId}`), {
          title: title.trim(),
          description: description.trim(),
          options,
        });

        Alert.alert('สำเร็จ', 'แก้ไขหัวข้อโหวตแล้ว');
      } else {
        const newVoteRef = push(ref(db, 'votes'));

        await set(newVoteRef, {
          title: title.trim(),
          description: description.trim(),
          options,
          optionVotes,
          userVotes: {},
          createdAt: Date.now(),
        });

        Alert.alert('สำเร็จ', 'เพิ่มหัวข้อโหวตแล้ว');
      }

      resetForm();
    } catch (error) {
      console.log('save vote error:', error);
      Alert.alert('ผิดพลาด', 'บันทึกข้อมูลไม่สำเร็จ');
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title || '');
    setDescription(item.description || '');
    setOptionsText((item.options || []).join(','));
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'ยืนยันการลบ',
      'คุณต้องการลบหัวข้อโหวตนี้ใช่หรือไม่',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: async () => {
            try {
              await remove(ref(db, `votes/${id}`));
              Alert.alert('สำเร็จ', 'ลบหัวข้อโหวตแล้ว');
            } catch (error) {
              console.log('delete vote error:', error);
              Alert.alert('ผิดพลาด', 'ลบข้อมูลไม่สำเร็จ');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.voteCard}>
      <Text style={styles.voteTitle}>{item.title}</Text>

      {!!item.description && (
        <Text style={styles.voteDesc}>{item.description}</Text>
      )}

      <Text style={styles.optionLabel}>
        ตัวเลือก: {(item.options || []).join(' / ')}
      </Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionBtn, styles.editBtn]}
          onPress={() => handleEdit(item)}
        >
          <Text style={styles.actionText}>แก้ไข</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.actionText}>ลบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
      >
        <Text style={styles.backBtn}>← กลับหน้าแรก</Text>
      </TouchableOpacity>

      <Text style={styles.header}>จัดการหัวข้อโหวต (Admin)</Text>

      <View style={styles.formCard}>
        <TextInput
          style={styles.input}
          placeholder="หัวข้อโหวต"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="รายละเอียด"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TextInput
          style={styles.input}
          placeholder="ตัวเลือก คั่นด้วยลูกน้ำ เช่น เข้าร่วม,ไม่เข้าร่วม"
          value={optionsText}
          onChangeText={setOptionsText}
        />

        <View style={styles.topActionRow}>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveVote}>
            <Text style={styles.saveBtnText}>
              {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มหัวข้อโหวต'}
            </Text>
          </TouchableOpacity>

          {editingId && (
            <TouchableOpacity style={styles.cancelBtn} onPress={resetForm}>
              <Text style={styles.cancelBtnText}>ยกเลิก</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={votes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
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
    backgroundColor: '#f6f8fb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backBtn: {
    color: '#ff6b00',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noAccess: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    backgroundColor: '#f9fafc',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  topActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveBtn: {
    backgroundColor: '#ff6b00',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelBtn: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  cancelBtnText: {
    color: '#333',
    fontWeight: 'bold',
  },
  voteCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  voteTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  voteDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
  },
  actionBtn: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  editBtn: {
    backgroundColor: '#4a90e2',
  },
  deleteBtn: {
    backgroundColor: '#ff3b30',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});