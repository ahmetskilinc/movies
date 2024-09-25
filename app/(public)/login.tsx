import React, { useState } from "react";
import * as Linking from "expo-linking";
import { KeyboardAvoidingView, StyleSheet, Platform, ScrollView } from "react-native";
import { TextInput, Button, Surface, Text } from "react-native-paper";
import { AppleSocialButton, GoogleSocialButton } from "react-native-social-buttons";
import { View } from "react-native";
import { useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Formik } from "formik";

export default function Login() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	const onSignInPress = async ({ email, password }: { email: string; password: string }) => {
		if (!isLoaded) {
			return;
		}
		try {
			const completeSignIn = await signIn.create({
				identifier: email,
				password,
			});

			await setActive({ session: completeSignIn.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	const onGoogleSignInPress = React.useCallback(async () => {
		try {
			const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
				redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
			});

			if (createdSessionId) {
				setActive!({ session: createdSessionId });
			} else {
				// Use signIn or signUp for next steps such as MFA
			}
		} catch (err) {
			console.error("OAuth error", err);
		}
	}, []);

	return (
		<Surface style={styles.container}>
			<ScrollView
				style={styles.loginContainer}
				contentContainerStyle={{ justifyContent: "space-between" }}
			>
				<Text style={styles.title} variant="headlineLarge">
					Welcome back
				</Text>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={styles.container}
				>
					<View style={styles.inputContainer}>
						<Formik initialValues={{ email: "", password: "" }} onSubmit={onSignInPress}>
							{({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
								<View>
									<TextInput
										style={{ marginBottom: 10 }}
										onChangeText={handleChange("email")}
										value={values.email}
										onBlur={handleBlur("email")}
										placeholder="Email"
										keyboardType="email-address"
										autoCapitalize="none"
										aria-disabled={!isSubmitting}
										mode="outlined"
									/>
									<TextInput
										style={{ marginBottom: 16 }}
										onChangeText={handleChange("password")}
										value={values.password}
										onBlur={handleBlur("password")}
										placeholder="Password"
										secureTextEntry
										aria-disabled={!isSubmitting}
										mode="outlined"
									/>
									<Button onPress={() => handleSubmit()} mode="contained">
										Login
									</Button>
								</View>
							)}
						</Formik>
					</View>
				</KeyboardAvoidingView>
				<Button onPress={() => null} mode="outlined">
					Forgot password
				</Button>
				<View style={styles.divider}>
					<View style={styles.dividerLine} />
					<Text style={styles.dividerText}>OR</Text>
					<View style={styles.dividerLine} />
				</View>
				<View style={styles.socialButtons}>
					{/* <AppleSocialButton onPress={() => {}} buttonViewStyle={styles.socialButton} /> */}
					<GoogleSocialButton onPress={onGoogleSignInPress} buttonViewStyle={styles.socialButton} />
				</View>
			</ScrollView>
		</Surface>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	loginContainer: {
		padding: 20,
		height: "100%",
		paddingTop: 120,
	},
	title: {
		marginBottom: 48,
		textAlign: "center",
	},
	inputContainer: {
		marginBottom: 16,
	},
	input: {
		backgroundColor: "#EDF2F7",
		borderRadius: 8,
		padding: 16,
		marginBottom: 12,
		fontSize: 16,
		color: "#2D3748",
	},
	divider: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 24,
	},
	dividerLine: {
		flex: 1,
		height: 1,
		backgroundColor: "#2a3847",
	},
	dividerText: {
		marginHorizontal: 16,
		fontSize: 14,
	},
	socialButtons: {
		alignItems: "center",
		gap: 6,
	},
	socialButton: {
		width: "100%",
	},
});
