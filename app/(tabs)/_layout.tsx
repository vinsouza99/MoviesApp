import { Stack, Tabs } from "expo-router";
import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { TabTrigger, TabSlot, TabList } from "expo-router/ui";

export default function TabLayout() {
  const activeColor = "rgb(43, 52, 72)";

  return (
    <>
      <View style={styles.appBar}>
        <Text style={styles.title}>Movie App</Text>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeColor,
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
        <Tabs.Screen
          name="index"
          options={{
            title: "Movies",
            tabBarIcon: () => undefined,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: () => undefined,
          }}
        />
        <Tabs.Screen
          name="tvshows"
          options={{
            title: "TV Shows",
            tabBarIcon: () => undefined,
          }}
        />
      </Tabs>
      {/*
      <Tabs>
        <TabSlot />
        <TabList>
          <TabTrigger name="index" href="/">
            <Text>Movies</Text>
          </TabTrigger>
          <TabTrigger name="search" href="/search">
            <Text>Search</Text>
          </TabTrigger>
          <TabTrigger name="tvshows" href="/tvshows">
            <Text>TV Shows</Text>
          </TabTrigger>
        </TabList>
      </Tabs>
      */}
    </>
  );
}
const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "rgb(43, 52, 72)",
    padding: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#fff",
  },
});
