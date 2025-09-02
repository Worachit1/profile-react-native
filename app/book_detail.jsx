import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useTheme } from "./context/ThemeContext";

const BookDetail = () => {
  const { id, title } = useLocalSearchParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { color } = useTheme();

  const fetchBookDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://192.168.115.194:3333/api/books/${id}`);
      const result = await response.json();
      
      if (response.ok) {
        console.log("Book detail fetched:", result.book);
        setBook(result.book);
      } else {
        console.error("Error response:", result);
        Alert.alert("ข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลหนังสือได้");
      }
    } catch (error) {
      console.error("Error fetching book detail:", error);
      Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/book_edit?id=${id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      "ยืนยันการลบ",
      `คุณต้องการลบหนังสือ "${book?.title}" ใช่หรือไม่?`,
      [
        { text: "ยกเลิก", style: "cancel" },
        { 
          text: "ลบ", 
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.115.194:3333/api/books/${id}`, {
                method: 'DELETE'
              });
              
              if (response.ok) {
                Alert.alert("สำเร็จ", "ลบหนังสือเรียบร้อยแล้ว", [
                  { text: "ตกลง", onPress: () => router.back() }
                ]);
              } else {
                Alert.alert("ข้อผิดพลาด", "ไม่สามารถลบหนังสือได้");
              }
            } catch (error) {
              console.error("Error deleting book:", error);
              Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการลบหนังสือ");
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    if (id) {
      fetchBookDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: color.background }]}>
        <ActivityIndicator size="large" color={color.primary} />
        <Text style={[styles.loadingText, { color: color.text }]}>กำลังโหลด...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: color.background }]}>
        <Text style={[styles.errorText, { color: color.textSecondary }]}>ไม่พบข้อมูลหนังสือ</Text>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: color.primary }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>กลับ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Book Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/icon.png')}
            style={styles.bookImage}
          />
        </View>

        {/* Book Info */}
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: color.text }]}>{book.title}</Text>
          <Text style={[styles.author, { color: color.textSecondary }]}>โดย {book.author}</Text>
          
          {book.price && (
            <View style={[styles.priceContainer, { backgroundColor: color.primary + '20' }]}>
              <Text style={[styles.price, { color: color.primary }]}>฿{book.price}</Text>
            </View>
          )}

          {book.category && (
            <View style={styles.categoryContainer}>
              <Text style={[styles.categoryLabel, { color: color.textSecondary }]}>หมวดหมู่:</Text>
              <Text style={[styles.category, { color: color.text }]}>{book.category}</Text>
            </View>
          )}

          {book.description && (
            <View style={styles.descriptionContainer}>
              <Text style={[styles.descriptionLabel, { color: color.textSecondary }]}>เกี่ยวกับหนังสือ:</Text>
              <Text style={[styles.description, { color: color.text }]}>{book.description}</Text>
            </View>
          )}

          {/* Publication Info */}
          {(book.publishDate || book.publisher || book.isbn) && (
            <View style={[styles.infoCard, { backgroundColor: color.card, borderColor: color.border }]}>
              <Text style={[styles.infoTitle, { color: color.text }]}>ข้อมูลการพิมพ์</Text>
              
              {book.publishDate && (
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: color.textSecondary }]}>วันที่พิมพ์:</Text>
                  <Text style={[styles.infoValue, { color: color.text }]}>{book.publishDate}</Text>
                </View>
              )}
              
              {book.publisher && (
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: color.textSecondary }]}>สำนักพิมพ์:</Text>
                  <Text style={[styles.infoValue, { color: color.text }]}>{book.publisher}</Text>
                </View>
              )}
              
              {book.isbn && (
                <View style={styles.infoRow}>
                  <Text style={[styles.infoLabel, { color: color.textSecondary }]}>ISBN:</Text>
                  <Text style={[styles.infoValue, { color: color.text }]}>{book.isbn}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.actionContainer, { backgroundColor: color.background, borderTopColor: color.border }]}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: color.warning }]}
          onPress={handleEdit}
        >
          <Text style={styles.actionButtonText}>✏️ แก้ไข</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: color.error }]}
          onPress={handleDelete}
        >
          <Text style={styles.actionButtonText}>🗑️ ลบ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  bookImage: {
    width: 200,
    height: 280,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 34,
  },
  author: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  priceContainer: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionContainer: {
    marginBottom: 25,
  },
  descriptionLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  infoCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  infoLabel: {
    fontSize: 14,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
