import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import fontSize, { moderateScale } from '../../utils/metrix';
const activityOptions = ['physical', 'Meditation', 'Yoga', 'Reading', 'Walking'];

export default function AddActivity({ navigation }) {
  const [activityName, setActivityName] = useState('');
  const [activityType, setActivityType] = useState('physical');
  const [imageUri, setImageUri] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      (response) => {
        if (!response.didCancel && response.assets?.length) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  const handleSelectType = (type) => {
    setActivityType(type);
    setShowDropdown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={moderateScale(22)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Your Activity</Text>
        <Text style={styles.subHeader}>Add your Activity to the Activity list</Text>
      </View>

      <View style={styles.content}>
        {/* Help Box */}
        <View style={styles.helpRow}>
          <View style={styles.helpIconWrap}>
            <Ionicons name="help-circle" size={moderateScale(30)} color="#6FB18A" />
          </View>
          <Text style={styles.helpText}>
            Unable to find specific Activity? Add your own by filling a few details for better experience with Amrutam. 🤝
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Enter Activity Details</Text>

        {/* Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Activity Name</Text>
          <TextInput
            placeholder="Enter Activity Name"
            value={activityName}
            onChangeText={setActivityName}
            placeholderTextColor="#aaa"
            style={styles.inputBox}
          />
        </View>

        {/* Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Activity Type</Text>
          <TouchableOpacity style={styles.dropdownBox} onPress={() => setShowDropdown(true)}>
            <Text style={styles.dropdownText}>
              {activityType || 'Select Activity Type'}
            </Text>
            <Ionicons name="chevron-down" size={moderateScale(18)} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Image Upload */}
        <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          ) : (
            <>
              <Ionicons name="image" size={moderateScale(40)} color="#666" />
              <Text style={styles.uploadText}>Upload Image</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity  onPress={()=>{
        navigation.navigate("ActivitySuccess")
      }} style={styles.addBtn}>
        <Text style={styles.addBtnText}>Add Activity</Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal transparent visible={showDropdown} animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowDropdown(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={activityOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionItem} onPress={() => handleSelectType(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#000',
    marginTop: moderateScale(20),
  },
  subHeader: {
    fontSize: moderateScale(13),
    color: '#444',
    marginTop: moderateScale(6),
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(10),
  },
  helpRow: {
    flexDirection: 'row',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: moderateScale(20),
  },
  helpIconWrap: {
    marginRight: moderateScale(10),
  },
  helpText: {
    flex: 1,
    color: 'green',
    fontSize: moderateScale(12.5),
  },
    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    maxHeight: '50%',
  },
  optionItem: {
    padding: moderateScale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: fontSize(14),
    color: '#000',
  },
  previewImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(8),
    resizeMode: 'cover',
  },

  sectionTitle: {
    fontWeight: '600',
    fontSize: moderateScale(14),
    marginBottom: moderateScale(30),
    color: '#000',
  },
  inputGroup: {
    marginBottom: moderateScale(18),
    position:'relative'
  },
inputLabel: {
  position: 'absolute',
  top: -moderateScale(10),
  left: moderateScale(14),
  backgroundColor: '#fff', // match input background
  paddingHorizontal: moderateScale(4),
  fontSize: fontSize(11),
  color: '#888',
  zIndex: 1,
},

  inputBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(10),
    fontSize: moderateScale(13),
    color: '#000',
    backgroundColor: '#fff',
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(10),
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: moderateScale(13),
    color: '#000',
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    backgroundColor: '#F1F6F3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(70),
    marginBottom: moderateScale(30),
  },
  uploadText: {
    fontSize: moderateScale(13),
    color: '#666',
    marginTop: moderateScale(10),
  },
  addBtn: {
    backgroundColor: '#3A643B',
    marginHorizontal: moderateScale(20),
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(30),
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
});
