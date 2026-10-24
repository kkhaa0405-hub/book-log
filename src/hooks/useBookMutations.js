import { useCallback, useMemo, useState } from "react";
import { createBook, updateBook, deleteBook } from "../lib/booksApi.js";

// 등록/수정/삭제 훅: 진행 중(pending)과 실패(error) 상태를 한곳에서 관리한다.
export function useBookMutations() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (task) => {
    setPending(true);
    setError(null);
    try {
      return await task();
    } catch (err) {
      setError(err);
      throw err; // 호출한 쪽에서 "성공 시에만 이동" 하도록 다시 던진다
    } finally {
      setPending(false);
    }
  }, []);

  const create = useCallback((values) => run(() => createBook(values)), [run]);
  const update = useCallback((id, values) => run(() => updateBook(id, values)), [run]);
  const remove = useCallback((id) => run(() => deleteBook(id)), [run]);
  const clearError = useCallback(() => setError(null), []);

  return useMemo(
    () => ({ create, update, remove, pending, error, clearError }),
    [create, update, remove, pending, error, clearError]
  );
}
