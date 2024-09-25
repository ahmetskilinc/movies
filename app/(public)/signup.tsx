import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Formik } from "formik";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Surface, TextInput, Text, Button } from "react-native-paper";
import { GoogleSocialButton } from "react-native-social-buttons";

export const useWarmUpBrowser = () => {
	React.useEffect(() => {
		void WebBrowser.warmUpAsync();
		return () => {
			void WebBrowser.coolDownAsync();
		};
	}, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
	useWarmUpBrowser();
	const { isLoaded, signUp, setActive } = useSignUp();
	const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

	const [pendingVerification, setPendingVerification] = useState(false);
	const [showPassword, setShowPassword] = useState<boolean>(true);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);

	const onSignUpPress = async ({
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
		username,
	}: {
		email: string;
		password: string;
		confirmPassword: string;
		firstName: string;
		lastName: string;
		username: string;
	}) => {
		if (!isLoaded) return;

		try {
			await signUp
				.create({
					emailAddress: email,
					password,
					firstName,
					lastName,
					username,
				})
				.catch((error) => console.log(JSON.stringify(error)));

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			setPendingVerification(true);
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

	const onPressVerify = async ({ code }: { code: string }) => {
		if (!isLoaded) return;

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			alert(err.errors[0].message);
		}
	};

	return (
		<Surface style={styles.container}>
			<Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
			{!pendingVerification && (
				<>
					<ScrollView
						style={styles.loginContainer}
						contentContainerStyle={{ justifyContent: "space-between" }}
					>
						<Text variant="headlineMedium" style={styles.title}>
							Create an account
						</Text>
						<KeyboardAvoidingView
							behavior={Platform.OS === "ios" ? "padding" : "height"}
							style={styles.container}
						>
							<View style={styles.inputContainer}>
								<Formik
									initialValues={{
										username: "",
										firstName: "",
										lastName: "",
										email: "",
										password: "",
										confirmPassword: "",
									}}
									onSubmit={onSignUpPress}
								>
									{({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
										<View>
											<TextInput
												style={{ marginBottom: 10 }}
												placeholder="Username"
												placeholderTextColor="#808b99"
												value={values.username}
												onChangeText={handleChange("username")}
												onBlur={handleBlur("username")}
												autoCapitalize="none"
												aria-disabled={!isSubmitting}
												mode="outlined"
											/>
											<TextInput
												style={{ marginBottom: 10 }}
												placeholder="First name"
												placeholderTextColor="#808b99"
												value={values.firstName}
												onChangeText={handleChange("firstName")}
												onBlur={handleBlur("firstName")}
												autoCapitalize="none"
												aria-disabled={!isSubmitting}
												mode="outlined"
											/>
											<TextInput
												style={{ marginBottom: 10 }}
												placeholder="Last name"
												placeholderTextColor="#808b99"
												value={values.lastName}
												onChangeText={handleChange("lastName")}
												onBlur={handleBlur("lastName")}
												autoCapitalize="none"
												aria-disabled={!isSubmitting}
												mode="outlined"
											/>
											<TextInput
												style={{ marginBottom: 10 }}
												placeholder="Email"
												placeholderTextColor="#808b99"
												value={values.email}
												onChangeText={handleChange("email")}
												onBlur={handleBlur("email")}
												keyboardType="email-address"
												autoCapitalize="none"
												aria-disabled={!isSubmitting}
												mode="outlined"
											/>
											<TextInput
												style={{ marginBottom: 10 }}
												placeholder="Password"
												placeholderTextColor="#808b99"
												onBlur={handleBlur("password")}
												value={values.password}
												onChangeText={handleChange("password")}
												right={
													<TextInput.Icon
														icon="eye"
														onPress={() => setShowPassword(!showPassword)}
													/>
												}
												secureTextEntry={showPassword}
												aria-disabled={!isSubmitting}
												mode="outlined"
											/>
											<TextInput
												style={{ marginBottom: 10 }}
												placeholder="Confirm password"
												placeholderTextColor="#808b99"
												value={values.confirmPassword}
												onBlur={handleBlur("confirmPassword")}
												onChangeText={handleChange("confirmPassword")}
												right={
													<TextInput.Icon
														icon="eye"
														onPress={() => setShowConfirmPassword(!showConfirmPassword)}
													/>
												}
												secureTextEntry={showConfirmPassword}
												aria-disabled={!isSubmitting}
												mode="outlined"
											/>
											<Button onPress={() => handleSubmit()} mode="contained">
												Sign Up
											</Button>
										</View>
									)}
								</Formik>
							</View>
						</KeyboardAvoidingView>
						<View style={styles.divider}>
							<View style={styles.dividerLine} />
							<Text style={styles.dividerText}>OR</Text>
							<View style={styles.dividerLine} />
						</View>
						<View style={styles.socialButtons}>
							{/* <AppleSocialButton onPress={() => {}} buttonViewStyle={styles.socialButton} /> */}
							<GoogleSocialButton
								onPress={onGoogleSignInPress}
								buttonViewStyle={styles.socialButton}
							/>
						</View>
					</ScrollView>
				</>
			)}
			{pendingVerification && (
				<>
					<ScrollView
						style={styles.loginContainer}
						contentContainerStyle={{ justifyContent: "space-between" }}
					>
						<Text variant="headlineMedium" style={styles.title}>
							Verify your email
						</Text>
						<Text variant="bodyMedium" style={styles.title}>
							We sent your a code to your email address.
						</Text>
						<KeyboardAvoidingView
							behavior={Platform.OS === "ios" ? "padding" : "height"}
							style={styles.container}
						>
							<View style={styles.inputContainer}>
								<Formik
									initialValues={{
										code: "",
									}}
									onSubmit={onPressVerify}
								>
									{({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
										<View>
											<TextInput
												style={{ marginBottom: 10 }}
												placeholder="Code"
												placeholderTextColor="#808b99"
												value={values.code}
												onChangeText={handleChange("code")}
												onBlur={handleBlur("code")}
												keyboardType="number-pad"
												aria-disabled={!isSubmitting}
												mode="outlined"
											/>
											<Button onPress={() => handleSubmit()} mode="contained">
												Verify
											</Button>
										</View>
									)}
								</Formik>
							</View>
						</KeyboardAvoidingView>
					</ScrollView>
				</>
			)}
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
		marginBottom: 38,
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
