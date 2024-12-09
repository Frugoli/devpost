import "@/global.css";
import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import AuthProvider, { AuthContext } from "../contexts/auth-context";

const RootLayout = () => {
  const { currentUser, loadingHomeScreen } = useContext(AuthContext);

  useEffect(() => {
    if (loadingHomeScreen) return;

    if (currentUser) {
      router.replace("/home");
    } else {
      router.replace("/sign-in");
    }
  }, [currentUser, loadingHomeScreen]);

  return <Slot />;
};

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
      <StatusBar style="inverted" translucent />
    </AuthProvider>
  );
}
