import { useState } from "react";
import { router } from "expo-router";
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
} from "react-native";
import { useTheme } from "./context/ThemeContext";
import { useUser } from "./context/UserContext";

const SignIn = () => {
  const { color } = useTheme();
  const { login } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณาใส่อีเมล");
      return false;
    }
    if (!formData.email.includes('@')) {
      Alert.alert("ข้อผิดพลาด", "รูปแบบอีเมลไม่ถูกต้อง");
      return false;
    }
    if (!formData.password.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณาใส่รหัสผ่าน");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("ข้อผิดพลาด", "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      // Call API for sign in
      const response = await fetch("http://192.168.115.194:3333/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // บันทึก user data และ token
        login(result.user, result.token);
        
        Alert.alert(
          "สำเร็จ", 
          `ยินดีต้อนรับ ${result.user.username}!`,
          [
            { 
              text: "ตกลง", 
              onPress: () => router.replace("/") // กลับไปหน้าหลัก
            }
          ]
        );
      } else {
        Alert.alert("ข้อผิดพลาด", result.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  const goToSignUp = () => {
    router.push("/signup");
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: color.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: color.text }]}>
            🔐 เข้าสู่ระบบ
          </Text>
          <Text style={[styles.headerSubtitle, { color: color.textSecondary }]}>
            ยินดีต้อนรับกลับมา!
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>
              อีเมล <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.email}
              onChangeText={(value) => handleInputChange("email", value)}
              placeholder="example@email.com"
              placeholderTextColor={color.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>
              รหัสผ่าน <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.password}
              onChangeText={(value) => handleInputChange("password", value)}
              placeholder="รหัสผ่านของคุณ"
              placeholderTextColor={color.textSecondary}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity 
            style={[styles.signInButton, { backgroundColor: color.primary, opacity: loading ? 0.6 : 1 }]}
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.signInButtonText}>
              {loading ? "กำลังเข้าสู่ระบบ..." : "🚀 เข้าสู่ระบบ"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: color.border }]} />
            <Text style={[styles.dividerText, { color: color.textSecondary }]}>หรือ</Text>
            <View style={[styles.dividerLine, { backgroundColor: color.border }]} />
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity 
            style={[styles.signUpButton, { borderColor: color.border }]}
            onPress={goToSignUp}
          >
            <Text style={[styles.signUpButtonText, { color: color.text }]}>
              📝 สมัครสมาชิกใหม่
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  form: {
    width: '100%',
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
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  signInButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: 15,
    fontSize: 14,
  },
  signUpButton: {
    borderWidth: 2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
