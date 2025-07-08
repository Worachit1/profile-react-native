import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './context/ThemeContext';
import { Link } from 'expo-router';

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
      </ScrollView>
    </View>
  );
}
