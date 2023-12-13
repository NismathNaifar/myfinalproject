import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 from @expo/vector-icons
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access media library was denied!');
      }
    })();
  }, []);

  const openCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setCapturedImage(result.uri);
        setSelectedImages(prevImages => [...prevImages, result.uri]);
        console.log('Selected Images:', selectedImages);
      } else {
        console.log('Camera operation cancelled');
      }
    } catch (error) {
      console.log('Error opening camera:', error);
    }
  };

  const openGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImages(prevImages => [...prevImages, result.uri]);
        console.log('Selected Images:', selectedImages);
      } else {
        console.log('Gallery operation cancelled');
      }
    } catch (error) {
      console.log('Error opening gallery:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <FontAwesome5 name="camera" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Click a Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openGallery} style={styles.button}>
        <FontAwesome5 name="images" size={20} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Upload a Picture</Text>
      </TouchableOpacity>

      {capturedImage && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: capturedImage }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.imageContainer}>
        {selectedImages.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image
              source={{ uri }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageWrapper: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default CameraScreen;
