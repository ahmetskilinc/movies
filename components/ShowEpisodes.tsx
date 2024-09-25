import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getShowEpisodes } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

const ShowEpisodes = ({}: {}) => {
  const { id, title, type } = useLocalSearchParams();

  const {
    data: showEpisodesData,
    error: showEpisodesDataError,
    isError: showEpisodesDataIsError,
    isSuccess: showEpisodesDataIsSuccess,
    isLoading: showEpisodesDataIsLoading,
  } = useQuery({
    queryKey: [`${id}_${type}_episodes`],
    queryFn: () => getShowEpisodes(id as string),
  });

  if (showEpisodesDataIsSuccess) {
    console.log("EPISODES:", JSON.stringify(showEpisodesData, null, 4));
  }

  return (
    <View>
      <Text>ShowEpisodes</Text>
    </View>
  );
};

export default ShowEpisodes;

const styles = StyleSheet.create({});
