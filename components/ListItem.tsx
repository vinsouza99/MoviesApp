import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type Item = {
  id: number;
  title?: string; // Movies have "title"
  name?: string; // TV shows have "name"
  release_date: string;
  popularity: number;
  overview: string;
  poster_path: string | null;
  type: string | null;
};

type ListItemProps = {
  item: Item;
};

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const router = useRouter();
  console.log(item);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.poster}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>Popularity: {item.popularity}</Text>
        <Text style={styles.subtitle}>Release date: {item.release_date}</Text>

        <Text numberOfLines={3} style={styles.overview}>
          {item.overview}
        </Text>
        <Button
          title="More Details"
          onPress={() =>
            router.push(`../details?id=${item.id}&type=${item.type}`)
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
  },
  imageContainer: {
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
    gap: 5,
  },
  poster: {
    height: 200,
    width: 140,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    flexShrink: 1,
  },
  overview: {
    fontSize: 14,
    color: "#555",
    flexShrink: 1,
    textAlign: "justify",
  },
  button: {
    textTransform: "capitalize", // Pushes button to the bottom
  },
});
