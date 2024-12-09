import { IUser } from "./user";

export interface IAuthContext {
  currentUser: Omit<IUser, "password"> | null;
  signUp: ({ name, email, password }) => void;
}
