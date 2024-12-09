import { Tabs } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#09090b",
        },
        tabBarIconStyle: {
          flex: 1,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ size, color }) => {
            return <AntDesign name="home" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ size, color }) => {
            return <AntDesign name="search1" size={size} color={color} />;
          },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => {
            return <AntDesign name="profile" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
