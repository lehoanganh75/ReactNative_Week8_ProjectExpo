import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

interface Task {
  id: string;
  status: boolean;
  email: string;
  edit: boolean;
}

const UserProfileImage = () => {
  const avatarUrl =
    "https://res.cloudinary.com/ddga6y6tm/image/upload/v1741178088/avatar_rlr5jl.png";

  return <Image source={{ uri: avatarUrl }} style={styles.profileImage} />;
};

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <View style={styles.taskItem}>
      <View style={styles.statusBox}>
        <Ionicons
          name={task.status ? "checkbox-outline" : "square-outline"}
          size={24}
          color={task.status ? "#22c55e" : "#888"}
        />
      </View>

      <Text style={[styles.taskText, task.status && styles.taskTextCompleted]}>
        {task.email}
      </Text>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil" size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const userName = params.userName || "Guest";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://68f0d65e0b966ad5003461f8.mockapi.io/api/data"
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <UserProfileImage />
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>Hi {userName}</Text>
            <Text style={styles.subtitle}>Have a grate day a head</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#888" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading tasks...</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TaskItem task={item} />}
            contentContainerStyle={styles.taskList}
          />
        )}
      </View>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push({
              pathname: "/add",
              params: { userName: userName },
            })
          }
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  taskList: {
    paddingVertical: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statusBox: {
    marginRight: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  redBlock: {
    width: 15,
    height: "100%",
    backgroundColor: "red",
    position: "absolute",
    right: 50,
    borderRadius: 5,
  },
  editButton: {
    padding: 5,
    marginLeft: "auto",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#06b6d4",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
