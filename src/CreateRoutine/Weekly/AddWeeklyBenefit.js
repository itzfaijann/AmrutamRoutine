import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../../utils/metrix';

const weekRangeLabels = ['0-2', '2-4', '4-6'];
const weekOptions = ['1 week', '2 weeks', '3 weeks'];

export default function AddWeeklyBenefit({ navigation }) {
  const [selectedWeeks, setSelectedWeeks] = useState('2 weeks');
  const [weeklyBenefits, setWeeklyBenefits] = useState({
    '0-2': ['', ''],
    '2-4': [''],
    '4-6': [''],
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAddBenefit = range => {
    setWeeklyBenefits(prev => ({
      ...prev,
      [range]: [...prev[range], ''],
    }));
  };

  const handleRemoveBenefit = range => {
    setWeeklyBenefits(prev => {
      const updated = [...prev[range]];
      if (updated.length > 1) updated.pop();
      return { ...prev, [range]: updated };
    });
  };

  const updateBenefitText = (range, index, text) => {
    const updated = [...weeklyBenefits[range]];
    updated[index] = text;
    setWeeklyBenefits(prev => ({ ...prev, [range]: updated }));
  };

  const validateAndSubmit = () => {
    const newErrors = {};
    weekRangeLabels.forEach(range => {
      const hasValid = weeklyBenefits[range].some(b => b.trim() !== '');
      if (!hasValid) newErrors[range] = true;
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigation.navigate('RoutineStepTwo', { weeklyBenefits });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View style={styles.header}>
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={moderateScale(22)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Weekly Benefits</Text>
        <Text style={styles.subHeader}>Add Weekly benefits to your Routine</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.helpRow}>
          <Ionicons
            name="help-circle"
            size={moderateScale(26)}
            color="#6FB18A"
            style={{ marginRight: moderateScale(10) }}
          />
          <Text style={styles.helpText}>
            This weekly benefit will help potential users track their weekly
            progress while using this routine.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Enter Weekly Benefits</Text>

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select Weeks</Text>
          <TouchableOpacity style={styles.dropdownBox} onPress={() => setDropdownVisible(true)}>
            <Text style={styles.dropdownText}>{selectedWeeks}</Text>
            <Ionicons name="chevron-down" size={moderateScale(18)} color="#888" />
          </TouchableOpacity>
          <Text style={styles.weekNote}>
            Total Weeks for your "Skin Care Routine" is 8 Weeks
          </Text>
        </View>

        {/* Loop through week ranges */}
        {weekRangeLabels.map(range => (
          <View key={range} style={{ marginBottom: moderateScale(30) }}>
            <Text style={styles.benefitRange}>{range} Week Benefits</Text>
            {weeklyBenefits[range].map((val, i) => (
              <View key={i} style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Benefit {i + 1}</Text>
                <TextInput
                  value={val}
                  onChangeText={text => updateBenefitText(range, i, text)}
                  style={[
                    styles.benefitInput,
                    errors[range] && i === 0 && { borderColor: 'red' },
                  ]}
                  multiline
                />
              </View>
            ))}
            {errors[range] && (
              <Text style={styles.warningText}>
                <Ionicons name="alert-circle" size={moderateScale(14)} color="red" /> Add at least one
                benefit in each week to enhance the experience!
              </Text>
            )}
            <View style={styles.actionsRow}>
              {weeklyBenefits[range].length > 1 && (
                <TouchableOpacity onPress={() => handleRemoveBenefit(range)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.addMoreBtn} onPress={() => handleAddBenefit(range)}>
                <Ionicons name="add" size={moderateScale(16)} color="green" />
                <Text style={styles.addMoreText}>Add More</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={validateAndSubmit}>
        <Text style={styles.submitText}>Add Benefits</Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal transparent visible={dropdownVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Weeks</Text>
            <FlatList
              data={weekOptions}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedWeeks(item);
                    setDropdownVisible(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#E6F2E9',
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    overflow: 'hidden',
  },
  circleTopRight: {
    position: 'absolute',
    top: -moderateScale(50),
    right: -moderateScale(30),
    width: moderateScale(180),
    height: moderateScale(180),
    borderRadius: moderateScale(90),
    backgroundColor: '#C6E6D0',
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -moderateScale(50),
    left: -moderateScale(50),
    width: moderateScale(180),
    height: moderateScale(180),
    borderRadius: moderateScale(90),
    backgroundColor: '#C6E6D0',
  },
  backBtn: {
    position: 'absolute',
    top: moderateScale(50),
    left: moderateScale(20),
    zIndex: 10,
  },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
    marginTop: moderateScale(20),
  },
  subHeader: {
    fontSize: fontSize(12),
    color: '#444',
    marginTop: moderateScale(6),
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
  },
  helpRow: {
    flexDirection: 'row',
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(20),
  },
  helpText: {
    flex: 1,
    color: 'green',
    fontSize: fontSize(12.5),
  },
  sectionTitle: {
    fontSize: fontSize(14),
    fontWeight: '600',
    marginBottom: moderateScale(14),
    color: '#000',
  },
  dropdownContainer: {
    marginBottom: moderateScale(25),
  },
  dropdownLabel: {
    fontSize: fontSize(12),
    marginBottom: moderateScale(6),
    color: '#444',
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: fontSize(13),
    color: '#000',
  },
  weekNote: {
    marginTop: moderateScale(6),
    fontSize: fontSize(11.5),
    color: '#555',
  },
  benefitRange: {
    fontSize: fontSize(13),
    fontWeight: '600',
    marginBottom: moderateScale(20),
    color: '#000',
  },
  inputContainer: {
    marginBottom: moderateScale(12),
    position: 'relative',
  },
  inputLabel: {
    position: 'absolute',
    top: -moderateScale(10),
    left: moderateScale(12),
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(4),
    fontSize: fontSize(11),
    color: '#444',
    zIndex: 1,
  },
  benefitInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    fontSize: fontSize(13),
    marginBottom: moderateScale(10),
    textAlignVertical: 'top',
    minHeight: moderateScale(60),
  },
  warningText: {
    color: 'red',
    fontSize: fontSize(11),
    marginBottom: moderateScale(10),
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  deleteText: {
    color: 'red',
    fontSize: fontSize(13),
    marginRight: moderateScale(12),
  },
  addMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addMoreText: {
    marginLeft: moderateScale(5),
    color: 'green',
    fontSize: fontSize(13),
  },
  submitBtn: {
    backgroundColor: '#3A643B',
    marginHorizontal: moderateScale(20),
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    position: 'absolute',
    bottom: moderateScale(30),
    left: 0,
    right: 0,
  },
  submitText: {
    color: '#fff',
    fontSize: fontSize(15),
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 10,
  },
  modalItemText: {
    fontSize: 16,
  },
});
