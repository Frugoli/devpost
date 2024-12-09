import { IUser } from "./user";

export interface IAuthContext {
  currentUser: Omit<IUser, "password"> | null;
  signIn: ({ email, password }) => void;
  signUp: ({ name, email, password }) => void;
}
