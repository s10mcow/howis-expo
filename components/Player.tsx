import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { beachTypes, currentLocationAtom } from "../atoms/beaches";
import { camerasAtom } from "../atoms/cameras";
import { showModalAtom } from "../atoms/user";
import { LightText } from "../pages/AddPost/styles";
import ModalSelector from "react-native-modal-selector";
import PickerModal from "react-native-picker-modal-view";

interface Beach {
  url: string;
  name: string;
}

interface PlayerProps {
  url: string;
  name: string;
  index: number;
  beachNames: Beach[];
  showFeed: (name: string) => void;
}

const Player: React.FC<PlayerProps> = ({ url, name, index, beachNames }) => {
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation();
  const [videoWidth, setVideoWidth] = useState(Dimensions.get("window").width);
  const [videoHeight, setVideoHeight] = useState(
    Dimensions.get("window").width * (9 / 16)
  );
  const [_, setCameras] = useAtom(camerasAtom);
  const [currentLocation, setLocation] =
    useAtom<beachTypes>(currentLocationAtom);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
    setShownModal(true);
  };
  const [isModalShown, setShownModal] = useAtom(showModalAtom);

  const buyBeer = () => {
    // Implement PayPal link
    setShowModal(false);
  };
  function setOrientation() {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  }

  // useEffect(() => {
  //   const detectOrientation = async (evt) => {
  //     const { width, height } = Dimensions.get("window");
  //     const orientation = evt.orientationInfo.orientation;

  //     if (
  //       orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
  //       orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
  //     ) {
  //       setVideoWidth(height);
  //       setVideoHeight(width);
  //     } else {
  //       setVideoWidth(width);
  //       setVideoHeight(width * (9 / 16));
  //     }
  //   };

  //   const sub = ScreenOrientation.addOrientationChangeListener((evt) =>

  //   );

  //   return () => {
  //     ScreenOrientation.removeOrientationChangeListener(sub);
  //   };
  // }, [ScreenOrientation, Dimensions]);

  const updateCamera = ({
    index,
    url,
    name,
  }: {
    index: number;
    url: string;
    name: string;
  }) => {
    setCameras((prev) => {
      const currentCams = [...prev[currentLocation]];
      currentCams[index] = { url, name };
      return { ...prev, [currentLocation]: currentCams };
    });
  };

  const changeCamera = (index: number, camera: string) => {
    if (camera === "suggest_new_camera") {
      // handle the email suggestion
    } else {
      const { url, name } = JSON.parse(camera);
      updateCamera({ index, url, name });
    }

    if (!isModalShown) {
      setShowModal(true);
      setShownModal(true);
    }
  };

  const handleSelected = (selected) => {
    console.log("here", selected);
    const camera = JSON.stringify({ name: selected.Name, url: selected.Value });
    changeCamera(index, camera as string);
    return selected;
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Support?</Text>
            <Text style={styles.modalText}>We all hate ads.</Text>
            <Text style={styles.modalText}>Thats why we're here.</Text>
            <Text style={styles.modalText}>If you like what you see.</Text>
            <Text style={styles.modalText}>Buy me a beer...</Text>
            <Button onPress={handleClose} title="No thanks." />

            <TouchableOpacity style={styles.closeButton} onPress={buyBeer}>
              <Text style={styles.closeButtonText}>🍺 Hell yeah! 🍺</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View>
          <Video
            ref={videoRef}
            source={{ uri: url }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            style={styles.video}
            onFullscreenUpdate={setOrientation}
            shouldPlay
          />
        </View>
        <View style={{ padding: 10, marginTop: 20 }}>
          {/* <Picker
            selectedValue={JSON.stringify({ url, name })}
            onValueChange={(itemValue) =>
              changeCamera(index, itemValue as string)
            }
          >
            {beachNames.map((beach, key) => (
              <Picker.Item
                color="white"
                key={key}
                value={JSON.stringify({ url: beach.url, name: beach.name })}
                label={beach.name}
              />
            ))}
            <Picker.Item
              key="suggest_new_camera"
              value="suggest_new_camera"
              label="* Suggest New Camera *"
            />
          </Picker> */}
          {/* <ModalSelector
            data={beachNames}
            keyExtractor={(item) => item.url}
            labelExtractor={(item) => item.name}
            initialValue={beachNames[0]?.name}
            onChange={(item) =>
              changeCamera(index, JSON.stringify(item) as string)
            }
            initValueTextStyle={{ color: "white" }}
          /> */}
          <PickerModal
            items={beachNames.map((beach) => ({
              Id: beach.url,
              Name: beach.name,
              Value: beach.url,
            }))}
            onSelected={handleSelected}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Feed")}>
          <LightText>How was it?</LightText>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  video: {
    width: "100%",
    height: Dimensions.get("window").height * 0.75,
  },
  fullscreenVideo: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
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

export default Player;
