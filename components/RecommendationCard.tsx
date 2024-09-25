import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Media } from "../lib/types/media";
import ProgressCircle from "./ProgressCircle";

const RecommendationCard = ({ media, type }: { media: Media; type: "movie" | "show" }) => {
  const title =
    ("original_title" in media && media.original_title) ||
    ("original_name" in media && media.original_name) ||
    null;
  return (
    <Link
      asChild
      href={{
        pathname: `/home/${type}/[id]`,
        params: {
          id: `${media.id}`,
          title: title,
          type,
        },
      }}
    >
      <TouchableOpacity style={styles.movieCard}>
        <View
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            zIndex: 10,
            backgroundColor: "transparent",
          }}
        >
          <ProgressCircle progress={media.vote_average / 10} radius={14} strokeWidth={3} />
        </View>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w780${media.poster_path}` }}
          style={styles.poster}
          defaultSource={{ uri: "https://via.placeholder.com/150x225" }}
        />
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default RecommendationCard;

const { width } = Dimensions.get("window");
const movieCardWidth = width / 3.4 - 16; // 2 columns with 8px padding on each side

const styles = StyleSheet.create({
  movieCard: {
    width: movieCardWidth,
    marginBottom: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 8,
  },
  poster: {
    width: "100%",
    borderRadius: 16,
    height: movieCardWidth * 1.5, // 3:2 aspect ratio
    resizeMode: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});
