import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Surface, Text } from "react-native-paper";
import SearchHeader from "../../../components/SearchHeader";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types";

export default function Search() {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		navigation.setOptions({
			header: (props: NativeStackHeaderProps) => (
				<SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} {...props} />
			),
		});
	}, [navigation]);

	return (
		<Surface style={styles.container}>
			<Text>Hello World</Text>
		</Surface>
	);
}

const styles = StyleSheet.create({
	container: {
		height: "100%",
	},
});
