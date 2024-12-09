import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { IAuthContext } from "../types/auth-context";
import { IUser } from "../types/user";

export const AuthContext = createContext<IAuthContext>({
  currentUser: null,
  signIn: async ({ email, password }) => null,
  signUp: async ({ name, email, password }) => null,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Omit<
    IUser,
    "password"
  > | null>(null);

  const signIn = useCallback(
    async ({ email, password }: Pick<IUser, "email" | "password">) => {
      try {
        const isAuth = await auth().signInWithEmailAndPassword(email, password);

        if (isAuth) {
          const userProfile = await firestore()
            .collection("users")
            .doc(isAuth.user.uid)
            .get();

          if (userProfile) {
            setCurrentUser({
              uid: userProfile.data()?.uid,
              name: userProfile.data()?.name,
              email: userProfile.data()?.email,
            });

            router.replace("/home");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const signUp = useCallback(
    async ({ name, email, password }: Omit<IUser, "uid">) => {
      try {
        const authResult = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        if (authResult) {
          await firestore().collection("users").doc(authResult.user.uid).set({
            name,
            created_at: new Date(),
          });

          setCurrentUser({
            uid: authResult.user.uid,
            name,
            email,
          });

          router.replace("/home");
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      currentUser,
      signIn,
      signUp,
    }),
    [currentUser, signIn, signUp]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
