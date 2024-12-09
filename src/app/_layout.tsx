import "@/global.css";

import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect } from "react";
import AuthProvider, { AuthContext } from "../contexts/auth-context";

export default function Layout() {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      router.replace("/home");
      return;
    }

    router.replace("/sign-in");
  }, [currentUser]);

  const RootLayout = () => {
    return (
      <React.Fragment>
        <Slot />

        <StatusBar style="inverted" translucent />
      </React.Fragment>
    );
  };

  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
