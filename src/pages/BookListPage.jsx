import { useMemo, useState } from "react";
import { useBooks } from "../hooks/useBooks.js";
import AsyncBoundary from "../components/AsyncBoundary.jsx";
import BookList from "../components/BookList.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Button from "../components/Button.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";

export default function BookListPage() {
  // 필터 상태는 이 페이지가 소유하고, FilterBar 에는 값 + 핸들러를 내려준다 (상태 끌어올리기)
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");

  // status/sort 변경 => useBooks 의 useEffect 재실행 => 서버에서 다시 조회
  const { books, loading, error, reload } = useBooks({ status, sort });

  // search 변경 => 클라이언트에서 즉시 필터링 (서버 재조회 없음)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return books;
    return books.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [books, search]);

  const hasCondition = status !== "all" || search.trim() !== "";

  return (
    <>
      <PageHeader
        title="내 책 목록"
        description={!loading && !error ? `${filtered.length}권` : undefined}
        actions={<Button to="/books/new">+ 책 등록</Button>}
      />

      <FilterBar
        status={status}
        sort={sort}
        search={search}
        onStatusChange={setStatus}
        onSortChange={setSort}
        onSearchChange={setSearch}
      />

      <AsyncBoundary
        loading={loading}
        error={error}
        isEmpty={filtered.length === 0}
        onRetry={reload}
        emptyDescription={
          hasCondition ? "검색어나 필터를 바꿔 보세요." : "첫 번째 책을 등록해 보세요."
        }
        emptyAction={!hasCondition && <Button to="/books/new">책 등록하기</Button>}
      >
        <BookList books={filtered} />
      </AsyncBoundary>
    </>
  );
}
