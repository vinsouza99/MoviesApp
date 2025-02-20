import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { options } from "@/constants/Constants";
export default function DetailsScreen() {
  const { id, type } = useLocalSearchParams();

  const [details, setDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !type) return;

    const fetchDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/${type}/${id}`;
        const response = await fetch(url, options);

        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!details) {
    return (
      <View>
        <Text>No details available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{details.title || details.name}</Text>
      {details.poster_path && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
          }}
          style={styles.poster}
        />
      )}
      <Text style={styles.subheader}>Overview</Text>
      <Text style={styles.overview}>
        {details.overview || "No description available."}
      </Text>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 50,
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <Text style={styles.subheader}>Popularity</Text>
          <Text style={(styles.overview, { textAlign: "center" })}>
            {details.popularity}
          </Text>
        </View>
        <View>
          <Text style={styles.subheader}>Release Date</Text>
          <Text style={(styles.overview, { textAlign: "center" })}>
            {details.release_date || details.first_air_date || "N/A"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  overview: {
    fontSize: 16,
    color: "#555",
  },
  poster: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
    marginBottom: 16,
  },
  column: {
    textAlign: "center",
  },
});
