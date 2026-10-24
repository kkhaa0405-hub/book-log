import { useCallback, useEffect, useState } from "react";
import { fetchBooks } from "../lib/booksApi.js";

// 목록 조회 훅: status/sort 가 바뀌면 useEffect 가 다시 실행되어 재조회한다.
export function useBooks({ status = "all", sort = "latest" } = {}) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false; // 이전 요청의 늦은 응답이 최신 상태를 덮어쓰지 않도록 방지
    setLoading(true);
    setError(null);

    fetchBooks({ status, sort })
      .then((data) => {
        if (!ignore) setBooks(data);
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
  }, [status, sort, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { books, loading, error, reload };
}
