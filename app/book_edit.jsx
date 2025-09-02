import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "./context/ThemeContext";

const BookEdit = () => {
  const { id } = useLocalSearchParams();
  const { color } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    publisher: "",
    isbn: "",
  });

  // Fetch existing book data
  const fetchBookData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://192.168.115.194:3333/api/books/${id}`);
      const result = await response.json();
      
      if (response.ok && result.book) {
        const book = result.book;
        setFormData({
          title: book.title || "",
          author: book.author || "",
          description: book.description || "",
          price: book.price ? book.price.toString() : "",
          category: book.category || "",
          publisher: book.publisher || "",
          isbn: book.isbn || "",
        });
      } else {
        Alert.alert("ข้อผิดพลาด", "ไม่สามารถโหลดข้อมูลหนังสือได้");
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
      Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณาใส่ชื่อหนังสือ");
      return false;
    }
    if (!formData.author.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณาใส่ชื่อผู้แต่ง");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      
      // Prepare data for API
      const bookData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
      };

      const response = await fetch(`http://192.168.115.194:3333/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert(
          "สำเร็จ", 
          "อัปเดตข้อมูลหนังสือเรียบร้อยแล้ว",
          [
            { 
              text: "ตกลง", 
              onPress: () => router.back()
            }
          ]
        );
      } else {
        Alert.alert("ข้อผิดพลาด", result.message || "ไม่สามารถอัปเดตข้อมูลได้");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    Alert.alert(
      "ยืนยัน",
      "คุณต้องการเรียกคืนข้อมูลเดิมใช่หรือไม่?",
      [
        { text: "ยกเลิก", style: "cancel" },
        { 
          text: "เรียกคืน", 
          onPress: () => fetchBookData()
        }
      ]
    );
  };

  useEffect(() => {
    if (id) {
      fetchBookData();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: color.background }]}>
        <ActivityIndicator size="large" color={color.primary} />
        <Text style={[styles.loadingText, { color: color.text }]}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: color.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: color.text }]}>
            ✏️ แก้ไขข้อมูลหนังสือ
          </Text>
          <Text style={[styles.headerSubtitle, { color: color.textSecondary }]}>
            แก้ไขข้อมูลหนังสือตามต้องการ
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Title */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>
              ชื่อหนังสือ <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.title}
              onChangeText={(value) => handleInputChange("title", value)}
              placeholder="ใส่ชื่อหนังสือ"
              placeholderTextColor={color.textSecondary}
            />
          </View>

          {/* Author */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>
              ผู้แต่ง <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.author}
              onChangeText={(value) => handleInputChange("author", value)}
              placeholder="ใส่ชื่อผู้แต่ง"
              placeholderTextColor={color.textSecondary}
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>คำอธิบาย</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              placeholder="ใส่คำอธิบายหนังสือ"
              placeholderTextColor={color.textSecondary}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Price */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>ราคา (บาท)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.price}
              onChangeText={(value) => handleInputChange("price", value)}
              placeholder="0.00"
              placeholderTextColor={color.textSecondary}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Category */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>หมวดหมู่</Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.category}
              onChangeText={(value) => handleInputChange("category", value)}
              placeholder="เช่น นิยาย, วิทยาศาสตร์, ประวัติศาสตร์"
              placeholderTextColor={color.textSecondary}
            />
          </View>

          {/* Publisher */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>สำนักพิมพ์</Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.publisher}
              onChangeText={(value) => handleInputChange("publisher", value)}
              placeholder="ใส่ชื่อสำนักพิมพ์"
              placeholderTextColor={color.textSecondary}
            />
          </View>

          {/* ISBN */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>ISBN</Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.isbn}
              onChangeText={(value) => handleInputChange("isbn", value)}
              placeholder="978-XXXXXXXXX"
              placeholderTextColor={color.textSecondary}
            />
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.actionContainer, { backgroundColor: color.background, borderTopColor: color.border }]}>
        <TouchableOpacity 
          style={[styles.resetButton, { backgroundColor: color.textSecondary }]}
          onPress={handleReset}
          disabled={saving}
        >
          <Text style={styles.resetButtonText}>🔄 เรียกคืน</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.updateButton, { backgroundColor: color.success, opacity: saving ? 0.6 : 1 }]}
          onPress={handleUpdate}
          disabled={saving}
        >
          <Text style={styles.updateButtonText}>
            {saving ? "กำลังอัปเดต..." : "💾 อัปเดต"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BookEdit;

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  required: {
    color: '#ff6b6b',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    height: 100,
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
    gap: 15,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  updateButton: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
