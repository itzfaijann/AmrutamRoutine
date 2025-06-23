import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../utils/metrix';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function RoutineStepTwo() {
  const Navigation = useNavigation();
  const route = useRoute();
  const weeklyBenefits = route.params?.weeklyBenefits || {
    '0-2': [],
    '2-4': [],
    '4-6': [],
  };

  const hasWeeklyBenefits = Object.values(weeklyBenefits).every(
    range => range.some(b => b.trim() !== '')
  );

  const [submitted, setSubmitted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.circleTopRight} />
          <View style={styles.circleBottomLeft} />
          <TouchableOpacity style={styles.backButton} onPress={() => Navigation.navigate("NewRoutine")}>
            <Ionicons name="arrow-back" size={moderateScale(24)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Create Routine</Text>
          <Text style={styles.subtitle}>Create your own routine</Text>
        </View>

        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          <View style={[styles.step, styles.filledStep]} />
          <View style={[styles.step, styles.activeStep]} />
        </View>

        {/* Reminder Items */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => Navigation.navigate("AddReminder")} style={styles.addRow}>
            <Ionicons name="add-circle-outline" size={moderateScale(30)} color="#2E7D32" />
            <View style={{ marginLeft: moderateScale(10) }}>
              <Text style={styles.addTitle}>Add Reminder Items</Text>
              <Text style={styles.addSub}>Add Items for your Routine</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.card}>
            <Image source={require('../Images/medicine.png')} style={styles.cardImage} />
            <View style={{ flex: 1, paddingHorizontal: moderateScale(10) }}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Amrutam Kuntal Hair C...</Text>
                <Ionicons name="close" size={moderateScale(18)} color="#888" />
              </View>
              <View style={styles.tag}><Text style={styles.tagText}>Consumable</Text></View>
              <TouchableOpacity><Text style={styles.link}>View Details</Text></TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.moreRow}>
            <Text style={styles.moreText}>More Reminder Items  </Text>
            <Text style={styles.countText}>(2)</Text>
            <Ionicons name="chevron-forward" size={moderateScale(18)} color="#666" style={{ marginLeft: moderateScale(190) }} />
          </TouchableOpacity>
        </View>

        {/* Weekly Benefits */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => Navigation.navigate("AddWeeklyBenefit", { weeklyBenefits })} style={styles.addRow}>
            <Ionicons name="add-circle-outline" size={moderateScale(30)} color="#2E7D32" />
            <View style={{ marginLeft: moderateScale(10) }}>
              <Text style={styles.addTitle}>Add Weekly Benefits</Text>
              <Text style={styles.addSub}>Add weekly benefits of this Routine so that users can tally the progress</Text>
            </View>
          </TouchableOpacity>

          {submitted && !hasWeeklyBenefits && (
            <View style={{ marginTop: moderateScale(6), flexDirection: 'row', alignItems: 'center', marginLeft: moderateScale(6) }}>
              <Ionicons name="alert-circle-outline" style={{marginBottom: moderateScale(10)}} size={moderateScale(17)} color="red" />
              <Text style={styles.warningText}>
                {"  "}2 weeks benefits left. Add at least one benefit in each week to enhance the experience!
              </Text>
            </View>
          )}

          {!submitted && hasWeeklyBenefits && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: moderateScale(6), marginTop: moderateScale(6) }}>
              <Ionicons name="checkmark-circle-outline" size={moderateScale(16)} color="green" />
              <Text style={[styles.warningText, { color: 'green', marginLeft: 4 }]}>
                6 of 6 weeks benefits added
              </Text>
            </View>
          )}
        </View>

        {/* Reminder Channels */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => Navigation.navigate("AddReminderChannel")} style={styles.addRow}>
            <Ionicons name="add-circle-outline" size={moderateScale(30)} color="#2E7D32" />
            <View style={{ marginLeft: moderateScale(10) }}>
              <Text style={styles.addTitle}>Add Reminder Channels</Text>
              <Text style={styles.addSub}>We will notify you about your Routine using channels.</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.channelRow}>
            {['SMS', 'Whatsapp', 'Email'].map((channel, idx) => (
              <View key={idx} style={styles.channelTag}>
                <Text style={styles.channelText}>{channel}</Text>
                <Ionicons name="close" size={moderateScale(12)} color="#fff" style={{ marginLeft: 4 }} />
              </View>
            ))}
          </View>
        </View>

        {/* Caregiver */}
        <View style={styles.section}>
          <TouchableOpacity onPress={() => Navigation.navigate("Caregiver")} style={styles.addRow}>
            <Ionicons name="add-circle-outline" size={moderateScale(22)} color="#2E7D32" />
            <View style={{ marginLeft: moderateScale(10) }}>
              <Text style={styles.addTitle}>Assign a Caregiver</Text>
              <Text style={styles.addSub}>We will keep updating caregiver about your Routine.</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.card}>
            <Image source={require('../Images/doctor.png')} style={styles.cardImage} />
            <View style={{ flex: 1, paddingHorizontal: moderateScale(10) }}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Dr. Pooja</Text>
                <Ionicons name="close" size={moderateScale(18)} color="#888" />
              </View>
              <View style={styles.tag}><Text style={styles.tagText}>Recent Consultation</Text></View>
              <View style={styles.requestPendingRow}>
                <Ionicons name="time-outline" size={moderateScale(12)} color="#666" />
                <Text style={styles.pendingText}>Request Pending</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            setSubmitted(true);
            if (hasWeeklyBenefits) {
              Navigation.navigate("NextScreen"); // Replace "NextScreen" with the actual screen name
            }
          }}
        >
          <Text style={styles.saveBtnText}>Proceed</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9F5',
  },
  scroll: {
    paddingBottom: moderateScale(50),
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
    height: moderateScale(130),
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
  backButton: {
    position: 'absolute',
    top: moderateScale(25),
    left: moderateScale(20),
    zIndex: 2,
  },
  title: {
    fontSize: fontSize(22),
    fontWeight: 'bold',
    marginTop: moderateScale(10),
    color: '#000',
  },
  subtitle: {
    fontSize: fontSize(14),
    color: 'gray',
    marginTop: moderateScale(5),
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: moderateScale(20),
  },
  step: {
    height: 6,
    width: moderateScale(130),
    backgroundColor: '#D1D5DB',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  filledStep: {
    backgroundColor: '#2E7D32',
  },
  activeStep: {
    backgroundColor: '#A5D6A7',
  },
  section: {
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(10),
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  addTitle: {
    fontSize: fontSize(13),
    color: '#2E7D32',
    fontWeight: '600',
  },
  addSub: {
    fontSize: fontSize(11),
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: moderateScale(10),
    borderRadius: moderateScale(12),
    elevation: 2,
    marginVertical: moderateScale(8),
    alignItems: 'center',
  },
  cardImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(8),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: fontSize(13),
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  tag: {
    backgroundColor: '#E2F5E1',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginVertical: moderateScale(4),
  },
  tagText: {
    fontSize: fontSize(10),
    color: '#2E7D32',
  },
  link: {
    fontSize: fontSize(11),
    color: '#2E7D32',
    fontWeight: '600',
  },
  moreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(6),
  },
  moreText: {
    fontSize: fontSize(12),
    color: '#666',
  },
  countText: {
    fontSize: fontSize(12),
    color: '#999',
  },
  channelRow: {
    flexDirection: 'row',
    marginTop: moderateScale(8),
    flexWrap: 'wrap',
    gap: moderateScale(8),
  },
  channelTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  channelText: {
    fontSize: fontSize(12),
    color: '#fff',
  },
  requestPendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  pendingText: {
    fontSize: fontSize(11),
    color: '#666',
  },
  saveBtn: {
    backgroundColor: '#2E7D32',
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(24),
    marginHorizontal: moderateScale(16),
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontSize(14),
  },
  warningText: {
    fontSize: fontSize(12),
    color: 'red',
    marginTop: moderateScale(2),
    flex: 1,
    flexWrap: 'wrap',
  },
});
