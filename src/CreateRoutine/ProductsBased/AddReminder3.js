import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../../utils/metrix';
import { useNavigation } from '@react-navigation/native';

const generateNumbers = (start, end) => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i < 10 ? `0${i}` : `${i}`);
  }
  return arr;
};

const amPmOptions = ['AM', 'PM'];
const hourOptions = generateNumbers(1, 12);
const minuteOptions = generateNumbers(0, 59);
const mealOptions = ['Breakfast', 'Lunch', 'Dinner'];
const durationUnits = ['Days', 'Weeks', 'Months'];

const AddReminder3 = () => {
  const navigation = useNavigation();

  const [slots, setSlots] = useState([]);
  const [showDuration, setShowDuration] = useState(true);
  const [duration, setDuration] = useState('2');
  const [unit, setUnit] = useState('Weeks');

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [onSelect, setOnSelect] = useState(() => () => {});
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
     setSlots(prev => [
      ...prev,
      {
        id: Date.now(),
        mealType: 'Lunch',
        mealTime: '',
        amPm: 'AM',
        hour: '08',
        minute: '00',
        isSelected: false,
      },
    ]);
    setShowDuration(false)
  }, []);

  const openDropdown = (title, data, onSelectCallback) => {
    setSelectedTitle(title);
    setDropdownData(data);
    setOnSelect(() => onSelectCallback);
    setDropdownVisible(true);
  };

  const addMoreSlots = () => {
       setSlots(prev => [
      ...prev,
      {
        id: Date.now(),
        mealType: 'Lunch',
        mealTime: '',
        amPm: 'AM',
        hour: '08',
        minute: '00',
        isSelected: false,
      },
    ]);
   setShowDuration(true)
   
  };

  const updateSlot = (index, field, value) => {
    const updated = [...slots];
    updated[index][field] = value;
    if (
      updated[index].mealTime &&
      updated[index].hour &&
      updated[index].minute &&
      updated[index].amPm
    ) {
      updated[index].isSelected = true;
    }
    setSlots(updated);
  };

  const removeSlot = (id) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const TimePicker = ({ amPm, hour, minute, onChange }) => {
    const renderColumn = (data, selected, field) => (
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        style={styles.scrollColumn}
        getItemLayout={(_, index) => ({
          length: moderateScale(35),
          offset: moderateScale(35) * index,
          index,
        })}
        initialScrollIndex={Math.max(0, data.indexOf(selected))}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChange(field, item)}>
            <Text style={[styles.timeOption, selected === item && styles.selected]}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );

    return (
      <View style={styles.timePickerContainer}>
        {renderColumn(amPmOptions, amPm, 'amPm')}
        {renderColumn(hourOptions, hour, 'hour')}
        {renderColumn(minuteOptions, minute, 'minute')}
      </View>
    );
  };

  const renderSlot = ({ item, index }) => {
    if (item.isSelected) {
      return (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: moderateScale(12),
            borderRadius: moderateScale(10),
            borderColor: '#ccc',
            marginBottom: moderateScale(15),
          }}
        >
          <Text style={{ backgroundColor: 'green',padding: moderateScale(5),borderRadius: moderateScale(10), fontSize: fontSize(14), fontWeight: '500', color: 'white' }}>
            {item.mealTime} Meal
          </Text>
          <Text style={{ fontSize: fontSize(14), color: 'green' }}>
            {item.hour}:{item.minute} {item.amPm}
          </Text>
          <TouchableOpacity onPress={() => removeSlot(item.id)}>
            <Ionicons name="close-circle" size={moderateScale(22)} color="gray" />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View key={item.id} style={{ marginBottom: moderateScale(30) }}>
        <Text style={styles.sectionTitle}>Add Time Slot</Text>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Meal</Text>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() =>
              openDropdown('Meal', mealOptions, (val) => updateSlot(index, 'mealType', val))
            }
          >
            <Text style={styles.dropdownText}>{item.mealType}</Text>
            <Ionicons name="chevron-down" size={moderateScale(18)} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.radioGroup}>
          {['Before', 'After'].map((val) => (
            <TouchableOpacity
              key={val}
              style={styles.radioOption}
              onPress={() => updateSlot(index, 'mealTime', val)}
            >
              <View
                style={[styles.radioOuter, item.mealTime === val && styles.radioOuterActive]}
              >
                {item.mealTime === val && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{val} Meal</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TimePicker
          amPm={item.amPm}
          hour={item.hour}
          minute={item.minute}
          onChange={(field, value) => updateSlot(index, field, value)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("AddReminder2")}>
            <Ionicons name="arrow-back" size={moderateScale(30)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Reminder Items</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.activeBar} />
          <View style={styles.activeBar} />
          <View style={styles.activeBar} />
        </View>

        {showDuration && (
          <View>
            <Text style={styles.sectionTitle}>Add Duration</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={[styles.dropdownContainer, { width: '48%' }]}>
                <Text style={styles.label}>Duration</Text>
                <TouchableOpacity
                  style={styles.dropdownBox}
                  onPress={() => openDropdown('Duration', generateNumbers(1, 30), setDuration)}
                >
                  <Text style={styles.dropdownText}>{duration}</Text>
                  <Ionicons name="chevron-down" size={moderateScale(18)} color="#888" />
                </TouchableOpacity>
              </View>
              <View style={[styles.dropdownContainer, { width: '48%' }]}>
                <Text style={styles.label}>Unit</Text>
                <TouchableOpacity
                  style={styles.dropdownBox}
                  onPress={() => openDropdown('Unit', durationUnits, setUnit)}
                >
                  <Text style={styles.dropdownText}>{unit}</Text>
                  <Ionicons name="chevron-down" size={moderateScale(18)} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {slots.map((item, index) => renderSlot({ item, index }))}

        <TouchableOpacity style={styles.addSlotBtn} onPress={addMoreSlots}>
          <View style={{ borderColor: 'green', borderWidth: 1, borderRadius: moderateScale(10), padding: moderateScale(3) }}>
            <Ionicons name="add" size={moderateScale(23)} color="green" />
          </View>
          <Text style={styles.addSlotText}>Add More slots</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity onPress={()=>{
        navigation.navigate("AddProduct")
      }} style={styles.doneBtn}>
        <Text style={styles.doneText}>Done (3/3)</Text>
      </TouchableOpacity>

      <Modal transparent visible={dropdownVisible} animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', paddingHorizontal: 30 }}
          onPress={() => setDropdownVisible(false)}
          activeOpacity={1}
        >
          <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Select {selectedTitle}</Text>
            <FlatList
              data={dropdownData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({    item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setDropdownVisible(false);
                    onSelect(item);
                  }}
                  style={{ paddingVertical: 10 }}
                >
                  <Text style={{ fontSize: 16 }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AddReminder3;



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: moderateScale(50),
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(10),
  },
  backBtn: { position: 'absolute', left: moderateScale(20), top: moderateScale(50) },
  headerTitle: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    height: moderateScale(5),
    margin: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  activeBar: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: moderateScale(5),
    marginRight: moderateScale(5),
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: fontSize(16),
    marginBottom: moderateScale(10),
    marginTop: moderateScale(20),
  },
  dropdownContainer: {
    marginBottom: moderateScale(25),
  },
  label: {
    fontSize: fontSize(14),
    color: '#555',
    marginBottom: moderateScale(5),
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 1,
  },
  dropdownBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: fontSize(14),
    color: '#000',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(16),
    marginTop: moderateScale(20),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(20),
  },
  radioOuter: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    borderWidth: 1.5,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(6),
    
  },
  radioOuterActive: {
    borderColor: 'green',
  },
  radioInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    backgroundColor: 'green',
    borderRadius: moderateScale(5),
  },
  radioLabel: {
    fontSize: fontSize(13),
    color: '#000',
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: moderateScale(120),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20),
  },
  scrollColumn: {
    width: '30%',
  },
  timeOption: {
    fontSize: fontSize(14),
    color: '#333',
    paddingVertical: moderateScale(10),
    textAlign: 'center',
  },
  selected: {
    color: 'black',
    fontWeight: '700',
    fontSize: fontSize(16),
  },
  addSlotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    marginTop: moderateScale(10),
  },
  addSlotText: {
    color: 'green',
    fontSize: fontSize(17),
    marginLeft: moderateScale(6),
  },
  doneBtn: {
    backgroundColor: '#3A643B',
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(30),
    alignItems: 'center',
  },
  doneText: {
    color: '#fff',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
});