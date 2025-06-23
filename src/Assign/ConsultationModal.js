// components/ConsultationModal.js
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../utils/metrix';
import { useNavigation } from '@react-navigation/native';

export default function ConsultationModal({ visible, onClose }) {
  const Navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.fullScreenOverlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modalBox}>
          <View style={styles.handleBar} />
          <Text style={styles.modalTitle}>
            <Ionicons
              name="information-circle-outline"
              size={moderateScale(16)}
            />{' '}
            Well done! Consultation time is over 🎉
          </Text>

          <TouchableOpacity onPress={()=>{
            Navigation.navigate("AssignValue")
          }} style={styles.filledButton}>
            <Text style={styles.filledText}>Assign a Routine</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            Navigation.navigate("NewRoutine")
          }} style={styles.outlineButton}>
            <Text style={styles.outlineText}>Create a New Routine</Text>
          </TouchableOpacity>

          <Pressable>
            <Text style={styles.linkText}>Learn more about Routine</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenOverlay: {
    flex:1,
    ...RNStyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  backdrop: { flex: 1 },
  modalBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    padding: moderateScale(20),
    alignItems: 'center',
  },
  handleBar: {
    width: moderateScale(40),
    height: moderateScale(4),
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginBottom: moderateScale(12),
  },
  modalTitle: {
    fontSize: fontSize(12),
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: moderateScale(20),
  },
  filledButton: {
    backgroundColor: '#305F34',
    width: '100%',
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  filledText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: fontSize(12),
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#305F34',
    width: '100%',
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  outlineText: {
    color: '#305F34',
    fontWeight: '600',
    fontSize: fontSize(12),
  },
  linkText: {
    color: '#305F34',
    fontSize: fontSize(11),
    textDecorationLine: 'underline',
  },
});
