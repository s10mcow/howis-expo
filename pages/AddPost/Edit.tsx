import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { selectedImageAtom } from "../../atoms/post";
import { ExpandIconButton, Image } from "./styles";

export default function Edit({ navigation }) {
  const [resizeMode, setResizeMode] = useState("contain");
  const [image] = useAtom(selectedImageAtom);

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: image.uri }} resizeMode={resizeMode} />
        <ExpandIconButton
          onPress={() =>
            setResizeMode(resizeMode === "cover" ? "contain" : "cover")
          }
        >
          <FontAwesome name="expand" size={24} color="white" />
        </ExpandIconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
