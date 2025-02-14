import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDYwOTY4YTIyNWU3ZDUwYmI5MzIyZTZmN2YxZTFiYyIsIm5iZiI6MTcxMTgxMzIyNC4zMDA5OTk5LCJzdWIiOiI2NjA4MzI2ODBkNDE3ZTAxN2MwNzA1OGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BYvN7iTZnSj4aSxvlZdoguRybnLWs0UzzdVMms1ujXk";

// Define a type for TV shows
type TVShow = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
};

export default function TVShowsScreen() {
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setTvShows(data.results);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={tvShows}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={{ height: 200, width: 140 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
          <Text numberOfLines={3}>{item.overview}</Text>
          <Button
            title="View Details"
            onPress={() => router.push(`../details?id=${item.id}&type=tv`)}
          />
        </View>
      )}
    />
  );
}
