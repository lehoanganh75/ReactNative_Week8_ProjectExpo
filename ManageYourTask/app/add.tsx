import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const UserProfileImage = () => {
  const avatarUrl =
    'https://res.cloudinary.com/ddga6y6tm/image/upload/v1741178088/avatar_rlr5jl.png';
  return <Image source={{ uri: avatarUrl }} style={styles.profileImage} />;
};

export default function AddScreen() {
  const router = useRouter();
  const [task, setTask] = useState('');

  const handleFinish = () => {
    if (task.trim() !== '') {
      console.log('Adding new task:', task);
      alert('Task added successfully!');
      router.back(); 
    } else {
      alert('Please enter a task.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <UserProfileImage />
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Hi Twinkle</Text>
            <Text style={styles.subtitle}>Have a grate day a head</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        <Text style={styles.heading}>ADD YOUR JOB</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="document-text-outline" size={20} color="#06b6d4" />
          <TextInput
            style={styles.textInput}
            placeholder="input your job"
            placeholderTextColor="#999"
            value={task}
            onChangeText={setTask}
          />
        </View>

        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>FINISH</Text>
          <Ionicons name="arrow-forward" size={16} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: 'https://res.cloudinary.com/ddga6y6tm/image/upload/v1717833215/notepad_ecl14a.png',
        }}
        style={styles.bottomImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  finishButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06b6d4',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomImage: {
    width: '100%',
    height: 150,
    marginTop: 'auto',
  },
});