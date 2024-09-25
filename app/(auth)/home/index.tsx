import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Chip, Surface, Text } from "react-native-paper";
import MediaCard from "../../../components/MediaCard";
import { getMovieGenres, getPopularMovies, getPopularShows } from "../../../lib/api";
import { Media } from "../../../lib/types/media";
import { FlashList } from "@shopify/flash-list";

export default function Home() {
  const [genreId, setGenreId] = useState<number | null>(null);
  const [data, setData] = useState<Media[] | null>(null);

  const {
    data: showsData,
    error: showsError,
    isError: showsIsError,
    isSuccess: showsIsSuccess,
    isLoading: showsIsLoading,
  } = useQuery({
    queryKey: ["popular_shows"],
    queryFn: () => getPopularShows(),
  });

  const {
    data: moviesData,
    error: moviesError,
    isError: moviesIsError,
    isSuccess: moviesIsSuccess,
    isLoading: moviesIsLoading,
  } = useQuery({
    queryKey: ["popular_movies"],
    queryFn: () => getPopularMovies(),
  });

  const {
    data: movieGenresData,
    error: movieGenresError,
    isError: movieGenresIsError,
    isSuccess: movieGenresIsSuccess,
    isLoading: movieGenresIsLoading,
  } = useQuery({
    queryKey: ["movie_genres"],
    queryFn: () => getMovieGenres(),
  });

  useEffect(() => {
    if (moviesData && moviesIsSuccess && showsData && showsIsSuccess && genreId) {
      setData(
        [...moviesData.results, ...showsData.results].filter((item) =>
          item.genre_ids.includes(genreId)
        )
      );
    } else if (moviesData && moviesIsSuccess && showsData && showsIsSuccess && genreId === null) {
      setData(null);
    }
  }, [genreId]);

  return (
    <Surface style={styles.container}>
      <View>
        {moviesIsLoading || showsIsLoading ? (
          <ActivityIndicator />
        ) : moviesIsSuccess && showsIsSuccess ? (
          <>
            <Text style={styles.text}>Popular Movies and TV Shows</Text>
            {movieGenresIsLoading ? (
              <ActivityIndicator />
            ) : movieGenresIsSuccess ? (
              <ScrollView
                horizontal={true}
                style={styles.pillsContainer}
                contentContainerStyle={{
                  gap: 10,
                }}
                showsHorizontalScrollIndicator={false}
              >
                <Chip
                  onPress={() => setGenreId(null)}
                  showSelectedCheck={true}
                  showSelectedOverlay={true}
                  selected={!genreId}
                >
                  All
                </Chip>
                {movieGenresData.genres.map((genre: any) => (
                  <Chip
                    key={genre.id}
                    onPress={() => setGenreId(genre.id)}
                    showSelectedCheck={true}
                    showSelectedOverlay={true}
                    selected={genre.id === genreId}
                    elevated={genre.id === genreId}
                  >
                    {genre.name}
                  </Chip>
                ))}
              </ScrollView>
            ) : movieGenresIsError ? (
              <Text>Error: {movieGenresError.message}</Text>
            ) : null}
            <FlatList
              data={data ? data : [...moviesData.results, ...showsData.results]}
              // data={showsData.results}
              renderItem={({ item }) => (
                <MediaCard
                  media={item}
                  type={"original_title" in item && item.original_title ? "movie" : "show"}
                />
              )}
              keyExtractor={(item) => item.id}
              numColumns={2}
              style={{ marginBottom: 157 }}
              contentContainerStyle={{ paddingHorizontal: 6 }}
            />
          </>
        ) : moviesIsError || showsIsError ? (
          moviesIsError ? (
            <Text>Error: {moviesError.message}</Text>
          ) : showsIsError ? (
            <Text>Error: {showsError.message}</Text>
          ) : null
        ) : null}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  pillsContainer: {
    flexDirection: "row",
    display: "flex",
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
});
