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
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../utils/metrix';
import ConsultationModal from './ConsultationModal';

export default function ConsultationRoutine() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={moderateScale(24)} color="#000" />
        <Image source={require('../Images/geetanjali.png')} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Geetanjali Shah</Text>
          <Text style={styles.online}>online</Text>
        </View>
      </View>

      {/* System Tag */}
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.systemTag}>
          Your 30/32 conversational messages is completed
        </Text>
      </View>

      {/* Chat Scroll */}
      <ScrollView style={styles.messagesContainer}>
        <Text style={styles.timeLabel}>Today at 16:35 PM</Text>

        <View style={{ marginBottom: moderateScale(2) }}>
          <View style={styles.patientMessage}>
            <Text style={styles.messageText}>Hi, Dr. Prerna, here are my details:</Text>
            <Text style={styles.detailText}>Name: Geetanjali Shah</Text>
            <Text style={styles.detailText}>Age: 34</Text>
            <Text style={styles.detailText}>Gender: Female</Text>
            <Text style={styles.detailText}>Height: 134 cm</Text>
            <Text style={styles.detailText}>Weight: 64 kg</Text>
            <Text style={styles.detailText}>Concern: Immunity</Text>
          </View>
          <Text style={styles.timestampLeft}>Just now</Text>
        </View>

        <View style={styles.downloadCard}>
          <Text style={styles.downloadText}>Download Call Recording</Text>
          <Text style={styles.downloadSub}>
            Your call recording with Dr. Prerna is available
          </Text>
          <Ionicons
            name="download-outline"
            size={moderateScale(20)}
            color="gray"
            style={{ alignSelf: 'flex-end' }}
          />
        </View>

        <Text style={styles.bookingTag}>
          Geetanjali booked 30 conversational messages with you.
        </Text>

        <Text style={styles.timeLabel}>Today at 16:45 PM</Text>

        <View style={{ marginBottom: moderateScale(2) }}>
          <View style={styles.patientMessage}>
            <Text style={styles.messageText}>Hi, Dr. Prerna, here are my details:</Text>
            <Text style={styles.detailText}>Name: Geetanjali Shah</Text>
            <Text style={styles.detailText}>Age: 34</Text>
            <Text style={styles.detailText}>Gender: Female</Text>
            <Text style={styles.detailText}>Height: 134 cm</Text>
            <Text style={styles.detailText}>Weight: 64 kg</Text>
            <Text style={styles.detailText}>Concern: Immunity</Text>
          </View>
          <Text style={styles.timestampLeft}>Just now</Text>
        </View>

        <View style={{ marginBottom: moderateScale(2) }}>
          <View style={styles.patientMessage}>
            <Text style={styles.messageText}>
              How likely are you to recommend this product to your patients?
            </Text>
          </View>
          <Text style={styles.timestampLeft}>Just now</Text>
        </View>

        <Text style={styles.timeLabel}>Today at 16:46 PM</Text>
        <View style={{ marginBottom: moderateScale(2), alignSelf: 'flex-end' }}>
          <View style={styles.doctorMessage}>
            <Text style={styles.doctorText}>
              Hi, Lorem ipsum dolor sit amet consectetur. In elit nisi laoreet nisi nulla
              scelerisque in ultrices. Interdum hac lacus purus id amet eget laoreet amet id.
            </Text>
          </View>
          <Text style={styles.timestampRight}>Just now</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.systemTag2}>
            Your 30/32 conversational messages is completed
          </Text>
        </View>

        <Text style={styles.subText}>
          You have extended 2 more extra conversational messages
        </Text>
      </ScrollView>

      {/* Input Bar */}
      {!modalVisible && (
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>

            <Ionicons name="happy-outline" size={moderateScale(20)} color="#5A7D5A" />
            <TextInput
              placeholder="Type your message"
              placeholderTextColor="#555"
              style={styles.textInput}
            />
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>

            <Ionicons
              name="time-outline"
              size={moderateScale(18)}
              color="#4F704F"
              style={styles.icon}
            />
                        </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                name="attach-outline"
                size={moderateScale(18)}
                color="#4F704F"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={moderateScale(20)} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Modal */}
      {modalVisible && <ConsultationModal visible={modalVisible} onClose={() => setModalVisible(false)} />}
    </View>
  );
}

// Keep the rest of your styles intact


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(15),
    backgroundColor: '#fff',
    elevation: 4,
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    marginHorizontal: moderateScale(10),
  },
  name: { fontSize: fontSize(14), fontWeight: '600' },
  online: { fontSize: fontSize(10), color: 'green' },
  systemTag: {
    backgroundColor: '#FAFAE6',
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(47),
    borderRadius: moderateScale(6),
    fontSize: fontSize(12),
    fontWeight: '500',
    marginVertical: moderateScale(6),
    alignSelf: 'center',
    textAlign: 'center',
  },
  systemTag2: {
    backgroundColor: '#FAFAE6',
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(6),
    fontSize: fontSize(12),
    fontWeight: '500',
    marginVertical: moderateScale(6),
    alignSelf: 'center',
    textAlign: 'center',
  },
  timeLabel: {
    fontSize: fontSize(10),
    color: '#666',
    alignSelf: 'center',
    marginVertical: moderateScale(4),
  },
  bookingTag: {
    fontSize: fontSize(10),
    backgroundColor: '#FAFAE6',
    padding: moderateScale(5),
    borderRadius: moderateScale(6),
    marginVertical: moderateScale(6),
  },
  messagesContainer: { padding: moderateScale(12) },
  patientMessage: {
    backgroundColor: '#F2F2F2',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  messageText: {
    fontSize: fontSize(12),
    fontWeight: '600',
    marginBottom: moderateScale(6),
  },
  detailText: { fontSize: fontSize(11), marginBottom: moderateScale(2) },
  timestampLeft: {
    fontSize: fontSize(9.5),
    color: '#888',
    marginTop: moderateScale(2),
    marginLeft: moderateScale(8),
    fontStyle: 'italic',
    alignSelf: 'flex-start',
  },
  timestampRight: {
    fontSize: fontSize(9.5),
    color: '#888',
    marginTop: moderateScale(2),
    marginRight: moderateScale(8),
    fontStyle: 'italic',
    alignSelf: 'flex-end',
  },
  doctorMessage: {
    backgroundColor: '#305F34',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  doctorText: { fontSize: fontSize(11), color: '#fff' },
  downloadCard: {
    backgroundColor: '#FAFAE6',
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    marginVertical: moderateScale(6),
  },
  downloadText: {
    fontSize: fontSize(12),
    fontWeight: '600',
    marginBottom: moderateScale(4),
  },
  downloadSub: { fontSize: fontSize(11), color: 'gray' },
  subText: {
    fontSize: fontSize(10),
    color: 'gray',
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
    backgroundColor: '#fff',
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(8),
    marginRight: moderateScale(8),
  },
  textInput: {
    flex: 1,
    fontSize: fontSize(12),
    paddingHorizontal: moderateScale(6),
    color: '#333',
  },
  icon: { marginLeft: moderateScale(8) },
  sendButton: {
    backgroundColor: '#305F34',
    padding: moderateScale(12),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
