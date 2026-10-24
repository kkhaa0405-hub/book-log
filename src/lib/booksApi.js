import { getClient } from "./supabaseClient.js";

const TABLE = "books";

const SORTS = {
  latest: { column: "created_at", ascending: false },
  rating: { column: "rating", ascending: false },
  title: { column: "title", ascending: true },
};

function toError(error) {
  const err = new Error(error.message || "요청에 실패했습니다.");
  err.code = error.code;
  return err;
}

// 목록 조회: status / sort 는 서버(쿼리)에서 처리한다.
export async function fetchBooks({ status = "all", sort = "latest" } = {}) {
  const sortOption = SORTS[sort] || SORTS.latest;
  let query = getClient()
    .from(TABLE)
    .select("*")
    .order(sortOption.column, { ascending: sortOption.ascending });
  if (status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw toError(error);
  return data ?? [];
}

// 상세 조회: 없으면 null
export async function fetchBook(id) {
  const { data, error } = await getClient()
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    // uuid 형식이 아닌 id 로 접근한 경우 => "없는 데이터" 로 취급
    if (error.code === "22P02") return null;
    throw toError(error);
  }
  return data;
}

export async function createBook(values) {
  const { data, error } = await getClient()
    .from(TABLE)
    .insert(values)
    .select()
    .single();
  if (error) throw toError(error);
  return data;
}

export async function updateBook(id, values) {
  const { data, error } = await getClient()
    .from(TABLE)
    .update({ ...values, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw toError(error);
  if (!data) throw new Error("수정할 데이터를 찾을 수 없거나 권한이 없습니다.");
  return data;
}

export async function deleteBook(id) {
  const { data, error } = await getClient()
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select();
  if (error) throw toError(error);
  // RLS 등으로 0건 삭제된 경우도 실패로 처리
  if (!data || data.length === 0) {
    throw new Error("삭제할 데이터를 찾을 수 없거나 권한이 없습니다.");
  }
}
