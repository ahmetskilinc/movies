import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import Header from "../../components/Header";

type Props = {};

const Auth = (props: Props) => {
	return (
		<Stack
			screenOptions={{
				header: (props) => <Header {...props} />,
			}}
		>
			<Stack.Screen name="auth-home" options={{ headerShown: false }} />
			<Stack.Screen
				name="login"
				options={{
					headerShown: true,
					headerTransparent: true,
					title: "",
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name="signup"
				options={{
					headerShown: true,
					headerTransparent: true,
					title: "",
					headerBackTitleVisible: false,
				}}
			/>
		</Stack>
	);
};

export default Auth;
