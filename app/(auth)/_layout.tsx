import { useUser } from "@clerk/clerk-expo";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Avatar, BottomNavigation, Icon, MD3DarkTheme } from "react-native-paper";
import Header from "../../components/Header";
import { Animated, View } from "react-native";
import { useRef } from "react";

export default function Layout() {
	const { user } = useUser();

	const homePaddingAnimation = useRef(new Animated.Value(0)).current;
	const searchPaddingAnimation = useRef(new Animated.Value(0)).current;
	const twoPaddingAnimation = useRef(new Animated.Value(0)).current;
	const mePaddingAnimation = useRef(new Animated.Value(0)).current;

	const homePaddingExpand = () => {
		Animated.timing(homePaddingAnimation, {
			toValue: 16,
			duration: 5000,
			useNativeDriver: true,
		}).start();
	};

	const searchPaddingExpand = () => {
		Animated.timing(searchPaddingAnimation, {
			toValue: 16,
			duration: 5000,
			useNativeDriver: true,
		}).start();
	};

	const twoPaddingExpand = () => {
		Animated.timing(twoPaddingAnimation, {
			toValue: 16,
			duration: 5000,
			useNativeDriver: true,
		}).start();
	};

	const mePaddingExpand = () => {
		Animated.timing(mePaddingAnimation, {
			toValue: 16,
			duration: 5000,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Tabs
			screenOptions={{
				header: (props) => <Header {...props} />,
				tabBarStyle: {
					backgroundColor: MD3DarkTheme.colors.surface,
					height: 92,
				},
			}}
			// screenListeners={{
			// 	tabPress: (e) => {
			// 		const target = e.target?.split("-")[0];
			// 		if (target == "home") {
			// 			homePaddingExpand();
			// 		} else if (target == "search") {
			// 			searchPaddingExpand();
			// 		} else if (target == "two") {
			// 			twoPaddingExpand();
			// 		} else if (target == "me") {
			// 			mePaddingExpand();
			// 		}
			// 	},
			// }}
		>
			<Tabs.Screen
				name="home"
				options={{
					headerShown: false,
					tabBarLabelStyle: {
						color: MD3DarkTheme.colors.onSurface,
					},
					title: "Home",
					tabBarIcon: (props) => (
						<Animated.View
							style={{
								paddingVertical: 2,
								paddingLeft: homePaddingAnimation,
								paddingRight: homePaddingAnimation,
								borderRadius: 20,
								backgroundColor: props.focused ? MD3DarkTheme.colors.tertiaryContainer : undefined,
							}}
						>
							<Icon source="home" {...props} size={28} color={MD3DarkTheme.colors.onSurface} />
						</Animated.View>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					headerShown: false,
					tabBarLabelStyle: {
						color: MD3DarkTheme.colors.onSurface,
					},
					title: "Search",
					tabBarIcon: (props) => (
						<View
							style={{
								paddingVertical: 2,
								paddingHorizontal: searchPaddingAnimation,
								borderRadius: 20,
								backgroundColor: props.focused ? MD3DarkTheme.colors.tertiaryContainer : undefined,
							}}
						>
							<Icon source="magnify" {...props} size={28} color={MD3DarkTheme.colors.onSurface} />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="two"
				options={{
					tabBarLabelStyle: {
						color: MD3DarkTheme.colors.onSurface,
					},
					title: "Two",
					tabBarIcon: (props) => (
						<View
							style={{
								paddingVertical: 2,
								paddingHorizontal: twoPaddingAnimation,
								borderRadius: 20,
								backgroundColor: props.focused ? MD3DarkTheme.colors.tertiaryContainer : undefined,
							}}
						>
							<Icon source="movie" {...props} size={28} color={MD3DarkTheme.colors.onSurface} />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="me"
				options={{
					headerShown: false,
					tabBarLabelStyle: {
						color: MD3DarkTheme.colors.onSurface,
					},
					title: user?.username ? user?.username : "Me",
					tabBarIcon: (props) => (
						<View
							style={{
								paddingVertical: 2,
								paddingHorizontal: mePaddingAnimation,
								borderRadius: 20,
								backgroundColor: props.focused ? MD3DarkTheme.colors.tertiaryContainer : undefined,
							}}
						>
							<Avatar.Image source={{ uri: user?.imageUrl }} {...props} focusable={true} />
						</View>
					),
				}}
			/>
		</Tabs>
	);
}
