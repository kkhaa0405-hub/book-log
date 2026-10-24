import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import { isSupabaseConfigured } from "../../lib/supabaseClient.js";

// 공통 레이아웃: 모든 페이지에 헤더/네비게이션을 적용하고, 페이지는 <Outlet /> 자리에 렌더링된다.
export default function Layout() {
  return (
    <div className="app">
      <Header />
      {!isSupabaseConfigured && (
        <div className="banner banner--warn banner--top" role="alert">
          Supabase 환경변수가 설정되지 않았습니다. <code>.env</code>(로컬) 또는 배포 대시보드의
          Environment Variables 를 확인해 주세요.
        </div>
      )}
      <main className="container main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">북로그 · React + Supabase 미션</div>
      </footer>
    </div>
  );
}
