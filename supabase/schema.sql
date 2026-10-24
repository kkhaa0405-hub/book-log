-- Supabase 대시보드 > SQL Editor 에 통째로 붙여넣고 Run 하세요.

create table if not exists public.books (
  id          uuid primary key default gen_random_uuid(),
  title       text not null check (char_length(title) between 1 and 100),
  author      text not null check (char_length(author) between 1 and 50),
  status      text not null default 'want' check (status in ('want', 'reading', 'done')),
  rating      int  not null default 3 check (rating between 1 and 5),
  review      text not null default '' check (char_length(review) <= 1000),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 학습용: 로그인 없이 누구나 CRUD 가능하도록 RLS 정책을 열어 둡니다.
-- (RLS/권한 설계는 이 미션의 필수 범위가 아닙니다.)
alter table public.books enable row level security;

drop policy if exists "books_select_all" on public.books;
drop policy if exists "books_insert_all" on public.books;
drop policy if exists "books_update_all" on public.books;
drop policy if exists "books_delete_all" on public.books;

create policy "books_select_all" on public.books for select to anon using (true);
create policy "books_insert_all" on public.books for insert to anon with check (true);
create policy "books_update_all" on public.books for update to anon using (true) with check (true);
create policy "books_delete_all" on public.books for delete to anon using (true);

-- (선택) 샘플 데이터
insert into public.books (title, author, status, rating, review) values
  ('클린 코드', '로버트 C. 마틴', 'done', 5, '이름 짓기와 함수 분리에 대한 기준이 생겼다. 다시 읽어도 좋은 책.'),
  ('리액트를 다루는 기술', '김민수', 'reading', 4, '상태 관리와 훅 파트를 읽는 중. 예제를 직접 따라 치는 중이다.'),
  ('데이터 중심 애플리케이션 설계', '마틴 클레프만', 'want', 3, '두꺼워서 미루고 있지만 올해 안에는 읽고 싶다.');
