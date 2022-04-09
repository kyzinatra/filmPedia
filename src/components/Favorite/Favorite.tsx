import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";
import FavoriteCard from "./FavoriteCard/FavoriteCard";

import "./Favorite.sass";
import CardDetail from "../Main/UI/CardDetail/CardDetail";

const Favorite: FC = () => {
  const [modalInfo, setModalInfo] = useState<{ id?: string; type?: string }>(
    {}
  );
  const [films, setFilms] = useState<null | { id: string; type: string }[]>(
    null
  );

  const getFavoriteIds = useAuth((auth, user) => {
    if (!user || films) return;
    const db = getFirestore();
    const alovelaceDocumentRef = doc(db, "favorite", user.uid);
    getDoc(alovelaceDocumentRef).then(
      (a) => a.exists() && setFilms(a.data().id)
    );
  });
  useEffect(() => {
    if (getFavoriteIds) getFavoriteIds();
  }, [getFavoriteIds]);

  return (
    <div className="favorite">
      {films && films.length ? (
        films.map((el, i) => {
          return (
            <FavoriteCard
              setModalInfo={() => setModalInfo({ id: el.id, type: el.type })}
              key={el.id}
              id={el.id}
              type={el.type}
            />
          );
        })
      ) : (
        <h1 className="favorite__empty">There is no films D:</h1>
      )}
      {modalInfo.id && (
        <CardDetail
          resetId={() => setModalInfo({})}
          id={+modalInfo.id}
          location={"/favorite"}
          type={modalInfo.type}
        />
      )}
    </div>
  );
};

export default Favorite;
