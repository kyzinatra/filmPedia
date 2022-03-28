import React, { useEffect, useState } from "react";
import { API_KEY } from "../ts/API";

export function useFilm(
  path: string,
  query: { [key: string]: string } = {},
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET"
) {
  const [StaticPath, _] = useState(
    path
      .split("/")
      .filter((a) => !!a)
      .join("/")
  );
  const [data, setData] = useState<any>(null);

  let queryString = "";
  for (let item of Object.entries(query)) {
    queryString += "&" + item[0] + "=" + item[1];
  }
  useEffect(() => {
    if (data) setData(null);
    fetch(
      `https://api.themoviedb.org/3/${StaticPath}?api_key=${API_KEY}${queryString}`,
      {
        method,
        redirect: "follow",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, [queryString]);
  return data;
}
