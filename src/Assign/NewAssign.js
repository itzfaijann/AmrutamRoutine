import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../utils/metrix';
import { useNavigation } from '@react-navigation/native';

export default function NewAssign() {
  const Navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={moderateScale(24)} color="#000" />
        <View style={styles.profile}>
          <Image source={require('../Images/geetanjali.png')} style={styles.avatar} />
          <View>
            <Text style={styles.name}>Geetanjali shah</Text>
            <Text style={styles.status}>online</Text>
          </View>
        </View>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>
        Assign a routine to Geetanjali? Assign through your pre build Routines
      </Text>

      {/* Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {[1, 2].map((_, index) => (
    <View key={index} style={styles.card}>
      <Image
        source={
          index === 0
            ? require('../Images/ace.png')
            : require('../Images/ace2.png')
        }
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle}>
        Skin Care Routine{'\n'}(Ache Reduction)
      </Text>
      <View style={styles.iconRow}>
        <Ionicons name="calendar-outline" size={moderateScale(14)} color="#555" />
        <Text style={styles.cardText}>12 Weeks</Text>
      </View>
      <View style={styles.iconRow}>
        <Ionicons name="notifications-outline" size={moderateScale(14)} color="#555" />
        <Text style={styles.cardText}>3 reminder Items</Text>
      </View>
      <View style={styles.iconRow}>
        <Ionicons name="person-outline" size={moderateScale(14)} color="#555" />
        <Text style={styles.cardText}>By You</Text>
      </View>
    </View>
  ))}
</ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottom}>
        <View style={{flexDirection: 'row'}}>
        <Ionicons style={{marginTop: moderateScale(2)}} name="help-circle-outline" size={moderateScale(18)} color="#2E7D32" />
        <Text style={styles.notFound}> Unable to find a perfect routine for Geetanjali?</Text>
        </View>
        <TouchableOpacity onPress={()=>{
          Navigation.navigate("NewRoutine")
        }} style={styles.button}>
          <Text style={styles.buttonText}>Create a New Routine</Text>
        </TouchableOpacity>
        <Text style={styles.learnMore}>Learn more about Routine</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: moderateScale(10),
  },
  profile: {
    flexDirection: 'row',
    marginLeft: moderateScale(16),
    alignItems: 'center',
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(10),
  },
  name: {
    fontSize: fontSize(14),
    fontWeight: 'bold',
    color: '#000',
  },
  status: {
    fontSize: fontSize(12),
    color: 'gray',
  },
  heading: {
    fontSize: fontSize(15),
    marginTop: moderateScale(28),
    marginBottom: moderateScale(10),
    color: 'black',
    fontWeight:'600',
    textAlign: 'center'
    
  },
  card: {
    width: moderateScale(170),
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    marginRight: moderateScale(12),
    backgroundColor: '#fff',
    height:moderateScale(290),
    marginTop:moderateScale(15)
  },
  cardImage: {
    width: '100%',
    height: moderateScale(140), // reduced height
    borderRadius: moderateScale(10),    
  },
  cardTitle: {
    fontSize: fontSize(13),
    fontWeight: 'bold',
    marginTop: moderateScale(8),
    color: '#000',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(6),
  },
  cardText: {
    fontSize: fontSize(11),
    color: '#555',
    marginLeft: moderateScale(6),
  },
  bottom: {
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  notFound: {
    fontSize: fontSize(14),
    color: '#2E7D32',
    marginBottom: moderateScale(30),
    textAlign: 'center',
    
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: moderateScale(18),
    paddingHorizontal: moderateScale(90),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize(15),
    fontWeight: 'bold',
  },
  learnMore: {
    color: '#2E7D32',
    fontSize: fontSize(15),
    marginBottom: moderateScale(27),
    marginTop:moderateScale(17)
  },
});
