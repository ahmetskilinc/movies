import { Link } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { Media } from "../lib/types/media";
import ProgressCircle from "./ProgressCircle";

const MediaCard = ({ media, type }: { media: Media; type: "movie" | "show" }) => {
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
					<ProgressCircle progress={media.vote_average / 10} radius={16} strokeWidth={4} />
				</View>
				<Image
					source={{ uri: `https://image.tmdb.org/t/p/w500${media.poster_path}` }}
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

export default MediaCard;

const { width } = Dimensions.get("window");
const movieCardWidth = width / 2 - 18; // 2 columns with 8px padding on each side

const styles = StyleSheet.create({
	movieCard: {
		width: movieCardWidth,
		marginBottom: 8,
		margin: 6,
	},
	poster: {
		width: "100%",
		borderRadius: 22,
		height: movieCardWidth * 1.5, // 3:2 aspect ratio
		resizeMode: "cover",
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
});
