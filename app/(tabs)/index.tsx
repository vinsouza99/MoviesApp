import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { ListItem } from "@/components/ListItem";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDYwOTY4YTIyNWU3ZDUwYmI5MzIyZTZmN2YxZTFiYyIsIm5iZiI6MTcxMTgxMzIyNC4zMDA5OTk5LCJzdWIiOiI2NjA4MzI2ODBkNDE3ZTAxN2MwNzA1OGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BYvN7iTZnSj4aSxvlZdoguRybnLWs0UzzdVMms1ujXk";
const NOW_PLAYING_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const POPULAR_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const TOP_RATED_URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const UPCOMING_URL =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
export default function MoviesScreen() {
  const router = useRouter();
  const [selectedList, setSelectedList] = useState("1");
  const [url, setUrl] = useState(NOW_PLAYING_URL);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    switch (selectedList) {
      case "1":
        setUrl(NOW_PLAYING_URL);
        break;
      case "2":
        setUrl(POPULAR_URL);
        break;
      case "3":
        setUrl(TOP_RATED_URL);
        break;
      case "4":
        setUrl(UPCOMING_URL);
        break;
    }
  }, [selectedList]);

  useEffect(() => {
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
        data.results.map((result: any) => (result.type = "movie"));
        setMovies(data.results);
        setLoading(false);
      });
  }, [url]);
  if (loading) return <ActivityIndicator size="large" />;

  return (
    <>
      <View style={styles.container}>
        <Picker
          selectedValue={selectedList}
          onValueChange={(itemValue, itemIndex) => setSelectedList(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Now Playing" value="1" />
          <Picker.Item label="Popular" value="2" />
          <Picker.Item label="Top rated" value="3" />
          <Picker.Item label="Upcoming" value="4" />
        </Picker>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    alignItems: "flex-start",
  },
  picker: {
    width: "100%",
    padding: 5,
  },
});
