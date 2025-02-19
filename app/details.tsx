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

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDYwOTY4YTIyNWU3ZDUwYmI5MzIyZTZmN2YxZTFiYyIsIm5iZiI6MTcxMTgxMzIyNC4zMDA5OTk5LCJzdWIiOiI2NjA4MzI2ODBkNDE3ZTAxN2MwNzA1OGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BYvN7iTZnSj4aSxvlZdoguRybnLWs0UzzdVMms1ujXk"; // Replace with your actual API key

export default function DetailsScreen() {
  const { id, type } = useLocalSearchParams();

  const [details, setDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("id: " + id);
    console.log("type: " + type);
    if (!id || !type) return;
    console.log("here");

    const fetchDetails = async () => {
      try {
        const url = `https://api.themoviedb.org/3/${type}/${id}`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        };

        const response = await fetch(url, options);

        const data = await response.json();
        console.log(data);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  if (!details) {
    return (
      <View>
        <Text>No details available</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      <Text style={styles.overview}>
        {details.overview || "No description available."}
      </Text>
      <Text style={styles.subtitle}>Popularity: {details.popularity}</Text>
      <Text style={styles.subtitle}>Release date: {details.release_date}</Text>
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
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    flexShrink: 1,
  },
  overview: {
    fontSize: 16,
    color: "#555",
  },
  poster: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 16,
  },
});
