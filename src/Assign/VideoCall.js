import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontSize, { moderateScale } from '../utils/metrix';
import Navigation from '../Navigations/Navigation';
import { useNavigation } from '@react-navigation/native';

export default function VideoCall() {
  const Navigation= useNavigation();
  return (
    <View style={styles.container}>
      {/* Back Button and Title */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={moderateScale(24)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>mark-hay-video-call</Text>
        <TouchableOpacity>
          <Ionicons name="sync" size={moderateScale(24)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Fullscreen Video Placeholder */}
      <Image
        source={require('../Images/mark.png')} // Replace with your video feed or stream
        style={styles.fullVideo}
        resizeMode="cover"
      />

      {/* PiP small video preview */}
      <Image
        source={require('../Images/girl.png')} // Replace with your PiP video feed
        style={styles.pipVideo}
        resizeMode="cover"
      />

      {/* Control buttons */}
      <View style={styles.controlBar}>
        <TouchableOpacity onPress={()=>{
          Navigation.navigate("NewAssign");
        }}style={[styles.controlButton,{backgroundColor: 'red',height:moderateScale(50),width
          : moderateScale(50),alignItems: 'center',justifyContent: 'center'
        }]}>
         <Image source={require("../Images/Dial.png")}  />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton,{backgroundColor: 'white',borderWidth: 0.8}]}>
          <Ionicons name="videocam" size={moderateScale(24)} color="#3A643B" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton,{backgroundColor: 'white'}]}>
          <Ionicons name="mic" size={moderateScale(24)} color="#3A643B" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton,{backgroundColor: 'white'}]}>
            <Image style={{tintColor: "#3A643B"}} source={require("../Images/vcicon.png")}/>
                    </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton,{backgroundColor: 'white'}]}>
          <Ionicons name="information-circle" size={moderateScale(24.5)} color="#3A643B"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: moderateScale(15),
    left: moderateScale(10),
    right: moderateScale(10),
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:moderateScale(10)
  },
  title: {
    color: '#fff',
    fontSize: fontSize(14),
    marginLeft: moderateScale(-150)
  },
  fullVideo: {
    width: moderateScale(400),
    height: moderateScale(900),
    position: 'absolute',
  },
  pipVideo: {
    position: 'absolute',
    width: moderateScale(100),
    height: moderateScale(150),
    bottom: moderateScale(100),
    right: moderateScale(15),
    borderRadius: moderateScale(10),
    borderWidth: 2,
    borderColor: '#fff',
  },
  controlBar: {
    position: 'absolute',
    bottom: moderateScale(30),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#2E7D32',
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
  },
});
