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
import { useAuth0 } from "react-native-auth0";
import { ActivityIndicator, TextInput } from "react-native-paper";
import * as Location from "expo-location";
import openCage from "opencage-api-client";
import { useCreatePostMutation } from "./data/createPost.generated";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

export default function MakePost({ navigation }) {
  const [image] = useAtom(selectedImageAtom);
  const [location, setLocation] = useAtom(selectedImageLocationAtom);
  const { user } = useAuthenticator((context) => [context.user]);
  const { mutateAsync: createMedia, isLoading: isLoadingMedia } =
    useCreateMedia();
  const [asset, setAsset] = useState(null);
  const [caption, setCaption] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async function () {
      const asset = await MediaLibrary.getAssetInfoAsync(image);
      setAsset(asset);
    })();
  }, [image]);

  useEffect(() => {
    (async function () {
      if (!location.place) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
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
      }
    })();
  }, [location]);

  useEffect(() => {
    const handleSave = async () => {
      try {
        const asset = await MediaLibrary.getAssetInfoAsync(image);
        // console.log("asset", asset);
        const source = {
          uri: asset.localUri,
          type: asset.mediaType,
          name: asset.filename,
          location: location?.location,
          place: location?.place,
        };
        await createMedia({ file: source, user: { id: 1 } });
        console.log("media created");
        // navigation.navigate("Feed");
        // navigation.dispatch(StackActions.popToTop());
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
