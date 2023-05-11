import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  Button,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import {
  beachTypes,
  currentLocationAtom,
  getCurrentBeachesAtom,
} from "../../atoms/beaches";
import { camerasAtom } from "../../atoms/cameras";
import Player from "../../components/Player";
import { Container, Players } from "./HomeStyles";
import { showModalAtom } from "../../atoms/user";

function Home() {
  const [cameras, setCameras] = useAtom(camerasAtom);
  const [currentLocation, setLocation] =
    useAtom<beachTypes>(currentLocationAtom);
  const [beaches] = useAtom(getCurrentBeachesAtom);

  const showFeedInPlayer = (name) => {
    // Implement navigation to feedback
  };

  const renderItem = ({ item, index }) => (
    <Player
      key={index}
      index={index}
      name={item.name}
      url={item.url}
      beachNames={beaches}
      showFeed={showFeedInPlayer}
    />
  );

  return (
    <Container>
      <Players>
        <FlatList
          data={cameras?.[currentLocation]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ width: "100%" }}
        />
      </Players>
    </Container>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
  },
  openButtonText: {
    color: "white",
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
