import { useAuth, useUser } from "@clerk/clerk-expo";
import { Formik } from "formik";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { View } from "react-native";
import { Surface, Button, ActivityIndicator, TextInput } from "react-native-paper";

export default function Login() {
	const [saving, setSaving] = useState<boolean>(false);
	const { user } = useUser();
	const { signOut } = useAuth();

	const saveChanges = async ({
		email,
		firstName,
		lastName,
		username,
	}: {
		email: string;
		firstName: string;
		lastName: string;
		username: string;
	}) => {
		setSaving(true);
		await user?.update({ firstName, lastName, username }).then(() => {
			setSaving(false);
		});
	};

	return (
		<Surface style={{ flex: 1, height: "100%" }}>
			{!user ? (
				<ActivityIndicator />
			) : (
				<ScrollView
					style={styles.container}
					contentContainerStyle={{ justifyContent: "space-between" }}
				>
					<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
						<Formik
							initialValues={{
								email: user?.emailAddresses[0].emailAddress,
								firstName: user?.firstName || "",
								lastName: user?.lastName || "",
								username: user?.username || "",
							}}
							onSubmit={saveChanges}
						>
							{({ handleChange, handleBlur, handleSubmit, values, isSubmitting, dirty }) => (
								<View>
									<TextInput
										style={styles.input}
										onChangeText={handleChange("username")}
										value={values.username}
										onBlur={handleBlur("username")}
										placeholder="Username"
										placeholderTextColor="#808b99"
										aria-disabled={!isSubmitting}
										mode="outlined"
									/>
									<TextInput
										style={styles.input}
										onChangeText={handleChange("firstName")}
										value={values.firstName}
										onBlur={handleBlur("firstName")}
										placeholder="First name"
										placeholderTextColor="#808b99"
										aria-disabled={!isSubmitting}
										mode="outlined"
									/>
									<TextInput
										style={styles.input}
										onChangeText={handleChange("lastName")}
										value={values.lastName}
										onBlur={handleBlur("lastName")}
										placeholder="Last name"
										placeholderTextColor="#808b99"
										aria-disabled={!isSubmitting}
										mode="outlined"
									/>
									<TextInput
										style={styles.input}
										onChangeText={handleChange("email")}
										value={values.email}
										onBlur={handleBlur("email")}
										placeholder="Email"
										placeholderTextColor="#808b99"
										keyboardType="email-address"
										autoCapitalize="none"
										aria-disabled={!isSubmitting}
										mode="outlined"
									/>

									<Button
										onPress={() => handleSubmit()}
										mode="contained"
										loading={isSubmitting}
										disabled={!dirty || isSubmitting}
									>
										Save changes
									</Button>
								</View>
							)}
						</Formik>
					</KeyboardAvoidingView>
				</ScrollView>
			)}
		</Surface>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		marginBottom: 48,
		textAlign: "center",
	},
	input: {
		// backgroundColor: "#EDF2F7",
		// borderRadius: 8,
		// padding: 16,
		marginBottom: 12,
		// fontSize: 16,
		// color: "#2D3748",
	},
});
