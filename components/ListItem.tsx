import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import NotFoundImage from "../assets/images/image-not-found.png";

type Item = {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  popularity: number;
  overview: string;
  poster_path: string | null;
  type: string | null;
  media_type: string | null;
};

type ListItemProps = {
  item: Item;
};

export const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            item.poster_path
              ? { uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }
              : NotFoundImage
          }
          style={styles.poster}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text style={styles.subtitle}>Popularity: {item.popularity}</Text>
        <Text style={styles.subtitle}>
          Release date: {item.release_date || item.first_air_date || "N/A"}
        </Text>

        <Pressable
          style={[styles.buttonContainer]}
          onPress={() =>
            router.push(
              `../details?id=${item.id}&type=${item.media_type || item.type}`
            )
          }
        >
          <Text style={styles.buttonText}>More Details</Text>
        </Pressable>
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
    gap: 5,
  },
  poster: {
    height: 200,
    width: 140,
    objectFit: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    flexGrow: 1,
  },
  overview: {
    fontSize: 14,
    color: "#555",
    flexShrink: 1,
    textAlign: "justify",
  },
  buttonContainer: {
    flex: 1,
    marginTop: 15,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    backgroundColor: Colors.light.buttonBackground,
    alignSelf: "flex-end",
    flexGrow: 0,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
