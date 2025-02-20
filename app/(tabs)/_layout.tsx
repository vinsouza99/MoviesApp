import React from "react";
import { Navigator, useRouter, usePathname } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TabTrigger, TabSlot, TabList } from "expo-router/ui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appBar}>
        <Text style={styles.title}>Movies App</Text>
      </View>
      <Navigator>
        <TabList style={styles.tabList}>
          <TabTrigger
            name="index"
            style={[
              styles.tab,
              pathname === "/" ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => router.push("/")}
          >
            <Text
              style={[
                styles.tabText,
                pathname === "/"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Movies
            </Text>
          </TabTrigger>
          <TabTrigger
            name="search"
            style={[
              styles.tab,
              pathname === "/search" ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => router.push("/search")}
          >
            <Text
              style={[
                styles.tabText,
                pathname === "/search"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              Search Results
            </Text>
          </TabTrigger>
          <TabTrigger
            name="tvshows"
            style={[
              styles.tab,
              pathname === "/tvshows" ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => router.push("/tvshows")}
          >
            <Text
              style={[
                styles.tabText,
                pathname === "/tvshows"
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              TV Shows
            </Text>
          </TabTrigger>
        </TabList>
        <TabSlot style={styles.content} />
      </Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "rgb(43, 52, 72)",
  },
  tabList: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffff",
    paddingVertical: 0,
    gap: 0,
  },
  tab: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 3,
  },
  tabText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(43, 52, 72)",
  },
  activeTab: {
    borderBottomColor: "rgb(43, 52, 72)",
  },
  inactiveTab: {
    borderBottomColor: "lightgray",
  },
  activeTabText: {
    color: "rgb(43, 52, 72)",
  },
  inactiveTabText: {
    color: "lightgray",
  },
  appBar: {
    backgroundColor: "rgb(43, 52, 72)",
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
});
