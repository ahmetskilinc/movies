import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, Text, Surface } from "react-native-paper";

export default function Auth() {
	return (
		<Surface style={styles.background}>
			<View style={styles.container}>
				<View style={styles.content}>
					<Text style={styles.title} variant="headlineLarge">
						Welcome
					</Text>
					<Text style={styles.subtitle} variant="bodyLarge">
						Sign in or create an account
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					<Link style={{ marginBottom: 10 }} href="/login" asChild>
						<Button mode="contained">Login</Button>
					</Link>
					<Link href="/signup" asChild>
						<Button mode="outlined">Sign up</Button>
					</Link>
				</View>
			</View>
		</Surface>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		height: "100%",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "space-between",
	},
	content: {
		alignItems: "center",
		marginTop: 100,
	},
	title: {
		marginBottom: 10,
	},
	subtitle: {
		textAlign: "center",
	},
	buttonContainer: {
		marginBottom: 60,
	},
	button: {
		paddingVertical: 15,
		borderRadius: 25,
		alignItems: "center",
		marginBottom: 15,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
	signupButton: {
		backgroundColor: "transparent",
	},
	signupButtonText: {},
});
