import { TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, color } = useTheme();
  
  return (
    <TouchableOpacity 
      onPress={toggleTheme}
      style={{
        backgroundColor: color.surface,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: color.border,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          color: color.text,
          fontSize: 12,
          fontWeight: '500',
        }}
      >
        {isDarkMode ? "🌙 Dark" : "☀️ Light"}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeToggle;
