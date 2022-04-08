import React, { FC, useEffect, useState } from "react";
import img1 from "../../../static/avatar2.png";
import "./Photo.sass";
import { AlertColor } from "../../../types/color";
import { useAuth } from "../../../hooks/UseAuth";
import { updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
interface IPhoto {
  photoURL?: string | null;
  displayName?: string | null;
  setInform: React.Dispatch<
    React.SetStateAction<{
      text: string;
      color: AlertColor;
    } | null>
  >;
}

const Photo: FC<IPhoto> = ({ displayName, photoURL, setInform }) => {
  const [newFile, setNewFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");

  const writeImg = useAuth((auth, user) => {
    if (user && newFile) {
      const storage = getStorage();
      const imagesRef = ref(storage, "images/" + user.uid + "/" + newFile.name);
      const dir = ref(storage, "images/" + user.uid);
      listAll(dir)
        .then((res) => {
          res.items.forEach((itemRef) => {
            // if (!/.txt$/iu.test(itemRef.name))
            deleteObject(itemRef);
          });
        })
        .then(() => uploadBytes(imagesRef, newFile))
        .then((e) => updateProfile(user, { photoURL: e.metadata.name }))
        .then(() =>
          setInform({
            text: "Your file has uploaded",
            color: "success",
          })
        )
        .catch(() => {
          setInform({
            text: "Access denied!",
            color: "error",
          });
        });
    }
  });
  function getFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!/^image\//.test(file?.type || "") || !file || file.size > 3145728) {
      setInform({
        text: "Wrong File type or size (no more 3 MB)!",
        color: "error",
      });
      return;
    }
    setNewFile(file);
  }

  useEffect(() => {
    if (newFile && writeImg) writeImg();
  }, [newFile]);

  useEffect(() => {
    let isMount = true;
    if (photoURL) {
      const toLoad = new Image();
      toLoad.src = photoURL;
      toLoad.onload = () => isMount && setImgUrl(photoURL);
      toLoad.onerror = () => isMount && setImgUrl(img1);
    } else if (isMount) setImgUrl(img1);
    return () => {
      isMount = false;
    };
  }, [photoURL]);
  return (
    <div className="photo">
      <input type="file" accept="image/*" onChange={getFiles} />
      <img src={imgUrl} alt={displayName || ""} />
    </div>
  );
};

export default Photo;
