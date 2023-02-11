import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./initialize";

export const uploadImage = async (file, userId) => {
  const spaceRef = ref(storage, `user-profile-images/${userId}`);
  await uploadBytes(spaceRef, file);
};

export const getImageUrl = async (userId) => {
  const spaceRef = ref(storage, `user-profile-images/${userId}`);
  const url = await getDownloadURL(spaceRef);
  return url;
};

export const uploadPostImage = async (file, postNo) => {
  const spaceRef = ref(storage, `posts/${postNo}`);
  await uploadBytes(spaceRef, file);
}

export const getPostUrl = async (postNo) => {
  const spaceRef = ref(storage, `posts/${postNo}`);
  const url = await getDownloadURL(spaceRef);
  return url;
}