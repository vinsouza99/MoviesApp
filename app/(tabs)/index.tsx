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

export default function MoviesScreen() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
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
        setMovies(data.results);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <FlatList
      data={movies}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={{ height: 200, width: 140 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
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
