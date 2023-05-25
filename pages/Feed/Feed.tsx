import React from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MediaCard from "../../components/MediaCard/MediaCard";

import { LightText } from "../AddPost/styles";
import { GET_ALL_POSTS } from "./data/getAllPosts";
import { useQuery, gql } from "@apollo/client";

const styles = StyleSheet.create({
  feedbackContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  mediaList: {
    flexGrow: 1,
  },
});

const Feed = () => {
  // const { data: media, isLoading: isFetchingMedia } = useAllMedia();
  // const { data: media, isLoading: isFetchingMedia } = useGetAllPostsQuery();
  const { data, loading: isFetchingMedia, error } = useQuery(GET_ALL_POSTS);

  console.log("error!", error);
  console.log("isFetchingMedia", isFetchingMedia);
  console.log("media", data);
  return (
    <SafeAreaView style={styles.feedbackContainer}>
      {isFetchingMedia ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.mediaList}>
          {data?.getAllPosts?.reverse()?.map((data) => (
            <MediaCard key={data.id} data={data} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Feed;
