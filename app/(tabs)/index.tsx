import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
  Text,
} from "react-native";
import { ListItem } from "@/components/ListItem";
import { options } from "@/constants/Constants";

const NOW_PLAYING_URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const POPULAR_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const TOP_RATED_URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const UPCOMING_URL =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

export default function MoviesScreen() {
  const [selectedList, setSelectedList] = useState("1");
  const [url, setUrl] = useState(NOW_PLAYING_URL);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const startIndex = (page - 1) * 10;
  const paginatedMovies = movies.slice(startIndex, startIndex + 10);

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
    if (!loading) setLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        data.results.map((result: any) => (result.type = "movie"));
        setMovies(data.results);
        setPage(1);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [url]);
  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  const changePage = () => {
    if (page == 1) {
      setPage(2);
    } else {
      setPage(1);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={paginatedMovies}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <ListItem item={item} />}
        ListHeaderComponent={
          <View style={styles.container}>
            <Picker
              selectedValue={selectedList}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedList(itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="Now Playing" value="1" />
              <Picker.Item label="Popular" value="2" />
              <Picker.Item label="Top rated" value="3" />
              <Picker.Item label="Upcoming" value="4" />
            </Picker>
          </View>
        }
        ListFooterComponent={
          <View style={styles.pagination}>
            <Button
              title="Previous Page"
              onPress={changePage}
              disabled={page === 1}
            />
            <Text style={styles.pageNumber}>Page {page}</Text>
            <Button
              title="Next Page"
              onPress={changePage}
              disabled={page === 2}
            />
          </View>
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    marginBottom: 15,
    alignItems: "flex-start",
  },
  picker: {
    width: "75%",
    margin: "auto",
    backgroundColor: "whitesmoke",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
