import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useTheme } from './context/ThemeContext';
import { useUser } from './context/UserContext';
import { Link, router } from 'expo-router';

const studentProfile = {
  name: 'นาย วรชิต ทองเลิศ',
  description: 'ชื่อเล่น: ดัง   นักศึกษา: ชั้นปีที่4',
  studentId: '653450209-2',
  faculty: 'คณะสหวิทยาการ',
  major: 'วิทยาการคอมพิวเตอร์และสารสนเทศ',
  program: 'วิทยาการคอมพิวเตอร์และสารสนเทศ',
  university: 'มหาวิทยาลัยขอนแก่น',
  avatar: 'https://res.cloudinary.com/dzl3jeyyx/image/upload/v1746585746/user/user_1746585741861176100.jpg',
  skills: ['React Native', 'JavaScript', 'Node.js'],
  socialMedia: {
    facebook: 'theeraphong.jaidee',
    instagram: 'theer_jp',
  }
};

export default function ProfilePage() {
  const { color } = useTheme();
  const { user, token, isLoggedIn, logout } = useUser();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogin = () => {
    setIsDropdownVisible(false);
    // Navigate to signin page
    router.push('/singin');
  };

  const handleRegister = () => {
    setIsDropdownVisible(false);
    // Navigate to signup page
    router.push('/signup');
  };
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background,
    },
    scrollContainer: {
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 30,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: color.surface,
      marginBottom: 15,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: color.text,
      marginBottom: 5,
    },
    description: {
      fontSize: 16,
      color: color.textSecondary,
      textAlign: 'center',
    },
    section: {
      marginBottom: 25,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: color.text,
      marginBottom: 10,
    },
    card: {
      backgroundColor: color.card,
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      shadowColor: color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: color.border,
    },
    infoLabel: {
      fontSize: 14,
      color: color.textSecondary,
      fontWeight: '500',
      flex: 1,
    },
    infoValue: {
      fontSize: 14,
      color: color.text,
      flex: 2,
      textAlign: 'right',
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    skillTag: {
      backgroundColor: color.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginBottom: 5,
    },
    skillText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
    socialContainer: {
      flexDirection: 'row',
      gap: 15,
    },
    socialButton: {
      backgroundColor: color.secondary,
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 8,
      flex: 1,
    },
    socialText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
    },
    aboutButton: {
      backgroundColor: color.primary,
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
    },
    aboutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    // Dropdown styles
    authButton: {
      backgroundColor: color.success,
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    authButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginRight: 8,
    },
    dropdownArrow: {
      color: 'white',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownContainer: {
      backgroundColor: color.card,
      borderRadius: 12,
      padding: 20,
      minWidth: 200,
      shadowColor: color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 5,
    },
    dropdownTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: color.text,
      marginBottom: 15,
      textAlign: 'center',
    },
    dropdownOption: {
      backgroundColor: color.primary,
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
      alignItems: 'center',
    },
    dropdownOptionText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
    closeButton: {
      backgroundColor: color.textSecondary,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 14,
    },
    // User Info Section Styles
    userInfoSection: {
      borderWidth: 2,
      borderRadius: 16,
      padding: 20,
      margin: 20,
      marginTop: 10,
    },
    userInfoHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    userInfoTitle: {
      fontSize: 18,
      fontWeight: '600',
    },
    logoutButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    logoutButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    userDetails: {
      gap: 12,
    },
    userDetailRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    userDetailLabel: {
      fontSize: 14,
      fontWeight: '500',
      flex: 0.4,
    },
    userDetailValue: {
      fontSize: 14,
      flex: 0.6,
      textAlign: 'right',
      flexWrap: 'wrap',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image 
            source={{ uri: studentProfile.avatar }} 
            style={styles.avatar}
            defaultSource={require('../assets/icon.png')}
          />
          <Text style={styles.name}>{studentProfile.name}</Text>
          <Text style={styles.description}>{studentProfile.description}</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ข้อมูลส่วนตัว</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>รหัสนักศึกษา:</Text>
              <Text style={styles.infoValue}>{studentProfile.studentId}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>คณะ:</Text>
              <Text style={styles.infoValue}>{studentProfile.faculty}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>สาขาวิชา:</Text>
              <Text style={styles.infoValue}>{studentProfile.major}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>หลักสูตร:</Text>
              <Text style={styles.infoValue}>{studentProfile.program}</Text>
            </View>
            <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>มหาวิทยาลัย:</Text>
              <Text style={styles.infoValue}>{studentProfile.university}</Text>
            </View>
          </View>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ทักษะ</Text>
          <View style={styles.card}>
            <View style={styles.skillsContainer}>
              {studentProfile.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Social Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>โซเชียลมีเดีย</Text>
          <View style={styles.card}>
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>📘 Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Text style={styles.socialText}>📷 Instagram</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* About Course Button */}
        <Link href="/about" asChild>
          <TouchableOpacity style={styles.aboutButton}>
            <Text style={styles.aboutButtonText}>เกี่ยวกับรายวิชา</Text>
          </TouchableOpacity>
        </Link>
        
        {/* Book Section */}
        <Link href="/book" asChild>
          <TouchableOpacity style={styles.aboutButton}>
            <Text style={styles.aboutButtonText}>หนังสือ</Text>
          </TouchableOpacity>
        </Link>

        {/* Authentication Button with Dropdown */}
        {!isLoggedIn ? (
          <TouchableOpacity style={styles.authButton} onPress={toggleDropdown}>
            <Text style={styles.authButtonText}>เข้าสู่ระบบ / สมัครสมาชิก</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.userInfoSection, { backgroundColor: color.surface, borderColor: color.border }]}>
            <View style={styles.userInfoHeader}>
              <Text style={[styles.userInfoTitle, { color: color.text }]}>ข้อมูลผู้ใช้ที่เข้าสู่ระบบ</Text>
              <TouchableOpacity 
                style={[styles.logoutButton, { backgroundColor: color.error }]} 
                onPress={() => {
                  logout();
                  // แสดงข้อความแจ้งเตือน
                  alert("ออกจากระบบเรียบร้อยแล้ว");
                }}
              >
                <Text style={styles.logoutButtonText}>ออกจากระบบ</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.userDetails}>
              <View style={styles.userDetailRow}>
                <Text style={[styles.userDetailLabel, { color: color.textSecondary }]}>👤 ชื่อผู้ใช้:</Text>
                <Text style={[styles.userDetailValue, { color: color.text }]}>{user?.username}</Text>
              </View>
              
              <View style={styles.userDetailRow}>
                <Text style={[styles.userDetailLabel, { color: color.textSecondary }]}>📧 อีเมล:</Text>
                <Text style={[styles.userDetailValue, { color: color.text }]}>{user?.email}</Text>
              </View>
              
              <View style={styles.userDetailRow}>
                <Text style={[styles.userDetailLabel, { color: color.textSecondary }]}>🔑 Token:</Text>
                <Text style={[styles.userDetailValue, { color: color.textSecondary, fontSize: 12 }]}>
                  {token ? token.substring(0, 20) + '...' : 'N/A'}
                </Text>
              </View>
              
              <View style={styles.userDetailRow}>
                <Text style={[styles.userDetailLabel, { color: color.textSecondary }]}>📅 สมัครเมื่อ:</Text>
                <Text style={[styles.userDetailValue, { color: color.text }]}>
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('th-TH') : 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Dropdown Modal */}
        <Modal
          visible={isDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsDropdownVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsDropdownVisible(false)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownTitle}>เลือกตัวเลือก</Text>
              
              <TouchableOpacity style={styles.dropdownOption} onPress={handleLogin}>
                <Text style={styles.dropdownOptionText}>🔐 เข้าสู่ระบบ</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.dropdownOption} onPress={handleRegister}>
                <Text style={styles.dropdownOptionText}>📝 สมัครสมาชิก</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setIsDropdownVisible(false)}
              >
                <Text style={styles.closeButtonText}>ปิด</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    </View>
  );
}
