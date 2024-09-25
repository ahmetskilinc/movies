import { Appbar, Searchbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types";
import { Dispatch } from "react";
import { View } from "react-native";

const SearchHeader = (
	props: NativeStackHeaderProps & {
		searchQuery: string;
		setSearchQuery: Dispatch<React.SetStateAction<string>>;
	}
) => {
	const { searchQuery, setSearchQuery, ...rest } = props;

	return (
		<Appbar.Header
			{...rest}
			style={{ backgroundColor: props.options.headerTransparent ? "transparent" : undefined }}
		>
			<View style={{ flex: 1, width: "100%", paddingHorizontal: 0 }}>
				<Searchbar placeholder="Search" onChangeText={setSearchQuery} value={searchQuery} />
			</View>
		</Appbar.Header>
	);
};

export default SearchHeader;
