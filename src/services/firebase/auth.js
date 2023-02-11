import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from "firebase/auth";
import { auth } from "./initialize";

export const signUp = async (email, password) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const signIn = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const signOut = async () => {
  await signOutFirebase(auth);
};