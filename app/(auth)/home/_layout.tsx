import { Stack } from "expo-router";
import Header from "../../../components/Header";

export const unstable_settings = {
	initialRouteName: "home",
};

export default function Layout() {
	return (
		<Stack
			screenOptions={{
				header: (props) => <Header {...props} />,
			}}
		>
			<Stack.Screen name="index" options={{ title: "Home" }} />
			<Stack.Screen name="movie/[id]" />
			<Stack.Screen name="show/[id]" />
			{/* <Stack.Screen name="show/[id]" /> */}
		</Stack>
	);
}
