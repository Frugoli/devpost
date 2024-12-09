import "@/global.css";

import { router, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";

export default function Layout() {
  useEffect(() => {
    const user = false;

    user ? router.replace("/home") : router.replace("/sign-in");
  }, []);

  const RootLayout = () => {
    return (
      <React.Fragment>
        <Slot />

        <StatusBar style="inverted" translucent />
      </React.Fragment>
    );
  };

  return <RootLayout />;
}
