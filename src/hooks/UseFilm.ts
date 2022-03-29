import React, { useEffect, useState } from "react";
import { API_KEY } from "../ts/API";

export function useFilm<T, P>(
  path: string,
  mockData: P,
  query: { [key: string]: string | undefined } = {}
): [T | P, Response | null] {
  const [StaticPath, _] = useState(
    path
      .split("/")
      .filter((a) => !!a)
      .join("/")
  );
  const [data, setData] = useState<T | P>(mockData);
  const [errorMessage, setErrorMessage] = useState<Response | null>(null);

  let queryString = "";
  for (let item of Object.entries(query)) {
    if (item[1]) queryString += "&" + item[0] + "=" + item[1];
  }
  useEffect(() => {
    if (data) setData(mockData);
    console.log("IS FETCHING", StaticPath, queryString);

    fetch(
      `https://api.themoviedb.org/3/${StaticPath}?api_key=${API_KEY}${queryString}`,
      {
        method: query.method || "GET",
        redirect: "follow",
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        setErrorMessage(response);
        return mockData;
      })
      .then((result) => {
        setData(result as T | P);
      })
      .catch((error) => {
        console.log("ERROR");
        setErrorMessage(error);
      });
  }, [queryString]);
  return [data, errorMessage];
}
