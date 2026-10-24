import PageHeader from "../components/layout/PageHeader.jsx";

export default function AboutPage() {
  return (
    <>
      <PageHeader title="소개" description="React 상태 관리와 데이터 흐름을 학습하기 위한 SPA 입니다." />
      <section className="prose">
        <h2>기술 스택</h2>
        <ul>
          <li>React 18 + Vite (JavaScript)</li>
          <li>React Router v6</li>
          <li>Supabase (PostgreSQL) — 원격 CRUD</li>
          <li>순수 CSS</li>
        </ul>
        <h2>데이터 흐름</h2>
        <p>
          사용자 이벤트 → 상태 변경 → 렌더링 변화. 목록은 <code>useBooks</code>, 상세는{" "}
          <code>useBookDetail</code>, 등록/수정/삭제는 <code>useBookMutations</code> 훅이 담당하고,
          로딩·에러·빈 상태는 <code>AsyncBoundary</code> 한 곳에서 공통 처리합니다.
        </p>
      </section>
    </>
  );
}
