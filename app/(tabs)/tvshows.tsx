import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
} from "react-native";
import { ListItem } from "@/components/ListItem";
import { Picker } from "@react-native-picker/picker";
import { options } from "@/constants/Constants";

const AIRING_TODAY_URL =
  "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1";
const ON_THE_AIR_URL =
  "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1";

const POPULAR_URL =
  "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";
const TOP_RATED_URL =
  "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";

export default function TVShowsScreen() {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedList, setSelectedList] = useState("1");
  const [url, setUrl] = useState(AIRING_TODAY_URL);
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * 10;
  const paginatedTvShows = tvShows.slice(startIndex, startIndex + 10);

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
    setTvShows([]);
    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        data.results.map((result: any) => (result.type = "tv"));
        setTvShows(data.results);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [url]);

  if (loading) return <ActivityIndicator size="large" />;
  const changePage = () => {
    if (page == 1) {
      setPage(2);
    } else {
      setPage(1);
    }
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <FlatList
          data={paginatedTvShows}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => <ListItem item={item} />}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          }
          ListHeaderComponent={
            <View style={styles.container}>
              <Picker
                selectedValue={selectedList}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedList(itemValue)
                }
                style={styles.picker}
              >
                <Picker.Item label="Airing today" value="1" />
                <Picker.Item label="On the air" value="2" />
                <Picker.Item label="Popular" value="3" />
                <Picker.Item label="Top rated" value="4" />
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
    </>
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
  noResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
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
