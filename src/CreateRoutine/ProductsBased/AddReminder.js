import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import fontSize, { moderateScale } from '../../utils/metrix';

const AddReminder = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();

  const RadioCircle = ({ isSelected }) => (
    <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
      {isSelected && (
        <Ionicons name="checkmark" size={moderateScale(14)} color="#fff" />
      )}
    </View>
  );

  const handleNext = () => {
    if (selected === 'product') {
      navigation.navigate('AddReminder2');
    } 
    else if(selected == "activity")
    {
      navigation.navigate("AddReminderActi")
    }
    else{
      alert('Please select "Product based" to proceed');
    }
  };

  return (
    <View style={styles.container}>
      {/* Custom Curved Header */}
      <View style={styles.header}>
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <TouchableOpacity onPress={()=>{
          navigation.navigate("RoutineStepTwo")
        }} style={styles.backButton}>
          <Ionicons name="arrow-back" size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Reminder Items</Text>
        <Text style={styles.subtitle}>Create your own routine</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={styles.activeBar} />
        <View style={styles.inactiveBar} />
        <View style={styles.inactiveBar} />
      </View>

      <Text style={styles.selectText}>Select Reminder Type</Text>

      <TouchableOpacity onPress={() => setSelected('product')}>
        <ImageBackground
          source={require('../../Images/frame1.png')}
          style={styles.card}
          imageStyle={{ borderRadius: moderateScale(12) }}
        >
          <View style={styles.radioContainer}>
            <RadioCircle isSelected={selected === 'product'} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.textBox}>
              <Text style={styles.cardTitle}>Product based</Text>
              <Text style={styles.cardDesc}>
                Skincare products, medication and other essentials.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity onPress={() => setSelected('activity')}>
        <ImageBackground
          source={require('../../Images/frame2.png')}
          style={styles.card}
          imageStyle={{ borderRadius: moderateScale(12) }}
        >
          <View style={styles.radioContainer}>
            <RadioCircle isSelected={selected === 'activity'} />
          </View>
          <View style={styles.cardContent}>
            <View style={styles.textBox}>
              <Text style={styles.cardTitle}>Activity based</Text>
              <Text style={styles.cardDesc}>
                Yoga sessions, running, gym workouts, and reading books.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next (1/3)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddReminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#E6F2E9',
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    position: 'relative',
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: moderateScale(50),
    left: moderateScale(20),
    zIndex: 2,
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    marginTop: moderateScale(30),
    color: '#000',
    zIndex: 1,
  },
  subtitle: {
    fontSize: fontSize(14),
    color: 'gray',
    marginTop: moderateScale(5),
    zIndex: 1,
  },
  circleTopRight: {
    position: 'absolute',
    top: moderateScale(20),
    right: -moderateScale(40),
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: '#D0EEDB',
    opacity: 0.6,
    zIndex: 0,
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -moderateScale(20),
    left: -moderateScale(40),
    width: moderateScale(90),
    height: moderateScale(90),
    borderRadius: moderateScale(45),
    backgroundColor: '#D0EEDB',
    opacity: 0.6,
    zIndex: 0,
  },
  progressBar: {
    flexDirection: 'row',
    height: moderateScale(5),
    marginVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  activeBar: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: moderateScale(5),
  },
  inactiveBar: {
    flex: 1,
    backgroundColor: '#ccc',
    marginLeft: moderateScale(5),
    borderRadius: moderateScale(5),
  },
  selectText: {
    fontSize: fontSize(16),
    fontWeight: '500',
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  card: {
    height: moderateScale(140),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(10),
    marginHorizontal: moderateScale(20),
    overflow: 'hidden',
    marginTop: moderateScale(40),
  },
  radioContainer: {
    position: 'absolute',
    top: moderateScale(10),
    left: moderateScale(10),
    zIndex: 1,
  },
  radioCircle: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(2),
    borderColor: 'green',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: 'green',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBox: {
    marginLeft: moderateScale(10),
    backgroundColor: '#F5F5F5',
    padding: moderateScale(5),
    borderRadius: moderateScale(20),
    width: moderateScale(200),
  },
  cardTitle: {
    fontSize: fontSize(16),
    fontWeight: '600',
    color: '#000',
  },
  cardDesc: {
    fontSize: fontSize(13),
    color: '#333',
    marginTop: moderateScale(4),
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(40),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: moderateScale(10),
    fontWeight: '600',
    color: '#777',
    fontSize: fontSize(14),
  },
  nextButton: {
    backgroundColor: '#3A643B',
    padding: moderateScale(14),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(20),
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: fontSize(16),
  },
});
