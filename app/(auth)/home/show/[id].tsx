import type { HeaderButtonProps } from "@react-navigation/native-stack/src/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  FAB,
  IconButton,
  MD3DarkTheme,
  Surface,
  Text,
} from "react-native-paper";
import MediaHeader from "../../../../components/MediaHeader";
import MediaOverview from "../../../../components/MediaOverview";
import MediaVideos from "../../../../components/MediaVideos";
import RecommendationCard from "../../../../components/RecommendationCard";
import { getShow } from "../../../../lib/api";
import ShowEpisodes from "../../../../components/ShowEpisodes";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

const IMG_HEIGHT = 400;

const Show = () => {
  const navigation = useNavigation();
  const { id, title } = useLocalSearchParams();
  const [starred, setStarred] = useState<boolean>(false);

  const {
    data: movieData,
    error: movieDataError,
    isError: movieDataIsError,
    isSuccess: movieDataIsSuccess,
    isLoading: movieDataIsLoading,
  } = useQuery({
    queryKey: [id],
    queryFn: () => getShow(id as string),
  });

  useEffect(() => {
    navigation.setOptions({
      title: movieDataIsSuccess ? movieData.original_name : "",
      headerRight: (props: HeaderButtonProps) => (
        <IconButton
          onPress={() => setStarred(!starred)}
          icon={starred ? "star" : "star-outline"}
          {...props}
          size={28}
          iconColor={starred ? "yellow" : "white"}
        />
      ),
    });
  }, [starred, movieData, movieDataIsSuccess, navigation]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const logoAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [IMG_HEIGHT, 0, -IMG_HEIGHT / 2]
          ),
        },
      ],
    };
  });

  return (
    <Surface style={{ backgroundColor: MD3DarkTheme.colors.surface }}>
      {movieDataIsLoading ? (
        <View style={{ height: "100%" }}>
          <ActivityIndicator style={{ padding: 24 }} size={32} />
        </View>
      ) : movieDataIsSuccess ? (
        <>
          <Animated.ScrollView style={styles.container} ref={scrollRef} scrollEventThrottle={16}>
            <MediaHeader
              media={movieData}
              animatedStyle={imageAnimatedStyles}
              animatedLogoStyle={logoAnimatedStyles}
            />
            <View style={{ backgroundColor: MD3DarkTheme.colors.surface, paddingTop: 16 }}>
              <MediaOverview media={movieData} />
              <ShowEpisodes />
              <MediaVideos media={movieData} />
              <View>
                <Text style={styles.text}>Recommendations</Text>
                <ScrollView horizontal={true}>
                  {movieData.recommendations.results.map((recommendation: any) => {
                    return (
                      <RecommendationCard
                        key={recommendation.id}
                        media={recommendation}
                        type={recommendation.original_title ? "movie" : "show"}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </Animated.ScrollView>
          <FAB
            icon={"plus"}
            onPress={() => console.log("Pressed")}
            visible
            style={styles.fabStyle}
          />
        </>
      ) : movieDataIsError ? (
        movieDataIsError ? (
          <Text>Error: {movieDataError.message}</Text>
        ) : null
      ) : null}
    </Surface>
  );
};

export default Show;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
