import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarIconStyle: {
          marginTop: 5,
        },
        tabBarStyle: {
          backgroundColor: "#27272a",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="home" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="search" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="user-o" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
