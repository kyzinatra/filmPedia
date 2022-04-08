import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useAuth } from "./UseAuth";

export function usePhoto(fn: (link?: string) => void) {
  const [photoUrl, setPhotoUrl] = useState<string | null>();
  const getPhoto = useAuth((autn, user) => {
    if (user && photoUrl != user.photoURL) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        "images/" + user.uid + "/" + user.photoURL
      );
      setPhotoUrl(user.photoURL);
      getDownloadURL(storageRef).then((a) => fn(a));
    }
  });
  useEffect(() => {
    if (getPhoto) {
      getPhoto();
    }
  }, [getPhoto]);
}
