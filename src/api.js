import albums from "./albums.json";
import { useState, useEffect } from "react";

function resolveAfter(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getAlbums() {
  return resolveAfter(2000).then(() => albums);
}

export function useApi(apiFn) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    apiFn()
      .then((result) => setResult(result))
      .catch((error) => setError(error))
      .then(() => setLoading(false));
  }, [apiFn]);

  return [loading, result, error];
}
