import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
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
import { useCreateMedia } from "../../data/oldQL";
import { StackActions } from "@react-navigation/native";
import { Row, SmallImage, LightText } from "./styles";
import { ActivityIndicator, TextInput } from "react-native-paper";

import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "./data/CREATE_POST";
import { GET_ALL_POSTS } from "../Feed/data/getAllPosts";
import { uploadToCloudinary } from "./data/uploadToCloudinary";

export default function MakePost({ navigation }) {
  const [creatingPost, setCreatingPost] = useState(false);
  const [image] = useAtom(selectedImageAtom);
  const [location, setLocation] = useAtom(selectedImageLocationAtom);
  const { user } = useAuthenticator((context) => [context.user]);
  const [createPost, { loading: isLoadingMedia }] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const [asset, setAsset] = useState(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    (async function () {
      const asset = await MediaLibrary.getAssetInfoAsync(image);
      setAsset(asset);
    })();
  }, [image]);
  const handleSave = async () => {
    try {
      setCreatingPost(true);
      const asset = await MediaLibrary.getAssetInfoAsync(image);
      const cloudinaryData = await uploadToCloudinary({
        asset,
      });
      console.log("createPost");

      await createPost({
        variables: {
          photoURL: cloudinaryData.url,
          userId: 1,
          location: {
            latitude: location?.coords?.latitude || 0,
            longitude: location?.coords?.longitude || 0,
          },
        },
      });
      navigation.navigate("Feed");
      setCreatingPost(false);
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        creatingPost ? (
          <ActivityIndicator color="lightblue" />
        ) : (
          <TouchableOpacity onPress={handleSave}>
            <MaterialIcons name="check" size={24} color="#2979FF" />
          </TouchableOpacity>
        ),
    });
  }, [navigation, creatingPost]);

  return (
    <View style={styles.container}>
      <SmallImage
        source={{ uri: image.uri }}
        resizeMode="cover"
        isLoading={isLoadingMedia}
      />
      <Row style={{ marginTop: 15 }}>
        <FontAwesome name="map-marker" size={30} color="#2979FF" />
        <LightText style={{ color: "#2979FF", fontSize: 18, marginLeft: 10 }}>
          {location?.place}
        </LightText>
      </Row>

      <Row>
        <TextInput
          style={{
            flex: 1,

            backgroundColor: "black",
          }}
          activeUnderlineColor="lightgrey"
          multiline
          textColor="lightgrey"
          onChangeText={(text) => setCaption(text)}
          placeholder="Say something about this picture..."
        />
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 5,
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
