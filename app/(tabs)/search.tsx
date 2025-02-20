import { ListItem } from "@/components/ListItem";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMDYwOTY4YTIyNWU3ZDUwYmI5MzIyZTZmN2YxZTFiYyIsIm5iZiI6MTcxMTgxMzIyNC4zMDA5OTk5LCJzdWIiOiI2NjA4MzI2ODBkNDE3ZTAxN2MwNzA1OGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BYvN7iTZnSj4aSxvlZdoguRybnLWs0UzzdVMms1ujXk"; // Define the expected structure of a movie/TV show item
type SearchResult = {
  id: number;
  title?: string;
  name?: string;
  release_date: string;
  popularity: number;
  overview: string;
  poster_path: string | null;
  type: string | null;
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("movie");

  const handleSearch = async () => {
    const encodedQuery = encodeURIComponent(query.trim());
    setLoading(true);

    try {
      const url = `https://api.themoviedb.org/3/search/${selectedType}?query=${encodedQuery}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      // Ensure results are correctly typed
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {results.length === 0 && !loading && (
        <Text style={styles.noResults}>No results found</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ListItem item={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.formGroup}>
              <Text>Search Movies/TV Shows Name</Text>
              <TextInput
                style={styles.input}
                placeholder="i.e: James Bond"
                value={query}
                onChangeText={setQuery}
              />
            </View>
            <View style={styles.formGroup}>
              <Text>Search type</Text>
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
                <Button
                  title="Search"
                  onPress={handleSearch}
                  disabled={loading}
                />
              </View>
            </View>
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
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  noResults: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
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
    width: "75%",
    padding: 5,
    margin: "auto",
  },
  formGroup: {},
  formRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
