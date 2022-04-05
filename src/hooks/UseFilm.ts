import React, { useEffect, useState } from "react";
import { API_KEY } from "../ts/API";

declare global {
  interface Window {
    memoization: { fullPath: string; data?: any }[];
  }
}

window.memoization = [];

function setMemoization(add: { fullPath: string; data?: any }) {
  const checkMemo = window.memoization.find((a) => a.fullPath == add.fullPath);
  if (checkMemo) {
    return null;
  }
  window.memoization.push(add);
  return true;
}

function getMemoization(fullPath: string) {
  const checkMemo = window.memoization.find((a) => a.fullPath == fullPath);
  if (checkMemo) return checkMemo;
  return false;
}

export function useFilm<T, P>(
  path: string,
  mockData: P,
  query: { [key: string]: string | undefined } = {}
): [T | P, Response | null] {
  const StaticPath = path
    .split("/")
    .filter((a) => !!a)
    .join("/");
  const [data, setData] = useState<T | P>(mockData);
  const [errorMessage, setErrorMessage] = useState<Response | null>(null);

  let queryString = "";
  for (let item of Object.entries(query)) {
    if (item[1]) queryString += "&" + item[0] + "=" + item[1];
  }
  const fullPath = StaticPath + queryString;
  useEffect(() => {
    let isMount = true;
    if (data) setData(mockData);
    const isKept = getMemoization(fullPath);
    if (isKept && isKept.data) {
      setData(isKept.data);
      return;
    }
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
        if (isMount) setErrorMessage(response);
        return mockData;
      })
      .then((result) => {
        if (isMount) {
          setMemoization({ fullPath, data: result });
          setData(result as T | P);
        }
      })
      .catch((error) => {
        console.log("ERROR");
        if (isMount) setErrorMessage(error);
      });
    return () => {
      isMount = false;
    };
  }, [queryString, StaticPath]);
  return [data, errorMessage];
}
