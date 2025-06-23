import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  ScrollView,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../../utils/metrix';
import { useNavigation } from '@react-navigation/native';

const DropDown = ({ label, value, options = [], onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Normalize options for both flat and grouped arrays
  const normalizedOptions =
    Array.isArray(options) && typeof options[0] === 'string'
      ? [{ title: '', data: options }]
      : options || [];

  const toggleGroup = (title) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <View style={styles.inputGroup}>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.dropdown}>
        <Text style={value ? styles.selectedValue : styles.placeholder}>
          {value || 'Select'}
        </Text>
        <Ionicons name="chevron-down" size={moderateScale(18)} color="#555" />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => {
            setVisible(false);
            setSearchQuery('');
            setExpandedGroups({});
          }}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            {Object.values(expandedGroups).some(val => val) && (
              <TextInput
                style={styles.searchBox}
                placeholder="Search..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            )}
            <ScrollView>
              {normalizedOptions.map((group, i) => {
                const isExpanded = expandedGroups[group.title] ?? false;
                const filtered = group.data.filter(item =>
                  item.toLowerCase().includes(searchQuery.toLowerCase())
                );
                const itemsToShow = isExpanded ? filtered : group.data.slice(0, 3);

                return (
                  <View key={i}>
                    {group.title ? (
                      <View style={styles.groupHeader}>
                        <Text style={styles.groupTitle}>{group.title}</Text>
                        {group.data.length >= 3 && (
                          <TouchableOpacity onPress={() => toggleGroup(group.title)}>
                            <Text style={styles.seeAll}>
                              {isExpanded ? 'See Less' : 'See All'}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ) : null}
                    {itemsToShow.length > 0 ? (
                      itemsToShow.map((item, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={styles.optionItem}
                          onPress={() => {
                            onSelect(item);
                            setVisible(false);
                            setSearchQuery('');
                            setExpandedGroups({});
                          }}
                        >
                          <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text style={styles.noResultText}>No results found</Text>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const AddReminder2 = () => {
  const Navigation = useNavigation();
  const [productName, setProductName] = useState('Abhyanga (Self Massage)');
  const [productType, setProductType] = useState('Consumable');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('TBSP');
  const [frequency, setFrequency] = useState('Custom Days');
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const Day = ({ day }) => {
    const selected = selectedDays.includes(day);
    return (
      <TouchableOpacity
        style={[styles.dayButton, selected && styles.dayButtonSelected]}
        onPress={() => toggleDay(day)}
      >
        <Text style={[styles.dayText, selected && styles.dayTextSelected]}>
          {day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <TouchableOpacity onPress={()=>{
            Navigation.navigate("AddReminder")
        }} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={moderateScale(22)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Reminder Items</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.activeBar} />
        <View style={styles.activeBar} />
        <View style={styles.inactiveBar} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Enter Product Details</Text>

      <DropDown
  label="Product Name"
  value={productName}
  options={[
    {
      title: 'Dinacharya',
      data: [
        'Oil Pulling (Gandusha)',
        'Tongue Cleaning',
        'Abhyanga (Self Massage)',
        'Nasya (Nasal Oil Application)',
        'Drinking Warm Water',
        'Sun Salutation (Surya Namaskar)',
        'Waking up before Sunrise',
        'Bathing with Herbal Powders',
      ],
    },
    {
      title: '🌙 Evening & Sleep Routine',
      data: [
        'Digital Detox Before Bed',
        'Sleep Meditation',
        'Foot Massage with Oil',
        'Journaling Reflection',
      ],
    },
  ]}
  onSelect={setProductName}
/>

        <Text style={styles.linkText}>Unable to find Product? Add your Product</Text>

        <DropDown
          label="Product Type"
          value={productType}
          options={["Consumable", "Topical"]}
          onSelect={setProductType}
        />

        <View style={styles.row}>
          <View style={{ width: moderateScale(100) }}>
            <View style={styles.labelWrapperSmall}>
              <Text style={styles.label}>Quantity</Text>
            </View>
            <View style={styles.quantityBox}>
              <Text style={styles.qtyText}>{quantity}</Text>
              <View style={styles.arrowWrap}>
                <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
                  <Ionicons name="chevron-up" size={moderateScale(16)} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <Ionicons name="chevron-down" size={moderateScale(16)} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ width: moderateScale(120) }}>
            <DropDown
              label="Unit"
              value={unit}
              options={["TBSP", "ML", "Capsule"]}
              onSelect={setUnit}
            />
          </View>
        </View>

        <View style={styles.frequencyRow}>
          {["Daily", "Custom Days"].map((type) => (
            <TouchableOpacity
              key={type}
              style={styles.radioOption}
              onPress={() => setFrequency(type)}
            >
              <View style={[styles.radioOuter, frequency === type && styles.radioOuterActive]}>
                {frequency === type && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {frequency === 'Custom Days' && (
          <View style={styles.daysWrap}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <Day key={d} day={d} />
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity onPress={() => Navigation.navigate("AddReminder3")} style={styles.nextBtn}>
        <Text style={styles.nextText}>Next (2/3)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddReminder2;

// Styles stay unchanged

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: moderateScale(50),
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(30),
    backgroundColor: '#E6F2E9',
    borderBottomLeftRadius: moderateScale(30),
    borderBottomRightRadius: moderateScale(30),
    position: 'relative',
    overflow: 'hidden',
  },
  circleTopRight: {
    position: 'absolute',
    top: -moderateScale(20),
    right: -moderateScale(20),
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: '#C6E6D0',
  },
  circleBottomLeft: {
    position: 'absolute',
    bottom: -moderateScale(20),
    left: -moderateScale(20),
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: '#C6E6D0',
  },
  backBtn: {
    position: 'absolute',
    top: moderateScale(50),
    left: moderateScale(20),
    zIndex: 1,
  },
  headerTitle: {
    fontSize: fontSize(20),
    fontWeight: 'bold',
    marginTop: moderateScale(20),
    color: '#000',
    zIndex: 1,
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
  inactiveBar: {
    flex: 1,
    backgroundColor: '#ccc',
    borderRadius: moderateScale(5),
  },
  content: {
    paddingHorizontal: moderateScale(20),
    flex: 1,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: fontSize(16),
    marginBottom: moderateScale(16),
  },
  linkText: {
    color: 'green',
    fontSize: fontSize(13),
    marginBottom: moderateScale(20),
  },
  inputGroup: {
    marginBottom: moderateScale(24),
    position: 'relative',
    marginTop: moderateScale(10),
  },
  labelWrapper: {
    position: 'absolute',
    top: -moderateScale(10),
    left: moderateScale(12),
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(4),
    zIndex: 2,
  },
  labelWrapperSmall: {
    position: 'absolute',
    top: -moderateScale(10),
    left: moderateScale(12),
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(4),
    zIndex: 2,
  },
  label: {
    fontSize: fontSize(11),
    color: '#555',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedValue: { fontSize: fontSize(14), color: '#000' },
  placeholder: { fontSize: fontSize(14), color: '#888' },
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
  searchBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    marginHorizontal: moderateScale(14),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(6),
    fontSize: fontSize(13),
    color: '#000',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(14),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(4),
  },
  groupTitle: {
    fontSize: fontSize(12),
    color: '#888',
    fontWeight: '500',
  },
  seeAll: {
    fontSize: fontSize(12),
    color: 'green',
    fontWeight: '500',
  },
  noResultText: {
    textAlign: 'center',
    paddingVertical: moderateScale(10),
    color: '#999',
    fontSize: fontSize(13),
  },
  optionItem: {
    padding: moderateScale(14),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: { fontSize: fontSize(14), color: '#000' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
    marginTop: moderateScale(10),
  },
  quantityBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: moderateScale(200),
  },
  qtyText: {
    fontSize: fontSize(14),
    color: '#000',
  },
  arrowWrap: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: moderateScale(6),
  },
  frequencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
    paddingRight: moderateScale(50),
  },
  radioOption: { flexDirection: 'row', alignItems: 'center' },
  radioOuter: {
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: moderateScale(9),
    borderWidth: 1.5,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(6),
    marginTop: moderateScale(10),
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
    marginTop: moderateScale(11),
  },
  daysWrap: {
    backgroundColor: '#E9F1E0',
    borderRadius: moderateScale(18),
    padding: moderateScale(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  dayButton: {
    borderRadius: moderateScale(6),
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(10),
  },
  dayButtonSelected: {
    backgroundColor: 'green',
  },
  dayText: {
    color: '#333',
    fontSize: fontSize(15),
  },
  dayTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  nextBtn: {
    backgroundColor: '#3A643B',
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(30),
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: fontSize(16),
    fontWeight: '600',
  },
});
