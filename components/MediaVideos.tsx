import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Media } from "../lib/types/media";
import { useQuery } from "@tanstack/react-query";
import WebView from "react-native-webview";
import { ActivityIndicator } from "react-native-paper";
import { getMovieVideos, getShowVideos } from "../lib/api";

const MediaVideos = ({}: { media: Media }) => {
  const { id, title, type } = useLocalSearchParams();

  const {
    data: movieVideos,
    error: movieVideosError,
    isError: movieVideosIsError,
    isSuccess: movieVideosIsSuccess,
    isLoading: movieVideosIsLoading,
  } = useQuery({
    queryKey: [`${id}_videos`],
    queryFn: () => (type === "movie" ? getMovieVideos(id as string) : getShowVideos(id as string)),
  });

  return movieVideosIsLoading ? (
    <ActivityIndicator style={{ top: 200 }} />
  ) : movieVideosIsSuccess ? (
    movieVideos.results
      .filter((item: { type: "Trailer" | string }) => item.type === "Trailer")
      .map((item: { key: string; id: string }) => (
        <View
          style={{
            paddingHorizontal: 8,
          }}
          key={item.id}
        >
          <WebView
            style={{
              flex: 1,
              height: 200,
              width: "100%",
              backgroundColor: "black",
              marginBottom: 10,
            }}
            javaScriptEnabled={true}
            source={{
              uri: `https://www.youtube.com/embed/${item.key}?rel=0&autoplay=0&showinfo=0&controls=0`,
            }}
          />
        </View>
      ))
  ) : movieVideosIsError ? (
    movieVideosIsError ? (
      <Text>Error: {movieVideosError.message}</Text>
    ) : null
  ) : null;
};

export default MediaVideos;
