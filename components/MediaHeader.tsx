import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, MD3DarkTheme } from "react-native-paper";
import Animated from "react-native-reanimated";
import { getMovieImages, getShowImages } from "../lib/api";
import { Media } from "../lib/types/media";
import ProgressCircle from "./ProgressCircle";

const IMG_HEIGHT = 400;

const MediaHeader = ({
  media,
  animatedStyle,
  animatedLogoStyle,
}: {
  media: Media;
  animatedStyle?: {};
  animatedLogoStyle?: {};
}) => {
  const { id, title, type } = useLocalSearchParams();

  const {
    data: movieImages,
    error: movieImagesError,
    isError: movieImagesIsError,
    isSuccess: movieImagesIsSuccess,
    isLoading: movieImagesIsLoading,
  } = useQuery({
    queryKey: [`${id}_${type}_images`],
    queryFn: () => (type === "movie" ? getMovieImages(id as string) : getShowImages(id as string)),
  });

  return (
    <Animated.View style={[{ position: "relative" }, animatedStyle]}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w1280${media.backdrop_path}` }}
        style={[styles.poster]}
        defaultSource={{ uri: "https://via.placeholder.com/150x225" }}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[
          MD3DarkTheme.colors.surface,
          "transparent",
          "transparent",
          MD3DarkTheme.colors.surface,
        ]}
        locations={[0, 0.3, 0.5, 1]}
        style={styles.linearGradient}
      />
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: 8,
          backgroundColor: "transparent",
        }}
      >
        <ProgressCircle progress={media.vote_average / 10} radius={24} strokeWidth={4} />
      </View>
      {movieImagesIsLoading ? (
        <ActivityIndicator style={{ top: 200 }} />
      ) : movieImagesIsSuccess && movieImages.logos[0] ? (
        <Animated.Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieImages.logos[0].file_path}`,
          }}
          style={[
            styles.logo,
            { aspectRatio: movieImages.logos[0].aspect_ratio },
            animatedLogoStyle,
          ]}
          defaultSource={{ uri: "https://via.placeholder.com/150x225" }}
          resizeMode="cover"
        />
      ) : movieImagesIsError ? (
        movieImagesIsError ? (
          <Text>Error: {movieImagesError.message}</Text>
        ) : null
      ) : null}
    </Animated.View>
  );
};

export default MediaHeader;

const styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    height: IMG_HEIGHT,
    position: "absolute",
  },
  poster: {
    width: "100%",
    height: IMG_HEIGHT,
  },
  logo: {
    bottom: 24,
    position: "absolute",
    width: "60%",
    alignSelf: "center",
  },
});
