import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../utils/metrix';
import { useNavigation } from '@react-navigation/native';

export default function AssignValue() {
  const Navigation = useNavigation();
  const [selectedConcern, setSelectedConcern] = useState('Knee Pain');
  const [explanation, setExplanation] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const concernOptions = ['Knee Pain', 'Headache', 'Fatigue', 'Stress'];

  const handleSelect = value => {
    setSelectedConcern(value);
    setDropdownVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => Navigation.goBack()}>
            <Ionicons name="arrow-back" size={moderateScale(24)} color="#000" />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <Image source={require('../Images/geetanjali.png')} style={styles.avatar} />
            <View>
              <Text style={styles.name}>Geetanjali shah</Text>
              <Text style={styles.status}>online</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.divider} />
      <View style={styles.timeRow}>
        <Ionicons name="information-circle-outline" color="black" style={{marginTop: moderateScale(11)}} size={fontSize(21)} />
        <Text style={styles.timeNote}> Well done! Consultation time is over 🎊</Text>
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>34</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>5'10 ft</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>74 kg</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Sleep Pattern:</Text>
          <Text style={styles.value}>Better not good</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>General Concerns:</Text>
          <Text style={styles.value}>Back pain, Mig.. +2</Text>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.floatingLabel}>Current Concerns</Text>
          <TouchableOpacity
            style={styles.customDropdown}
            onPress={() => setDropdownVisible(true)}
          >
            <Text style={styles.dropdownText}>{selectedConcern}</Text>
            <Ionicons name="chevron-down" size={fontSize(18)} color="#333" />
          </TouchableOpacity>
        </View>

        <Modal transparent visible={dropdownVisible} animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setDropdownVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={concernOptions}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.inputGroup}>
          <Text style={[styles.floatingLabel,{color: 'black'}]}>Explain</Text>
          <TextInput
            value={explanation}
            onChangeText={setExplanation}
            placeholder='Explain "Geetanjali Shah" about the Concern'
            placeholderTextColor="#aaa"
            style={styles.inputBox}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <TouchableOpacity onPress={()=>{
        Navigation.navigate("VideoCall")
      }} style={styles.nextButton}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    marginBottom: moderateScale(12),
    paddingTop: moderateScale(10),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: moderateScale(10),
    marginTop: moderateScale(10),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: moderateScale(10),
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginRight: moderateScale(10),
  },
  name: {
    fontSize: fontSize(16),
    fontWeight: 'bold',
  },
  status: {
    fontSize: fontSize(12),
    color: 'green',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: moderateScale(8),
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeNote: {
    fontSize: fontSize(16.9),
    color: 'black',
    marginTop: moderateScale(15),
    textAlign: 'center',
    marginBottom: moderateScale(4),
  },
  infoBox: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    backgroundColor: '#fff',
    marginVertical: moderateScale(12),
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  label: {
    fontSize: fontSize(13),
    color: '#666',
    fontWeight: '600',
    flex: 1.2,
    marginLeft: moderateScale(20),
  },
  value: {
    color: '#000',
    fontWeight: '500',
    fontSize: fontSize(13),
    flex: 1.5,
    marginLeft: moderateScale(8),
  },
  form: {
    marginTop: moderateScale(10),
  },
  inputGroup: {
    marginBottom: moderateScale(20),
    position: 'relative',
    width: '95%',
    alignSelf: 'center',
  },
  floatingLabel: {
    position: 'absolute',
    top: -moderateScale(10),
    left: moderateScale(12),
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(4),
    fontSize: fontSize(13),
    color: '#888',
    zIndex: 1,
  },
  customDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(12),
    height:moderateScale(55),
    backgroundColor: '#fff',
 
  },
  dropdownText: {
    fontSize: fontSize(13),
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: moderateScale(20),
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(10),
  },
  dropdownItem: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(16),
  },
  dropdownItemText: {
    fontSize: fontSize(14),
    color: '#333',
  },
  inputBox: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(10),
    height: moderateScale(175),
    textAlignVertical: 'top',
    fontSize: fontSize(12),
    backgroundColor: '#fff',
    paddingTop: moderateScale(18)
  },
  nextButton: {
    marginTop: moderateScale(20),
    backgroundColor: '#2E7D32',
    paddingVertical: moderateScale(22),
    borderRadius: moderateScale(16),
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: fontSize(18),
    fontWeight: 'bold',
  },
});
