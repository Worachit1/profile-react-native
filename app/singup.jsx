import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useTheme } from "./context/ThemeContext";

const SignUp = () => {
  const { color } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: color.background }]}>
      <Text style={[styles.title, { color: color.text }]}>สมัครสมาชิก</Text>
      <Text style={[styles.subtitle, { color: color.textSecondary }]}>
        กำลังพัฒนาในขั้นตอนต่อไป...
      </Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
