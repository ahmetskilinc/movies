import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import * as Sharing from "expo-sharing";
import { FlashList } from "@shopify/flash-list";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  MD3DarkTheme,
  Surface,
  Text,
} from "react-native-paper";
import MediaCard from "../../../components/MediaCard";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../../lib/api";

const moviePosters = Array(9).fill("https://via.placeholder.com/150x200");

export default function Me() {
  const { user } = useUser();

  // const {
  // 	data: moviesData,
  // 	error: moviesError,
  // 	isError: moviesIsError,
  // 	isSuccess: moviesIsSuccess,
  // 	isLoading: moviesIsLoading,
  // } = useQuery({
  // 	queryKey: ["popular_movies"],
  // 	queryFn: () => getPopularMovies(),
  // });

  return (
    <Surface style={styles.container}>
      <View style={styles.profileInfo}>
        <Avatar.Image source={{ uri: user?.imageUrl }} size={80} />
        <View style={styles.lists}>
          <View>
            <Text style={styles.count}>125</Text>
            <Text style={styles.listName}>watched</Text>
          </View>
          <View>
            <Text style={styles.count}>353</Text>
            <Text style={styles.listName}>wishlist</Text>
          </View>
          <View>
            <Text style={styles.count}>98</Text>
            <Text style={styles.listName}>friends</Text>
          </View>
        </View>
      </View>
      {/* <Text style={styles.username}>Username</Text> */}
      {/* <Text style={styles.bio}>
				Movie enthusiast | Always looking for new series recommendations
			</Text> */}
      <View style={styles.profileButtons}>
        <Link asChild href="/me/edit-account">
          <Button mode="contained" style={styles.button} icon="account-edit">
            Edit account
          </Button>
        </Link>
        <IconButton
          onPress={async () => {
            (await Sharing.isAvailableAsync()) ? Sharing.shareAsync("https://ahmetk.dev") : null;
          }}
          mode="contained"
          style={styles.iconButton}
          icon="share"
        />
      </View>

      {/* {moviesIsLoading ? (
				<ActivityIndicator />
			) : moviesIsSuccess ? (
				<FlashList
					data={moviesData.results}
					renderItem={({ item }) => (
						<MediaCard
							media={item}
							type={"original_title" in item && item.original_title ? "movie" : "show"}
						/>
					)}
					keyExtractor={(item) => item.id}
					numColumns={3}
					contentContainerStyle={{ paddingHorizontal: 6 }}
				/>
			) : moviesIsError ? (
				moviesIsError ? (
					<Text>Error: {moviesError.message}</Text>
				) : null
			) : null} */}
    </Surface>
  );
}

const { width } = Dimensions.get("window");
const movieCardWidth = width / 3;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  profileInfo: {
    backgroundColor: MD3DarkTheme.colors.surface,
    padding: 16,
    flexDirection: "row",
  },
  lists: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  count: {
    fontSize: 16,
    fontWeight: 800,
    textAlign: "center",
    marginBottom: 4,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  bio: {
    fontSize: 14,
    marginLeft: 16,
    marginTop: 5,
  },
  listName: {
    fontSize: 12,
    fontWeight: 600,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileButtons: {
    backgroundColor: MD3DarkTheme.colors.surface,
    padding: 16,
    gap: 10,
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
});
