import { useCallback, useEffect, useState } from "react";
import { fetchBook } from "../lib/booksApi.js";

// 상세 조회 훅: 라우트 파라미터 id 가 바뀌면 재조회한다.
export function useBookDetail(id) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    fetchBook(id)
      .then((data) => {
        if (!ignore) setBook(data);
      })
      .catch((err) => {
        if (!ignore) setError(err);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { book, loading, error, reload };
}
