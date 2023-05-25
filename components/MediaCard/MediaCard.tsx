import { useMutation } from "@apollo/client";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Avatar } from "@rneui/themed";
import { formatDistance } from "date-fns";
import React from "react";
import { Share, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { GET_ALL_POSTS } from "../../pages/Feed/data/getAllPosts";
import { CREATE_LIKE } from "./CREATE_LIKE";
import { DELETE_LIKE } from "./DELETE_LIKE";
import {
  Card,
  FooterButton,
  FooterContainer,
  HeaderContent,
  Likes,
  Media,
  MediaContainer,
  TimeAgo,
  User,
  UserName,
} from "./MediaCardStyles";
// import Animated, {
//   Easing,
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from "react-native-reanimated";

export default function MediaCard({ data }) {
  const [createLike] = useMutation(CREATE_LIKE, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });
  const [deleteLike, { error: deleteError, data: deleteData, loading }] =
    useMutation(DELETE_LIKE, {
      refetchQueries: [{ query: GET_ALL_POSTS }],
    });
  console.log(deleteError);
  console.log(deleteData);
  console.log(loading);
  const onShare = async () => {
    try {
      await Share.share({
        message: `https://howisthe.surf/feedback/${data.public_id}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(async () => {
      const like = doesUserLike();
      if (like) {
        console.log("like", like);
        deleteLike({ variables: { id: Number(like.id) } });
      } else {
        await createLike({
          variables: { userId: data.author.id, postId: data.id },
        });
      }
      console.log("Double tapz!");
    });

  const doesUserLike = () =>
    data.likes.find((like) => like.userId === data.author.id);

  return (
    <Card>
      <HeaderContent>
        <User>
          <Avatar
            containerStyle={{ backgroundColor: "#2979FF" }}
            title={`${data.author.first_name[0].toUpperCase()}${data.author.last_name[0].toUpperCase()}`}
            source={{
              uri: data.author.picture,
            }}
            rounded
            size="medium"
          />
          <UserName>
            {`${data.author.first_name} ${data.author.last_name}`}
          </UserName>
        </User>
      </HeaderContent>
      <MediaContainer>
        <GestureDetector gesture={Gesture.Exclusive(doubleTap)}>
          <Media source={{ uri: data.photoURL }} resizeMode="cover" />
        </GestureDetector>
      </MediaContainer>
      <FooterContainer>
        <View style={{ flexDirection: "row" }}>
          <FooterButton>
            {doesUserLike() ? (
              <Ionicons name="heart" color="white" size={30} />
            ) : (
              <Ionicons name="heart-outline" color="white" size={30} />
            )}
          </FooterButton>
          <FooterButton>
            <Feather name="send" color="white" size={30} />
          </FooterButton>
        </View>
        {data.likes.length > 0 && (
          <Likes>
            <Text style={{ color: "white" }}>{data.likes.length} likes</Text>
          </Likes>
        )}
        <TimeAgo>
          {data.createdAt && (
            <Text style={{ color: "#777" }}>
              {formatDistance(new Date(data.createdAt), new Date())} ago
            </Text>
          )}
          {data.tags.map((tag, key) => (
            <Text key={key}>{tag}</Text>
          ))}
        </TimeAgo>
      </FooterContainer>
    </Card>
  );
}
