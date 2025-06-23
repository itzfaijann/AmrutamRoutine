import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../utils/metrix';
import { useNavigation } from '@react-navigation/native';

const routines = [
  {
    id: '1',
    title: 'Focus & Work',
    reminders: 3,
    icon: '🌼',
    count: 47,
    image: require('../Images/focus.png'),
  },
  {
    id: '2',
    title: 'Skin Care Routine',
    reminders: 3,
    icon: '🌼',
    count: 8,
    image: require('../Images/skincare.png'),
  },
];

const patients = [
  { id: '1', name: 'Meeta Sharma', concern: 'Migraines' },
  { id: '2', name: 'Apana Jude', concern: 'Migraines' },
  { id: '3', name: 'Ankit Tez', concern: 'Migraines' },
];

export default function RoutineHome() {
    const Navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.headerText}>Routine</Text>
        </View>

        {/* My Routine */}
        <Text style={[styles.sectionTitle,{marginLeft: moderateScale(-2)}]}>My Routine</Text>
        <FlatList
          horizontal
          data={routines}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.routineCard}>
              <Image source={item.image} resizeMode={'cover'}style={styles.routineImage} />
               <View style={styles.routineFooter}>
              <Text style={styles.routineTitle}>{item.title}</Text>
               <Text style={styles.countText}>{item.count} {item.icon}</Text>
             </View>
                <Text style={styles.reminderText}>
                  {item.reminders} Reminder Items
                </Text>
               
              
            </View>
          )}
        />

        {/* Patients */}
        <View style={styles.patientsHeader}>
          <Text style={styles.sectionTitle}>Patients yet to assign a routine</Text>
          <Text style={styles.seeMore}>See More</Text>
        </View>

        {patients.map((patient) => (
          <View key={patient.id} style={styles.patientCard}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={require('../Images/user.png')}
                style={styles.avatar}
              />
              <View style={styles.patientInfo}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.patientConcern}>
                  Concern: {patient.concern}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                Navigation.navigate("ConsultationRoutine")
              }} style={styles.assignButton}>
                <Text style={styles.assignText}>Assign Routine</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: moderateScale(80),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
  },
  headerText: {
    fontSize: fontSize(18),
    fontWeight: 'bold',
    marginLeft: moderateScale(7),
  },
  sectionTitle: {
    fontSize: fontSize(16),
    fontWeight: '500',
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(8),
    marginLeft:moderateScale(-11)
  },
   routineCard: {
    width: moderateScale(175),
    margin: moderateScale(10),
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    alignItems: 'center',
    height: moderateScale(238),
    overflow: 'hidden',
  },
routineImage: {
  width: '94%',
  height: moderateScale(160),
  resizeMode: 'cover',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  overflow: 'hidden',
  marginTop: moderateScale(10)
},

  routineTitle: {
    fontSize: fontSize(14),
    fontWeight: '600',
    paddingHorizontal: moderateScale(12),
    paddingTop: moderateScale(8),
    color: '#222',
    marginLeft: moderateScale(-15)
  },
  routineFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingTop: moderateScale(4),
  },
  countText: {
    fontSize: fontSize(12),
    color: '#555',
    marginTop:moderateScale(9)
  },
  reminderText: {
    fontSize: fontSize(11),
    color: 'gray',
    paddingHorizontal: moderateScale(12),
    paddingTop: moderateScale(6),
    marginLeft: moderateScale(-65)
  },

  patientsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(12),
  },
  seeMore: {
    color: 'green',
    fontSize: fontSize(13),
    marginTop: moderateScale(10),
    fontWeight:"700"
  },
  patientCard: {
    alignItems: 'flex-start',
    marginHorizontal: moderateScale(16),
    borderRadius: 11,
    padding: moderateScale(15),
    marginTop: moderateScale(10),
    borderWidth: 0.3,
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: 20,
  },
  patientInfo: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  patientName: {
    fontSize: fontSize(14),
    fontWeight: '600',
  },
  patientConcern: {
    fontSize: fontSize(12),
    color: 'gray',
  },
  viewButton: {
    marginRight: moderateScale(10),
    width: moderateScale(135),
    height: moderateScale(38),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
    marginLeft: moderateScale(30),
  },
  viewText: {
    fontSize: fontSize(12),
  },
  assignButton: {
    backgroundColor: '#f5fef6',
    borderColor: 'green',
    marginRight: moderateScale(10),
    width: moderateScale(135),
    height: moderateScale(38),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  assignText: {
    fontSize: fontSize(12),
    color: 'green',
  },
  fab: {
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(20),
    backgroundColor: 'green',
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
});
