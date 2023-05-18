import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
  Dimensions,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAtom, useSetAtom } from "jotai";
import { selectedImageAtom, selectedImageLocationAtom } from "../../atoms/post";
import * as MediaLibrary from "expo-media-library";
import { LightText } from "./styles";
import { useWindowDimensions } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import openCage from "opencage-api-client";

export default function InstaCamera() {
  const navigator = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  const setImage = useSetAtom(selectedImageAtom);
  const setLocation = useSetAtom(selectedImageLocationAtom);

  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      const data = await openCage.geocode({
        q: `${location.coords.latitude},${location.coords.longitude}`,
        key: "a867628c27a441eb93ad3aff71559fad",
        language: "en",
      });
      const tags = data.results[0];
      setLocation({
        location,
        place: `${tags?.components?.town}, ${tags?.components?.state_code}`,
      });
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {
        quality: 0.5,
        skipProcessing: false,
        exif: true,
      };
      const { uri } = await cameraRef.current.takePictureAsync(options);
      const asset = await MediaLibrary.createAssetAsync(uri);
      setImage(asset);
      navigator.navigate("Edit");
    }
  };

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LightText>No access to camera</LightText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ ...styles.cameraContainer, ...{ width, height } }}>
        <Camera type={type} ref={cameraRef} style={{ flex: 1 }} ratio="16:9">
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigator.goBack()}>
              <Ionicons name="close" size={36} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={takePicture}
              style={styles.captureButton}
            >
              <View style={styles.outerCircle}>
                <View style={styles.innerCircle} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", right: 10, bottom: 10 }}
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            >
              <Ionicons name="camera-reverse" size={36} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = windowWidth * (9 / 16); // Maintain the 16:9 ratio

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(18,18,18)",
  },
  cameraContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    margin: 20,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  captureButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    backgroundColor: "transparent",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "white",
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 35,
    width: 70,
    height: 70,
  },
});
