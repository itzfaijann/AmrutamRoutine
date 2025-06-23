import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import fontSize, { moderateScale } from '../utils/metrix';
import { useNavigation } from '@react-navigation/native';

export default function NewRoutine() {
  const Navigation = useNavigation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [description, setDescription] = useState('');
  const [galleryImage, setGalleryImage] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Lifestyle');
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('Weeks');

  const categoryList = ['Lifestyle', 'Fitness', 'Skincare', 'Work', 'Sleep'];
  const unitList = ['Days', 'Weeks', 'Months'];

  const sampleImages = [
    require('../Images/sample1.png'),
    require('../Images/sample2.png'),
    require('../Images/sample3.png'),
    require('../Images/sample4.png'),
    require('../Images/sample5.png'),
  ];

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Permission Required',
          message: 'App needs access to your gallery to upload images.',
          buttonPositive: 'Allow',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      alert('Permission denied to access gallery.');
      return;
    }

    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel || response.errorCode) return;
      const uri = response.assets?.[0]?.uri;
      if (uri) {
        setGalleryImage(uri);
        setSelectedImageIndex(null);
      }
    });
  };

  const closeDropdowns = () => {
    setShowCategoryDropdown(false);
    setShowUnitDropdown(false);
  };

  const renderDropdown = (list, selected, setSelected, visible, setVisible) =>
    visible && (
      <View style={styles.dropdownList}>
        {list.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dropdownItem}
            onPress={() => {
              setSelected(item);
              setVisible(false);
            }}
          >
            <Text style={styles.dropdownItemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        closeDropdowns();
      }}
    >
      <View style={styles.root}>
        <StatusBar backgroundColor="#CFEBCF80" barStyle="dark-content" />

        {/* Header */}
        <View style={styles.headerBox}>
          {/* Decorative Circles */}
          <View style={styles.circle1} />
          <View style={styles.circle2} />

          <View style={styles.header}>
            <TouchableOpacity onPress={()=>{
              Navigation.navigate("ConsultationRoutine")
            }}>
            <Ionicons name="arrow-back" size={moderateScale(24)} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.title}>Create Routine</Text>
              <Text style={styles.subtitle}>Create your own routine</Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.stepIndicator}>
              <View style={[styles.step]} />
              <View style={styles.step} />
            </View>

            <View style={styles.floatingLabelContainer}>
              <Text style={[styles.floatingLabel, { top: -moderateScale(4) }]}>
                Routine Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Hair Care Routine"
                placeholderTextColor="#999"
              />
            </View>
            <Text style={styles.hint}>
              This will be displayed as your Routine name.
            </Text>

            <View style={styles.floatingLabelContainer}>
              <Text style={styles.floatingLabel}>Category</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <Text style={styles.dropdownText}>{selectedCategory}</Text>
                <Ionicons
                  name="chevron-down"
                  size={moderateScale(18)}
                  color="#000"
                />
              </TouchableOpacity>
              {renderDropdown(
                categoryList,
                selectedCategory,
                setSelectedCategory,
                showCategoryDropdown,
                setShowCategoryDropdown,
              )}
            </View>
            <Text style={styles.hint}>
              Please select the category of your Routine.
            </Text>

            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              {galleryImage ? (
                <Image
                  source={{ uri: galleryImage }}
                  style={styles.uploadedImage}
                />
              ) : (
                <>
                  <Ionicons
                    name="image-outline"
                    size={moderateScale(40)}
                    color="black"
                  />
                  <Text style={styles.uploadText}>Upload Image</Text>
                </>
              )}
            </TouchableOpacity>
            <Text style={styles.hint}>
              This will be displayed as your Routine thumbnail.
            </Text>

            <Text style={styles.or}>OR</Text>
            <Text style={styles.label}>Select from our picks</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.sampleRow}
            >
              {sampleImages.map((img, index) => {
                const isSelected = selectedImageIndex === index;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedImageIndex(index);
                      setGalleryImage(null);
                    }}
                  >
                    <Image
                      source={img}
                      style={[
                        styles.sampleImage,
                        isSelected && styles.selectedImageBorder,
                      ]}
                    />
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={moderateScale(18)}
                        color="#2E7D32"
                        style={styles.selectedCheck}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.floatingLabelContainer}>
              <Text style={[styles.floatingLabel, { top: -moderateScale(2) }]}>
                Description
              </Text>
              <TextInput
                style={[styles.descriptionBox, { height: moderateScale(90) }]}
                multiline
                placeholder="• Add 3 key points about the routine"
                placeholderTextColor="#888"
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <Text style={styles.hint}>
              Please add at least 3 pointers about the Routine.
            </Text>

            <View style={styles.durationRow}>
              <View style={[styles.durationBox, styles.floatingLabelContainer]}>
                <Text
                  style={[styles.floatingLabel, { top: -moderateScale(3) }]}
                >
                  Duration
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="6"
                  keyboardType="numeric"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={[styles.unitBox, styles.floatingLabelContainer]}>
                <Text
                  style={[styles.floatingLabel, { top: -moderateScale(2) }]}
                >
                  Unit
                </Text>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setShowUnitDropdown(!showUnitDropdown)}
                >
                  <Text style={styles.dropdownText}>{selectedUnit}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={moderateScale(18)}
                    color="#000"
                  />
                </TouchableOpacity>
                {renderDropdown(
                  unitList,
                  selectedUnit,
                  setSelectedUnit,
                  showUnitDropdown,
                  setShowUnitDropdown,
                )}
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
              Navigation.navigate("RoutineStepTwo")
              }}
              style={styles.saveBtn}
            >
              <Text style={styles.saveBtnText}>Save and Proceed</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F9F5',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F9F5',
  },
  scroll: {
    padding: moderateScale(16),
    paddingBottom: moderateScale(50),
  },
  headerBox: {
    backgroundColor: '#CFEBCF80',
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: moderateScale(16),
    height:moderateScale(130)
  },
    circle1: {
    position: 'absolute',
    top: moderateScale(-30),
    right: moderateScale(-30),
    width: moderateScale(150),
    height: moderateScale(150),
    backgroundColor: '#BFE2BF',
    borderRadius: moderateScale(50),
    opacity: 0.35,
    zIndex: 0,
  },
  circle2: {
    position: 'absolute',
    bottom: moderateScale(-20),
    left: moderateScale(-20),
    width: moderateScale(130),
    height: moderateScale(130),
    backgroundColor: '#A5D6A7',
    borderRadius: moderateScale(40),
    opacity: 0.25,
    zIndex: 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(20)
  },
  headerContent: {
    marginLeft: moderateScale(10),
    flex: 1,
  },
  title: {
    fontSize: fontSize(17),
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: fontSize(13),
    color: '#444',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: moderateScale(20),
  },
  step: {
    height: 6,
    width: moderateScale(130),
    backgroundColor: '#D1D5DB',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeStep: {
    backgroundColor: '#2E7D32',
  },
  floatingLabelContainer: {
    position: 'relative',
    marginTop: moderateScale(24),
  },
  floatingLabel: {
    position: 'absolute',
    top: -moderateScale(1),
    left: moderateScale(12),
    backgroundColor: '#F5F9F5',
    paddingHorizontal: moderateScale(4),
    fontSize: fontSize(11),
    color: '#444',
    zIndex: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: moderateScale(10),
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    fontSize: fontSize(13),
    color: '#000',
    backgroundColor: '#fff',
    marginTop: moderateScale(5),
  },
  hint: {
    fontSize: fontSize(11),
    color: '#888',
    marginTop: moderateScale(4),
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: moderateScale(10),
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#fff',
    marginTop: moderateScale(6),
  },
  dropdownText: {
    fontSize: fontSize(13),
    color: '#000',
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: moderateScale(10),
    marginTop: moderateScale(4),
    elevation: 3,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
  },
  dropdownItemText: {
    fontSize: fontSize(13),
    color: '#000',
  },
  uploadBox: {
    height: moderateScale(220),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D7E2D7',
    marginTop: moderateScale(12),
    overflow: 'hidden',
    width: '70%',
    alignSelf: 'center',
  },
  uploadText: {
    fontSize: fontSize(15),
    color: 'black',
    marginTop: moderateScale(6),
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  or: {
    textAlign: 'center',
    fontSize: fontSize(12),
    color: '#666',
    marginVertical: moderateScale(10),
  },
  label: {
    fontSize: fontSize(13),
    color: '#222',
    marginTop: moderateScale(10),
  },
  sampleRow: {
    marginTop: moderateScale(8),
    flexDirection: 'row',
  },
  sampleImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(10),
    marginRight: moderateScale(10),
  },
  selectedImageBorder: {
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  selectedCheck: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  descriptionBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    backgroundColor: '#fff',
    marginTop: moderateScale(6),
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(16),
  },
  durationBox: {
    flex: 1,
    marginRight: moderateScale(10),
    marginTop: moderateScale(12),
  },
  unitBox: {
    flex: 1,
  },
  saveBtn: {
    backgroundColor: '#2E7D32',
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(24),
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSize(14),
  },
});
