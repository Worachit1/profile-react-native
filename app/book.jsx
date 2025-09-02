import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { useTheme } from "./context/ThemeContext";
import { useUser } from "./context/UserContext";

const Book = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { color, isDarkMode } = useTheme();
  const { isLoggedIn, user } = useUser();
  // function to fetch book data
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.115.194:3333/api/books?page=1&limit=10");
      const result = await response.json();
      
      if (response.ok) {
        console.log("Book data fetched successfully:", result.books);
        setData(result.books || []);
      } else {
        console.error("Error response:", result);
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  const handleAddBook = () => {
    if (!isLoggedIn) {
      Alert.alert(
        "จำเป็นต้องเข้าสู่ระบบ",
        "กรุณาเข้าสู่ระบบก่อนเพิ่มหนังสือ",
        [
          { text: "ยกเลิก", style: "cancel" },
          { text: "เข้าสู่ระบบ", onPress: () => router.push("/singin") }
        ]
      );
    } else {
      router.push("/book_new");
    }
  };

  useEffect(() => {
    console.log("Book component mounted");
    fetchBooks();
  }, []);
  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.bookCard, { backgroundColor: color.card, borderColor: color.border }]}
      onPress={() => {
        router.push(`/book_detail?id=${item._id}&title=${encodeURIComponent(item.title)}`);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.bookImageContainer}>
        <Image 
          source={require('../assets/icon.png')}
          style={styles.bookImage}
        />
      </View>
      
      <View style={styles.bookInfo}>
        <Text style={[styles.bookTitle, { color: color.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.bookAuthor, { color: color.textSecondary }]} numberOfLines={1}>
          โดย {item.author}
        </Text>
        {item.description && (
          <Text style={[styles.bookDescription, { color: color.textSecondary }]} numberOfLines={3}>
            {item.description}
          </Text>
        )}
        {item.price && (
          <Text style={[styles.bookPrice, { color: color.primary }]}>
            ฿{item.price}
          </Text>
        )}
      </View>
      
      <View style={styles.arrowContainer}>
        <Text style={[styles.arrow, { color: color.textSecondary }]}>›</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: color.background }]}>
        <ActivityIndicator size="large" color={color.primary} />
        <Text style={[styles.loadingText, { color: color.text }]}>กำลังโหลดหนังสือ...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: color.text }]}>📚 ห้องสมุดหนังสือ</Text>
          {isLoggedIn && (
            <Text style={[styles.userInfo, { color: color.textSecondary }]}>
              👤 {user?.username || 'ผู้ใช้'}
            </Text>
          )}
        </View>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: color.surface, borderWidth: 1, borderColor: color.border }]}
          onPress={handleAddBook}
        >
          <Text style={[styles.addButtonText, { color: color.text }]}>
            {isLoggedIn ? '+ เพิ่มหนังสือ' : '🔒 เข้าสู่ระบบ'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Books List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id || item.id?.toString() || Math.random().toString()}
        renderItem={renderBookItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[color.primary]}
            tintColor={color.primary}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: color.textSecondary }]}>
              ยังไม่มีหนังสือในห้องสมุด
            </Text>
            <Text style={[styles.emptySubText, { color: color.textSecondary }]}>
              ดึงลงเพื่ออัปเดต หรือเพิ่มหนังสือใหม่
            </Text>
          </View>
        )}
      />
    </View>
  );
};
export default Book;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 12,
    marginTop: 2,
  },
  addButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  bookCard: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImageContainer: {
    marginRight: 15,
  },
  bookImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  bookDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  arrow: {
    fontSize: 24,
    fontWeight: '300',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    textAlign: 'center',
  },
});