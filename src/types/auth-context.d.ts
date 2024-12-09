import { IUser } from "./user";

export interface IAuthContext {
  currentUser: Omit<IUser, "password"> | null;
  loadingAuth: boolean;
  loadingHomeScreen: boolean;
  signIn: ({ email, password }) => void;
  signUp: ({ name, email, password }) => void;
  signOut: () => void;
}
