import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../../utils/metrix';

export default function ProductSuccess({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="checkmark" size={moderateScale(28)} color="#fff" />
        </View>
        <Text style={styles.successText}>Your Product Is added</Text>
        <Text style={styles.subText}>Go back to complete your journey</Text>
      </View>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("AddReminder2")}
      >
        <Text style={styles.backBtnText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7', // light cream
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    backgroundColor: '#3A643B',
    padding: moderateScale(14),
    borderRadius: moderateScale(40),
    marginBottom: moderateScale(20),
  },
  successText: {
    fontSize: fontSize(18),
    fontWeight: '600',
    color: '#3A643B',
    marginBottom: moderateScale(6),
  },
  subText: {
    fontSize: fontSize(13),
    color: '#555',
  },
  backBtn: {
    backgroundColor: '#3A643B',
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    margin: moderateScale(20),
  },
  backBtnText: {
    color: '#fff',
    fontSize: fontSize(14),
    fontWeight: '600',
  },
});
