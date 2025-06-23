import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
  Clipboard,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../../utils/metrix';

const caregivers = [
  {
    id: '1',
    name: 'Dr. Pooja',
    subtitle: 'Recent Consultation',
    image: require('../../Images/doctor.png'),
  },
  {
    id: '2',
    name: 'Sister <3',
    subtitle: 'Recent Caregiver',
    image: require('../../Images/sister.png'),
  },
];

export default function Caregiver({ navigation }) {
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  // Add below your existing useState declarations
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const countryOptions = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+970', flag: '🇵🇸', name: 'Palestine' },
    { code: '+1', flag: '🇺🇸', name: 'USA' },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const openModal = caregiver => {
    setSelectedCaregiver(caregiver);
    setIsConfirmed(false);
    setModalVisible(true);
  };

  const confirmCaregiver = () => {
    setIsConfirmed(true);
  };

  const handleInviteInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const copyLink = () => {
    Clipboard.setString('Invite/Amrutamdesign&t=Z3dKJgN');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Assign a Caregiver</Text>
        <Text style={styles.subtitle}>Assign a caregiver for yourself</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={moderateScale(16)} color="#888" />
        <TextInput
          placeholder="Search for a Caregiver"
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* Quick Add */}
      <Text style={styles.sectionTitle}>Quick Add</Text>
      <FlatList
        data={caregivers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitleText}>{item.subtitle}</Text>
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => openModal(item)}
            >
              <Ionicons name="add" size={moderateScale(18)} color="#3A643B" />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: moderateScale(20) }}
      />

      {/* Invite Button */}
      <TouchableOpacity
        style={styles.inviteBtn}
        onPress={() => setInviteModalVisible(true)}
      >
        <Text style={styles.inviteText}>Invite Your Friend</Text>
      </TouchableOpacity>

      {/* Assign Caregiver Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Image
              source={selectedCaregiver?.image}
              style={styles.modalAvatar}
            />
            <Text style={styles.modalName}>{selectedCaregiver?.name}</Text>

            {isConfirmed ? (
              <>
                <Text style={styles.modalText}>
                  Your request for Assign as Caregiver has been sent ✅
                </Text>
                <TouchableOpacity
                  style={[
                    styles.secondaryBtn,
                    { marginTop: moderateScale(20) },
                  ]}
                  onPress={() => navigation.navigate('RoutineStepTwo')}
                >
                  <Text style={styles.secondaryBtnText}>Go back</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalText}>
                  Are you sure you want to assign {selectedCaregiver?.name} as
                  your Caregiver for this Routine?
                </Text>
                <TouchableOpacity
                  style={styles.primaryBtn}
                  onPress={confirmCaregiver}
                >
                  <Text style={styles.primaryBtnText}>Assign as Caregiver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>View Profile</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Invite Modal */}
      <Modal
        visible={inviteModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setInviteModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setInviteModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.inviteModalWrapper}>
                <ScrollView
                  style={styles.inviteModalContent}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {/* Handle */}
                  <View style={styles.modalHandle} />

                  {/* Copy Link */}
                  <Text style={styles.copyTitle}>Copy Invitation Link</Text>
                  <View style={styles.linkBox}>
                    <Text style={styles.linkText}>
                      Invite/Amrutamdesign&t=Z3dKJgN
                    </Text>
                    <TouchableOpacity onPress={copyLink}>
                      <Ionicons
                        name="copy"
                        size={moderateScale(18)}
                        color="#3A643B"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Divider */}
                  <View style={styles.orRow}>
                    <View style={styles.orLine} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.orLine} />
                  </View>

                  {/* Inputs */}
                  <TextInput
                    placeholder="First Name"
                    value={formData.firstName}
                    onChangeText={text =>
                      handleInviteInputChange('firstName', text)
                    }
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChangeText={text =>
                      handleInviteInputChange('lastName', text)
                    }
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Email ID"
                    value={formData.email}
                    onChangeText={text =>
                      handleInviteInputChange('email', text)
                    }
                    keyboardType="email-address"
                    style={styles.input}
                  />

                  {/* Country + Phone */}
                  <View
                    style={[
                      styles.input,
                      { flexDirection: 'row', alignItems: 'center' },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => setShowCountryPicker(true)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginRight: 8,
                      }}
                    >
                      <Text style={{ fontSize: fontSize(14) }}>
                        {selectedCountry.flag}
                      </Text>
                      <Ionicons
                        name="chevron-down"
                        size={14}
                        color="#555"
                        style={{ marginLeft: 4 }}
                      />
                    </TouchableOpacity>
                    <Text style={{ marginRight: 6 }}>
                      {selectedCountry.code}
                    </Text>
                    <TextInput
                      placeholder="Mobile Number"
                      style={{ flex: 1 }}
                      keyboardType="phone-pad"
                      value={formData.phone}
                      onChangeText={text =>
                        handleInviteInputChange('phone', text)
                      }
                    />
                  </View>

                  {/* Submit */}
                  <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitText}>Submit</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>

        {/* Country Picker Modal */}
        <Modal
          transparent
          animationType="fade"
          visible={showCountryPicker}
          onRequestClose={() => setShowCountryPicker(false)}
        >
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setShowCountryPicker(false)}
          >
            <View style={styles.countryDropdown}>
              {countryOptions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.countryRow}
                  onPress={() => handleCountrySelect(item)}
                >
                  <Text style={{ fontSize: 16 }}>{item.flag}</Text>
                  <Text style={{ marginLeft: 10 }}>
                    {item.name} ({item.code})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </Modal>
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#E6F2E9',
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(30),
    paddingHorizontal: moderateScale(20),
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    position: 'relative',
    overflow: 'hidden',
    height: moderateScale(170),
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
  },
  backBtn: {
    position: 'absolute',
    top: moderateScale(50),
    left: moderateScale(20),
    zIndex: 10,
  },
  title: {
    fontSize: fontSize(18),
    fontWeight: '700',
    color: '#000',
    marginTop: moderateScale(45),
    marginLeft: moderateScale(10),
  },
  subtitle: {
    fontSize: fontSize(12),
    color: '#444',
    marginTop: 8,
    marginLeft: moderateScale(10),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F4F3',
    borderRadius: 12,
    paddingHorizontal: moderateScale(14),
    margin: moderateScale(20),
    height: moderateScale(44),
  },
  searchInput: {
    flex: 1,
    marginLeft: moderateScale(8),
    fontSize: fontSize(13),
  },
  sectionTitle: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#000',
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(8),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    marginRight: moderateScale(12),
  },
  info: { flex: 1 },
  name: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#000',
  },
  subtitleText: {
    fontSize: fontSize(12),
    color: '#777',
    marginTop: moderateScale(2),
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A643B',
    borderRadius: 6,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
  },
  addText: {
    fontSize: fontSize(13),
    color: '#3A643B',
    marginLeft: moderateScale(4),
  },
  inviteBtn: {
    borderWidth: 1,
    borderColor: '#3A643B',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(14),
    margin: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteText: {
    fontSize: fontSize(15),
    color: '#3A643B',
    fontWeight: '600',
  },

  // Modals shared
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: moderateScale(24),
    alignItems: 'center',
  },
  modalHandle: {
    width: moderateScale(40),
    height: moderateScale(5),
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginBottom: moderateScale(16),
  },
  modalAvatar: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    marginBottom: moderateScale(12),
  },
  modalName: {
    fontSize: fontSize(16),
    fontWeight: '700',
    color: '#000',
    marginBottom: moderateScale(8),
  },
  modalText: {
    fontSize: fontSize(13),
    color: '#555',
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  primaryBtn: {
    backgroundColor: '#3A643B',
    paddingVertical: moderateScale(12),
    width: width * 0.8,
    borderRadius: 8,
    marginBottom: moderateScale(10),
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: fontSize(14),
    textAlign: 'center',
  },
  secondaryBtn: {
    borderColor: '#3A643B',
    borderWidth: 1,
    paddingVertical: moderateScale(12),
    width: width * 0.8,
    borderRadius: 8,
  },
  secondaryBtnText: {
    color: '#3A643B',
    fontWeight: '600',
    fontSize: fontSize(14),
    textAlign: 'center',
  },

  inviteModalWrapper: {
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  inviteModalContent: {
    padding: moderateScale(20),
  },
  copyTitle: {
    fontSize: fontSize(14),
    fontWeight: '600',
    color: '#000',
    marginBottom: moderateScale(10),
  },
  linkBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  linkText: {
    fontSize: fontSize(13),
    color: '#333',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: moderateScale(10),
    fontSize: fontSize(12),
    color: '#888',
  },
  input: {
    borderWidth: 1,
    borderColor: '#3A643B',
    borderRadius: 10,
    padding: moderateScale(12),
    marginBottom: moderateScale(18),
    fontSize: fontSize(13),
    color: '#000',
  },
  submitBtn: {
    backgroundColor: '#3A643B',
    borderRadius: 10,
    paddingVertical: moderateScale(14),
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: fontSize(14),
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  countryDropdown: {
    backgroundColor: '#fff',
    padding: moderateScale(16),
    borderRadius: 8,
    width: '80%',
  },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
});
