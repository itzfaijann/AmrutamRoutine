import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import fontSize, { moderateScale } from '../../utils/metrix';

export default function AddProduct({ navigation }) {
  const [productName, setProductName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [productLink, setProductLink] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, (res) => {
      if (!res.didCancel && res.assets?.length) {
        setImageUri(res.assets[0].uri);
      }
    });
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
        <Text style={styles.headerTitle}>Add Your Product</Text>
        <Text style={styles.subHeader}>Add your product to the product list</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: moderateScale(100) }}
        keyboardShouldPersistTaps="handled"
        style={styles.content}
      >
        {/* Help Box */}
        <View style={styles.helpRow}>
          <Ionicons
            name="help-circle"
            size={moderateScale(26)}
            color="#6FB18A"
            style={{ marginRight: moderateScale(10) }}
          />
          <Text style={styles.helpText}>
            Unable to find your product? Add your product by filling a few details for better experience with Amrutam. 🤝
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Enter Product Details</Text>

        {/* Product Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Product Name</Text>
          <TextInput
            value={productName}
            onChangeText={setProductName}
            style={styles.inputBox}
            placeholder="Enter Product Name"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Brand Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Brand Name</Text>
          <TextInput
            value={brandName}
            onChangeText={setBrandName}
            style={styles.inputBox}
            placeholder="Enter Brand Name"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Upload Image */}
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

        {/* OR Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Product Link */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Product Link</Text>
          <TextInput
            value={productLink}
            onChangeText={setProductLink}
            style={styles.inputBox}
            placeholder="https://yourproductlink.com"
            placeholderTextColor="#aaa"
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('ProductSuccess')}
      >
        <Text style={styles.addBtnText}>Add Product</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    paddingTop: moderateScale(10),
  },
  helpRow: {
    flexDirection: 'row',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
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
    color: '#000',
    marginBottom: moderateScale(20),
  },
  inputGroup: {
    marginBottom: moderateScale(24),
    position: 'relative',
  },
  inputLabel: {
    position: 'absolute',
    top: -moderateScale(8),
    left: moderateScale(14),
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(6),
    fontSize: fontSize(11),
    color: '#666',
    zIndex: 1,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(10),
    paddingTop: moderateScale(14),
    paddingBottom: moderateScale(10),
    paddingHorizontal: moderateScale(14),
    fontSize: fontSize(13),
    color: '#000',
    backgroundColor: '#fff',
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    backgroundColor: '#F1F6F3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(60),
    marginBottom: moderateScale(30),
  },
  uploadText: {
    fontSize: fontSize(13),
    color: '#666',
    marginTop: moderateScale(10),
  },
  previewImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(8),
    resizeMode: 'cover',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: moderateScale(10),
    color: '#888',
    fontSize: fontSize(12),
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
    fontSize: fontSize(15),
    fontWeight: '600',
  },
});
