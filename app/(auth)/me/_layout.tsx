import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import Header from "../../../components/Header";
import { IconButton, Button, Divider, Menu } from "react-native-paper";
import { useState } from "react";

export const unstable_settings = {
	initialRouteName: "index",
};

export default function Layout() {
	const { user } = useUser();
	const { signOut } = useAuth();

	const [visible, setVisible] = useState(false);

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

	return (
		<Stack screenOptions={{ header: (props) => <Header {...props} /> }}>
			<Stack.Screen
				name="index"
				options={{
					title: user?.username ? user?.username : "Me",
					headerRight: (props) => (
						<IconButton
							icon="logout"
							onPress={() => signOut()}
							{...props}
							iconColor={props.tintColor}
						/>
						// <Menu
						// 	visible={visible}
						// 	onDismiss={closeMenu}
						// 	anchor={
						// 		<IconButton
						// 			icon="logout"
						// 			onPress={openMenu}
						// 			{...props}
						// 			iconColor={props.tintColor}
						// 		/>
						// 	}
						// >
						// 	<Menu.Item onPress={() => {}} title="Item 1" />
						// 	<Menu.Item onPress={() => {}} title="Item 2" />
						// 	<Divider />
						// 	<Menu.Item onPress={() => {}} title="Item 3" />
						// </Menu>
					),
				}}
			/>
			<Stack.Screen name="edit-account" options={{ title: "Edit account" }} />
		</Stack>
	);
}
