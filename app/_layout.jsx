import { Stack } from "expo-router";
import ThemeToggle from "./components/ThemeToggle";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";

function StackLayout() {
  const { color } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: color.background,
        },
        headerTintColor: color.text,
        headerTitleStyle: {
          color: color.text,
          fontWeight: '600',
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ 
          title: "Profile", 
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="about"
        options={{ 
          title: "About Course", 
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="book"
        options={{ 
          title: "📚 ห้องสมุดหนังสือ", 
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="book_detail"
        options={{ 
          title: "รายละเอียดหนังสือ",
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="book_new"
        options={{ 
          title: "เพิ่มหนังสือใหม่",
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="book_edit"
        options={{ 
          title: "แก้ไขหนังสือ",
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="singin"
        options={{ 
          title: "Singin", 
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{ 
          title: "Signup", 
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
export default function Layout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <StackLayout />
      </UserProvider>
    </ThemeProvider>
  );
}
