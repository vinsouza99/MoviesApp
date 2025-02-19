import { useEffect, useState } from "react";
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
import { Picker } from "@react-native-picker/picker";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDYwOTY4YTIyNWU3ZDUwYmI5MzIyZTZmN2YxZTFiYyIsIm5iZiI6MTcxMTgxMzIyNC4zMDA5OTk5LCJzdWIiOiI2NjA4MzI2ODBkNDE3ZTAxN2MwNzA1OGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BYvN7iTZnSj4aSxvlZdoguRybnLWs0UzzdVMms1ujXk";
const AIRING_TODAY_URL =
  "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";
const ON_THE_AIR_URL =
  "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1";

const POPULAR_URL =
  "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
const TOP_RATED_URL =
  "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
// Define a type for TV shows
type TVShow = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
};

export default function TVShowsScreen() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedList, setSelectedList] = useState("1");
  const [url, setUrl] = useState(AIRING_TODAY_URL);
  const router = useRouter();

  useEffect(() => {
    switch (selectedList) {
      case "1":
        setUrl(AIRING_TODAY_URL);
        break;
      case "2":
        setUrl(ON_THE_AIR_URL);
        break;
      case "3":
        setUrl(POPULAR_URL);
        break;
      case "4":
        setUrl(TOP_RATED_URL);
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
        data.results.map((result: any) => (result.type = "tv"));
        setTvShows(data.results);
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
          <Picker.Item label="Airing today" value="1" />
          <Picker.Item label="On the air" value="2" />
          <Picker.Item label="Popular" value="3" />
          <Picker.Item label="Top rated" value="4" />
        </Picker>
      </View>
      <FlatList
        data={tvShows}
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
