import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { IAuthContext } from "../types/auth-context";
import { IUser } from "../types/user";

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  loadingAuth: false,
  loadingHomeScreen: false,
  signIn: async () => null,
  signUp: async () => null,
  signOut: async () => null,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Omit<IUser, "password"> | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const [loadingHomeScreen, setLoadingHomeScreen] = useState<boolean>(true);

  useEffect(() => {
    const loadStorageUser = async () => {
      const storageUser = await AsyncStorage.getItem("@devapp");

      if (storageUser) {
        setCurrentUser(JSON.parse(storageUser));
      }

      setLoadingHomeScreen(false);
    };

    loadStorageUser();
  }, []);

  const signIn = useCallback(async ({ email, password }: Pick<IUser, "email" | "password">) => {
    setLoadingAuth(true);

    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);

      const userProfile = await firestore().collection("users").doc(user.uid).get();

      if (userProfile.exists) {
        const userDTO = {
          uid: user.uid,
          name: userProfile.data()?.name,
          email: user.email!,
        };

        setCurrentUser(userDTO);
        await AsyncStorage.setItem("@devapp", JSON.stringify(userDTO));
        router.replace("/home");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  const signUp = useCallback(async ({ name, email, password }: Omit<IUser, "uid">) => {
    setLoadingAuth(true);

    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      await firestore().collection("users").doc(user.uid).set({
        name,
        created_at: new Date(),
      });

      const userDTO = {
        uid: user.uid,
        name,
        email: user.email!,
      };

      setCurrentUser(userDTO);
      await AsyncStorage.setItem("@devapp", JSON.stringify(userDTO));
      router.replace("/home");
    } catch (error) {
      console.error("Sign-up error:", error);
    } finally {
      setLoadingAuth(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await auth().signOut();
      await AsyncStorage.clear();

      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      loadingAuth,
      loadingHomeScreen,
      signIn,
      signUp,
      signOut,
    }),
    [currentUser, loadingAuth, loadingHomeScreen, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
