import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
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
  signUp: async ({ name, email, password }) => null,
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Omit<
    IUser,
    "password"
  > | null>(null);

  const signUp = useCallback(
    async ({ name, email, password }: Omit<IUser, "uid">) => {
      try {
        const authResult = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        if (authResult.user) {
          await firestore().collection("users").doc(authResult.user.uid).set({
            name,
            created_at: new Date(),
          });

          setCurrentUser({
            uid: authResult.user.uid,
            name,
            email,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      currentUser,
      signUp,
    }),
    [currentUser, signUp]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
