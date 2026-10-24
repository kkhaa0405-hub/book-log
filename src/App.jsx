import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookListPage from "./pages/BookListPage.jsx";
import BookDetailPage from "./pages/BookDetailPage.jsx";
import BookNewPage from "./pages/BookNewPage.jsx";
import BookEditPage from "./pages/BookEditPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// 라우트 표
//  /                 홈 (요약 + 최근 책)
//  /books            목록 (필터/검색/정렬)
//  /books/new        등록
//  /books/:id        상세 (삭제)
//  /books/:id/edit   수정
//  /about            소개
//  *                 Not Found
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="books" element={<BookListPage />} />
        <Route path="books/new" element={<BookNewPage />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="books/:id/edit" element={<BookEditPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
