import { MaterialIcons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { useAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { selectedImageAtom, selectedImageLocationAtom } from "../../atoms/post";
import { useCreateMedia } from "../../data";
import { StackActions } from "@react-navigation/native";
import { Row, SmallImage, LightText } from "./styles";
import { useAuth0 } from "react-native-auth0";
import { ActivityIndicator, TextInput } from "react-native-paper";
import * as Location from "expo-location";

export default function MakePost({ navigation }) {
  const [image] = useAtom(selectedImageAtom);
  const [location] = useAtom(selectedImageLocationAtom);
  const { user } = useAuth0();
  const { mutateAsync: createMedia, isLoading: isLoadingMedia } =
    useCreateMedia();
  const [asset, setAsset] = useState(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    (async function () {
      console.log(image);
      const asset = await MediaLibrary.getAssetInfoAsync(image);
      console.log(asset);
      setAsset(asset);
      //add get location of phone
    })();
  }, [image]);

  useEffect(() => {
    const handleSave = async () => {
      try {
        const asset = await MediaLibrary.getAssetInfoAsync(image);
        const source = {
          uri: asset.localUri,
          type: asset.mediaType,
          name: asset.filename,
          location: asset.location,
        };
        await createMedia({ file: source, tags: "", user });
        navigation.navigate("Feed");
        navigation.dispatch(StackActions.popToTop());
      } catch (error) {
        console.log(error);
      }
    };
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          <MaterialIcons name="check" size={24} color="#2979FF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {isLoadingMedia && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="lightblue" />
        </View>
      )}

      <Row>
        <SmallImage
          source={{ uri: image.uri }}
          resizeMode="contain"
          isLoading={isLoadingMedia}
        />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "black",
          }}
          activeUnderlineColor="transparent"
          multiline
          textColor="lightgrey"
          onChangeText={(text) => setCaption(text)}
          placeholder="Write a caption..."
        />
      </Row>

      <LightText>{caption}</LightText>

      <Row style={{ marginTop: 15 }}>
        <LightText color="white">Add location</LightText>
        <LightText color="white">{JSON.stringify(location)}</LightText>
      </Row>
      <LightText>{JSON.stringify(asset)}</LightText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").height / 2,
    resizeMode: "cover",
  },
  nextButton: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
