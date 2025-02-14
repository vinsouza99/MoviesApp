import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <View style={styles.appBar}>
        <Text style={styles.title}>Movie App</Text>
      </View>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Tabs.Screen name="index" options={{ title: "Movies" }} />
          <Tabs.Screen name="search" options={{ title: "Search" }} />
          <Tabs.Screen name="tvshows" options={{ title: "TV Shows" }} />
        </Stack>
      </Tabs>
    </>
  );
}
const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#333",
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
