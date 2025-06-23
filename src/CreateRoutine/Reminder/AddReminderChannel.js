import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../../utils/metrix';

const countries = [
  { code: '+91', flag: '🇮🇳' },
  { code: '+1', flag: '🇺🇸' },
  { code: '+44', flag: '🇬🇧' },
];

export default function AddReminderChannels({ navigation }) {
  const [channels, setChannels] = useState({
    sms: true,
    whatsapp: true,
    email: true,
    google: false,
    facebook: false,
    instagram: false,
  });

  const [country, setCountry] = useState(countries[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const [mobileNumber, setMobileNumber] = useState('9871708209');
  const [whatsappNumber, setWhatsappNumber] = useState('9871708209');
  const [email, setEmail] = useState('amrutamxyz@gmail.com');

  const toggleChannel = key => {
    setChannels(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderPhoneInput = (value, setValue) => (
    <View style={styles.phoneInputWrapper}>
      <TouchableOpacity
        style={styles.flagSection}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flagText}>{country.flag}</Text>
        <Ionicons
          name="chevron-down"
          size={16}
          color="#000"
          style={{ marginLeft: 4 }}
        />
        <Text style={styles.countryCode}>{country.code}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.phoneInput}
        value={value}
        onChangeText={setValue}
        placeholder="Enter number"
        keyboardType="phone-pad"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={moderateScale(22)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Reminder Channels</Text>
        <Text style={styles.subHeader}>
          Add channels to get reminded about the reminder
        </Text>
      </View>

      <View style={styles.content}>
        {['sms', 'whatsapp', 'email'].map(key => (
          <View key={key} style={styles.channelSection}>
            <View style={styles.channelRow}>
              <Text style={styles.channelLabel}>{key.toUpperCase()}</Text>
              <Switch
                value={channels[key]}
                onValueChange={() => toggleChannel(key)}
              />
            </View>
            {(key === 'sms' || key === 'whatsapp') &&
              renderPhoneInput(
                key === 'sms' ? mobileNumber : whatsappNumber,
                key === 'sms' ? setMobileNumber : setWhatsappNumber,
              )}
            {key === 'email' && (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            )}
            <TouchableOpacity style={styles.addMoreBtn}>
              <Ionicons name="add" size={moderateScale(16)} color="green" />
              <Text style={styles.addMoreText}>Add More</Text>
            </TouchableOpacity>
          </View>
        ))}

        {['google', 'facebook', 'instagram'].map(key => (
          <View key={key} style={styles.channelSection}>
            <View style={styles.channelRow}>
              <Text style={styles.channelLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)} Calendar
              </Text>
              <Switch
                value={channels[key]}
                onValueChange={() => toggleChannel(key)}
              />
            </View>
          
              <TouchableOpacity style={styles.addAccountBtn}>
                <Ionicons name="add" size={moderateScale(16)} color="green" />
                <Text style={styles.addMoreText}>Add Account</Text>
              </TouchableOpacity>
            
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Save Channels</Text>
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="slide">
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={countries}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setCountry(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.countryText}>
                    {item.flag} {item.code}
                  </Text>
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
    paddingBottom: moderateScale(100),
  },
  channelSection: {
    marginBottom: moderateScale(30),
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: '#fff',
  },
  flagSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  flagText: {
    fontSize: fontSize(18),
  },
  countryCode: {
    fontSize: fontSize(13),
    marginLeft: 4,
  },
  phoneInput: {
    flex: 1,
    fontSize: fontSize(13),
    paddingVertical: moderateScale(10),
  },

  channelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  channelLabel: {
    fontSize: fontSize(13),
    fontWeight: '600',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
    fontSize: fontSize(13),
    marginBottom: moderateScale(10),
  },
addMoreBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-end', // <-- This aligns the button to the right
  marginTop: moderateScale(6),
},

  addAccountBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
    alignSelf: 'flex-end'
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
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  flagPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: moderateScale(6),
  },
  flagText: {
    fontSize: fontSize(16),
  },
  countryCode: {
    fontSize: fontSize(13),
    marginRight: moderateScale(6),
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  countryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryText: {
    fontSize: fontSize(14),
    color: '#000',
  },
});
