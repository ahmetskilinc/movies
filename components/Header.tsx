import * as React from "react";
import { Appbar } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/src/types";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/src/types";

const Header = (props: NativeStackHeaderProps | BottomTabHeaderProps) => {
	const Left = props.options.headerLeft || (() => null);
	const Right = props.options.headerRight || (() => null);

	return (
		<Appbar.Header
			{...props}
			style={{ backgroundColor: props.options.headerTransparent ? "transparent" : undefined }}
		>
			<Left canGoBack={props.navigation.canGoBack()} />
			{props.navigation.canGoBack() ? (
				<Appbar.BackAction onPress={() => props.navigation.goBack()} />
			) : null}
			<Appbar.Content title={props.options.title} />
			<Right canGoBack={props.navigation.canGoBack()} />
		</Appbar.Header>
	);
};

export default Header;
