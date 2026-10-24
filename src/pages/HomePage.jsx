import { useMemo } from "react";
import { useBooks } from "../hooks/useBooks.js";
import AsyncBoundary from "../components/AsyncBoundary.jsx";
import BookList from "../components/BookList.jsx";
import Button from "../components/Button.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";

export default function HomePage() {
  const { books, loading, error, reload } = useBooks({ sort: "latest" });

  // books 가 바뀔 때만 다시 계산
  const stats = useMemo(
    () => ({
      total: books.length,
      done: books.filter((b) => b.status === "done").length,
      reading: books.filter((b) => b.status === "reading").length,
      want: books.filter((b) => b.status === "want").length,
    }),
    [books]
  );
  const recent = useMemo(() => books.slice(0, 3), [books]);

  return (
    <>
      <PageHeader
        title="나의 독서 기록"
        description="읽은 책, 읽는 중인 책, 읽고 싶은 책을 기록해 보세요."
        actions={<Button to="/books/new">+ 책 등록</Button>}
      />

      <AsyncBoundary
        loading={loading}
        error={error}
        isEmpty={books.length === 0}
        onRetry={reload}
        emptyDescription="첫 번째 책을 등록해 보세요."
        emptyAction={<Button to="/books/new">책 등록하기</Button>}
      >
        <section className="stats" aria-label="독서 현황">
          <div className="stat"><strong>{stats.total}</strong><span>전체</span></div>
          <div className="stat"><strong>{stats.done}</strong><span>완독</span></div>
          <div className="stat"><strong>{stats.reading}</strong><span>읽는 중</span></div>
          <div className="stat"><strong>{stats.want}</strong><span>읽고 싶어요</span></div>
        </section>

        <h2 className="section-title">최근 등록한 책</h2>
        <BookList books={recent} />
        <p className="more">
          <Button to="/books" variant="secondary">전체 목록 보기</Button>
        </p>
      </AsyncBoundary>
    </>
  );
}
