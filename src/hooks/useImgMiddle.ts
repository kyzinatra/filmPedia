import { useEffect, useState, Dispatch, SetStateAction, useMemo } from "react";

const getContext = (width: string, height: string) => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);
  return canvas.getContext("2d");
};

const getImageData = (
  src: string,
  scale: number = 1
): Promise<Uint8ClampedArray> => {
  const img = new Image();

  if (!src.startsWith("data")) img.crossOrigin = "Anonymous";

  return new Promise((resolve, reject) => {
    img.onload = function () {
      const width = String(img.width * (1 - scale) || 1);
      const height = String(img.height * (1 - scale) || 1);
      const context = getContext(width, height);
      if (context == null) throw TypeError("Contex is null x1000001");
      context.drawImage(img, 0, 0, +width, +height);

      const { data } = context.getImageData(0, 0, +width, +height);
      resolve(data);
    };

    const errorHandler = () =>
      reject(new Error("An error occurred attempting to load image"));

    img.onerror = errorHandler;
    img.onabort = errorHandler;
    img.src = src;
  });
};

interface dataOptions {
  ignore?: string[];
  error?: number;
  skip?: number;
  skipTransparentPixels?: boolean;
}
interface DataArray {
  color: string;
  count: number;
}

function getWithErrorFactor(number: number, error: number): number {
  if (!error) error = 1;
  const mod = number % error;
  const nearest = Math.max(mod, error - mod) === mod ? error - mod : -mod;
  return number + nearest;
}

const getCounts = (
  data: Uint8ClampedArray,
  { ignore = [], error, skip }: dataOptions
): DataArray[] => {
  const countMap: { [key: string]: DataArray } = {};
  error = Math.round((error || 0) * 255);

  for (let i = 0; i < data.length; i += 4 * (Math.round(skip || 1) || 1)) {
    let alpha: number = data[i + 3];
    if (alpha === 0) continue;

    let rgbComponents: number[] = Array.from(data.subarray(i, i + 3)).map((a) =>
      getWithErrorFactor(a, error || 1)
    );

    if (rgbComponents.indexOf(undefined!) !== -1) continue;

    let color;
    if (alpha && alpha !== 255) {
      color = `rgba(${[...rgbComponents, alpha].join(",")})`;
    } else color = `rgb(${rgbComponents.join(",")})`;

    if (ignore.indexOf(color) !== -1) continue;

    if (countMap[color]) {
      countMap[color].count++;
    } else {
      countMap[color] = { color, count: 1 };
    }
  }

  const counts = Object.values(countMap);
  return counts.sort((a: any, b: any) => b.count - a.count);
};

interface MainOptions {
  ignore?: string[];
  optimization: {
    scale?: number;
    error?: number;
    skip?: number;
  };
  skipTransparentPixels?: boolean;
}

const defaultOpts: MainOptions = {
  ignore: [],
  optimization: {
    // 0 = no scale best fidelity, worst performance
    // 1 = full scale best performance, lowest fidelity
    scale: 0,

    // 0 = no error best fidelity, worst performance
    // 1 = every colour is one best performance, lowest fidelity
    error: 0,
    skip: 1,
  },
  skipTransparentPixels: false,
};

export default function useImgMiddle(
  src: string,
  options: MainOptions = defaultOpts
): [
  { color: string; count: number }[],
  string,
  Dispatch<SetStateAction<string>>
] {
  const {
    ignore = [],
    optimization: { scale = 0, error = 0, skip = 1 },
    skipTransparentPixels,
  } = options;

  // * tranfsorm scale to position 0 - the worst, 1 - the best quality

  if (typeof src != "string")
    throw TypeError("useImgMiddle have to get the string path");

  const [path, setPath] = useState<string>(src);
  const [color, setColor] = useState<{ color: string; count: number }[]>([]);

  if (scale > 1 || scale < 0 || error > 1 || error < 0)
    throw TypeError(
      `You set optimization params out of range, it have to be between 0 and 1`
    );
  useMemo(() => {
    getImageData(path, scale).then((data) => {
      setColor(getCounts(data, { ignore, error, skipTransparentPixels, skip }));
    });
  }, [path, scale, error, skip]);
  return [color, path, setPath];
}
