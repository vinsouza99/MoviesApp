import { Stack, Tabs, Navigator, useRouter } from "expo-router";
import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TabTrigger, TabSlot, TabList } from "expo-router/ui";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const activeColor = "rgb(43, 52, 72)";
  const router = useRouter(); // Get router instance

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <Text style={styles.title}>Movies App</Text>
      </View>
      <Navigator>
        {/* Tabs Navigation at the Top */}
        <TabList style={styles.tabList}>
          <TabTrigger
            name="index"
            style={styles.tab}
            onPress={() => router.push("/")}
          >
            <Text style={styles.tabText}>Movies</Text>
          </TabTrigger>
          <TabTrigger
            name="search"
            style={styles.tab}
            onPress={() => router.push("/search")}
          >
            <Text style={styles.tabText}>Search</Text>
          </TabTrigger>
          <TabTrigger
            name="tvshows"
            style={styles.tab}
            onPress={() => router.push("/tvshows")}
          >
            <Text style={styles.tabText}>TV Shows</Text>
          </TabTrigger>
        </TabList>

        {/* Content */}
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
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgb(43, 52, 72)",
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
