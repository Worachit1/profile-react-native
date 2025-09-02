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

const SignUp = () => {
  const { color } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      Alert.alert("ข้อผิดพลาด", "กรุณาใส่ชื่อผู้ใช้");
      return false;
    }
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
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("ข้อผิดพลาด", "รหัสผ่านไม่ตรงกัน");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const { confirmPassword, ...signUpData } = formData;
      
      // Call API for sign up
      const response = await fetch("http://192.168.115.194:3333/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert(
          "สำเร็จ", 
          "สมัครสมาชิกเรียบร้อยแล้ว กรุณาเข้าสู่ระบบ",
          [
            { 
              text: "ตกลง", 
              onPress: () => router.replace("/singin")
            }
          ]
        );
      } else {
        Alert.alert("ข้อผิดพลาด", result.message || "ไม่สามารถสมัครสมาชิกได้");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  const goToSignIn = () => {
    router.push("/singin");
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
            📝 สมัครสมาชิก
          </Text>
          <Text style={[styles.headerSubtitle, { color: color.textSecondary }]}>
            สร้างบัญชีใหม่เพื่อเริ่มใช้งาน
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>
              ชื่อผู้ใช้ <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.username}
              onChangeText={(value) => handleInputChange("username", value)}
              placeholder="ชื่อผู้ใช้งาน"
              placeholderTextColor={color.textSecondary}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

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
              placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
              placeholderTextColor={color.textSecondary}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: color.text }]}>
              ยืนยันรหัสผ่าน <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: color.surface, color: color.text, borderColor: color.border }]}
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange("confirmPassword", value)}
              placeholder="ใส่รหัสผ่านอีกครั้ง"
              placeholderTextColor={color.textSecondary}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={[styles.signUpButton, { backgroundColor: color.success, opacity: loading ? 0.6 : 1 }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.signUpButtonText}>
              {loading ? "กำลังสมัครสมาชิก..." : "🎉 สมัครสมาชิก"}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: color.border }]} />
            <Text style={[styles.dividerText, { color: color.textSecondary }]}>หรือ</Text>
            <View style={[styles.dividerLine, { backgroundColor: color.border }]} />
          </View>

          {/* Sign In Link */}
          <TouchableOpacity 
            style={[styles.signInButton, { borderColor: color.border }]}
            onPress={goToSignIn}
          >
            <Text style={[styles.signInButtonText, { color: color.text }]}>
              🔐 มีบัญชีแล้ว? เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
  signUpButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  signUpButtonText: {
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
  signInButton: {
    borderWidth: 2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
