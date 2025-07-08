import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './context/ThemeContext';
import { Link } from 'expo-router';

const courseInfo = {
  courseCode: 'IN405109',
  courseName: 'Hybrid Mobile Application Programming',
  courseNameThai: 'การโปรแกรมแอปพลิเคชันมือถือแบบไฮบริด',
  description: 'สถาปัตยกรรมฮาร์ดแวร์ คุณลักษณะและข้อจำกัดของอุปกรณ์เคลื่อนที่ เครื่องมือและภาษาที่ใช้สำหรับพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม การพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ภาษาหลากหลายแพลตฟอร์ม กระบวนการพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่หลากหลายแพลตฟอร์ม การใช้หน่วยความจำและส่วนเก็บบันทึกข้อมูล การขออนุญาตและการเข้าถึงส่วนฮาร์ดแวร์ ส่วนติดต่อกับผู้ใช้ การสื่อสารเครือข่ายกับภายนอก การเชื่อมโยงกับระบบเครื่องแม่ข่าย การทดสอบโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ระบบคอมพิวเตอร์ ประเด็นด้านความมั่นคง การฝึกปฏิบัติ',
  objectives: [
    'เข้าใจสถาปัตยกรรมฮาร์ดแวร์และข้อจำกัดของอุปกรณ์เคลื่อนที่',
    'สามารถใช้เครื่องมือและภาษาสำหรับพัฒนาแอปพลิเคชันมือถือ',
    'พัฒนาแอปพลิเคชันมือถือแบบไฮบริดได้',
    'ทำความเข้าใจกระบวนการพัฒนาแอปพลิเคชันมือถือ',
    'จัดการหน่วยความจำและการเก็บข้อมูล',
    'ออกแบบส่วนติดต่อผู้ใช้ที่เหมาะสม',
    'ทดสอบและปรับปรุงแอปพลิเคชัน'
  ],
  technologies: [
    'React Native',
    'Expo',
    'JavaScrip',
    'Git & GitHub'
  ],
  instructor: 'อาจารย์ ธนภัทร วงษ์คำจันทร์',
  semester: 'ภาคเรียนที่ 1 ปีการศึกษา 2568',
  faculty: 'คณะสหวิทยาการ มหาวิทยาลัยขอนแก่น'
};

export default function AboutPage() {
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
      padding: 20,
      backgroundColor: color.primary,
      borderRadius: 12,
      marginHorizontal: -5,
    },
    courseCode: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 5,
    },
    courseName: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      marginBottom: 5,
    },
    courseNameThai: {
      fontSize: 14,
      color: 'white',
      textAlign: 'center',
      opacity: 0.9,
    },
    credits: {
      fontSize: 14,
      color: 'white',
      marginTop: 5,
      fontWeight: '500',
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
    description: {
      fontSize: 14,
      color: color.text,
      lineHeight: 22,
      textAlign: 'justify',
    },
    objectiveItem: {
      flexDirection: 'row',
      marginBottom: 8,
      alignItems: 'flex-start',
    },
    objectiveNumber: {
      fontSize: 14,
      color: color.primary,
      fontWeight: '600',
      marginRight: 8,
      marginTop: 2,
    },
    objectiveText: {
      fontSize: 14,
      color: color.text,
      flex: 1,
      lineHeight: 20,
    },
    techContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    techTag: {
      backgroundColor: color.secondary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginBottom: 5,
    },
    techText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'flex-start',
    },
    infoLabel: {
      fontSize: 14,
      color: color.textSecondary,
      fontWeight: '500',
      width: 100,
      marginTop: 2,
    },
    infoValue: {
      fontSize: 14,
      color: color.text,
      flex: 1,
    },
    backButton: {
      backgroundColor: color.primary,
      padding: 15,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    backButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.courseCode}>{courseInfo.courseCode}</Text>
          <Text style={styles.courseName}>{courseInfo.courseName}</Text>
          <Text style={styles.courseNameThai}>{courseInfo.courseNameThai}</Text>
        </View>

        {/* Course Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>รายละเอียดรายวิชา</Text>
          <View style={styles.card}>
            <Text style={styles.description}>{courseInfo.description}</Text>
          </View>
        </View>

        {/* Learning Objectives */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>วัตถุประสงค์การเรียนรู้</Text>
          <View style={styles.card}>
            {courseInfo.objectives.map((objective, index) => (
              <View key={index} style={styles.objectiveItem}>
                <Text style={styles.objectiveNumber}>{index + 1}.</Text>
                <Text style={styles.objectiveText}>{objective}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Technologies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>เทคโนโลยีที่ใช้</Text>
          <View style={styles.card}>
            <View style={styles.techContainer}>
              {courseInfo.technologies.map((tech, index) => (
                <View key={index} style={styles.techTag}>
                  <Text style={styles.techText}>{tech}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Course Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ข้อมูลรายวิชา</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>อาจารย์:</Text>
              <Text style={styles.infoValue}>{courseInfo.instructor}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ภาคเรียน:</Text>
              <Text style={styles.infoValue}>{courseInfo.semester}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>คณะ:</Text>
              <Text style={styles.infoValue}>{courseInfo.faculty}</Text>
            </View>
          </View>
        </View>

        {/* Back Button */}
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}>กลับไปยังหน้าโปรไฟล์</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  );
}
