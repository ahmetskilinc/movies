import {
  GestureResponderEvent,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import ViewMoreText from "react-native-view-more-text";
import { Text } from "react-native-paper";
import { Media } from "../lib/types/media";

type Props = {};

const MediaOverview = ({ media }: { media: Media }) => {
  const renderViewMore = (onPress: ((event: GestureResponderEvent) => void) | undefined) => (
    <Text
      onPress={onPress}
      style={{ color: "white", textDecorationLine: "underline", fontSize: 16 }}
    >
      View more
    </Text>
  );
  const renderViewLess = (onPress: ((event: GestureResponderEvent) => void) | undefined) => (
    <Text
      onPress={onPress}
      style={{ color: "white", textDecorationLine: "underline", fontSize: 16 }}
    >
      View less
    </Text>
  );

  return (
    <View style={{ padding: 8 }}>
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
      >
        <Text style={styles.overview}>{media.overview}</Text>
      </ViewMoreText>
    </View>
  );
};

export default MediaOverview;

const styles = StyleSheet.create({
  overview: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "justify",
  },
});
