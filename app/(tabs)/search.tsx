import { ListItem } from "@/components/ListItem";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Button,
} from "react-native";
import { options } from "@/constants/Constants";

type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  release_date: string;
  first_air_date: string;
  popularity: number;
  overview: string;
  poster_path: string | null;
  media_type: string | null;
  type: string | null;
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("movie");
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * 10;
  const paginatedResults = results.slice(startIndex, startIndex + 10);

  const handleSearch = async () => {
    const encodedQuery = encodeURIComponent(query.trim());
    setLoading(true);

    try {
      const url = `https://api.themoviedb.org/3/search/${selectedType}?query=${encodedQuery}`;
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          data.results.map((result: any) => (result.type = selectedType));
          setResults(data.results || []);
        })
        .catch((e) => {
          console.error(e);
          throw e;
        });
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };
  const changePage = () => {
    if (page == 1) {
      setPage(2);
    } else {
      setPage(1);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={paginatedResults}
        style={styles.flatList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItem item={item} />}
        ListEmptyComponent={
          loading ? (
            <View style={styles.noResults}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No results found</Text>
            </View>
          )
        }
        ListHeaderComponent={
          <>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Search Movies/TV Shows Name</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="search" size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="i.e: James Bond"
                  value={query}
                  onChangeText={setQuery}
                />
              </View>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Search type</Text>
              <View style={styles.formRow}>
                <Picker
                  selectedValue={selectedType}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedType(itemValue)
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Movies" value="movie" />
                  <Picker.Item label="TV Shows" value="tv" />
                  <Picker.Item label="Multi" value="multi" />
                </Picker>
                <Pressable
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: Colors.light.buttonBackground,
                    },
                  ]}
                  onPress={handleSearch}
                  disabled={loading}
                >
                  <Ionicons name="search" size={20} color={"#ffff"} />
                  <Text style={styles.buttonText}>Search</Text>
                </Pressable>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            {results.length > 10 ? (
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
            ) : (
              ""
            )}
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  flatList: {
    flex: 1,
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
  resultItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  poster: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  overview: {
    fontSize: 14,
    color: "#555",
  },
  picker: {
    flex: 2,
    margin: "auto",
    backgroundColor: "whitesmoke",
  },
  buttonContainer: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  formGroup: {},
  formRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 5,
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
