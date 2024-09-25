import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Animated, Image, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEADER_HEIGHT = 240;

const AnimatedHeader = ({
	animatedValue,
	backdrop,
}: {
	animatedValue: Animated.Value;
	backdrop: string;
}) => {
	const insets = useSafeAreaInsets();

	const headerHeight = animatedValue.interpolate({
		inputRange: [0, HEADER_HEIGHT + insets.top],
		outputRange: [HEADER_HEIGHT + insets.top, insets.top + 40],
		extrapolate: "clamp",
	});

	return (
		<Animated.View
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				zIndex: 10,
				height: headerHeight,
			}}
		>
			<Image
				source={{ uri: `https://image.tmdb.org/t/p/w780${backdrop}` }}
				style={styles.poster}
				defaultSource={{ uri: "https://via.placeholder.com/150x225" }}
				resizeMode="cover"
			/>
			<LinearGradient
				colors={["#000000", "transparent", "transparent", "#000000"]}
				locations={[0, 0.2, 0.5, 1]}
				style={styles.linearGradient}
			/>
		</Animated.View>
	);
};

export default AnimatedHeader;

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
	poster: {
		width: "100%",
		height: "100%",
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
	linearGradient: {
		width: "100%",
		height: "100%",
		position: "absolute",
	},
});
