export const STATUS_OPTIONS = [
  { value: "want", label: "읽고 싶어요" },
  { value: "reading", label: "읽는 중" },
  { value: "done", label: "완독" },
];

export const STATUS_LABEL = Object.fromEntries(
  STATUS_OPTIONS.map((o) => [o.value, o.label])
);

export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "rating", label: "별점 높은순" },
  { value: "title", label: "제목순" },
];

export const EMPTY_BOOK = {
  title: "",
  author: "",
  status: "want",
  rating: 3,
  review: "",
};

// 값 => { 필드명: 에러메시지 }. 에러가 없으면 빈 객체.
export function validateBook(values) {
  const errors = {};
  const title = values.title.trim();
  const author = values.author.trim();
  const review = values.review.trim();

  if (!title) errors.title = "제목을 입력해 주세요.";
  else if (title.length > 100) errors.title = "제목은 100자 이내로 입력해 주세요.";

  if (!author) errors.author = "저자를 입력해 주세요.";
  else if (author.length > 50) errors.author = "저자는 50자 이내로 입력해 주세요.";

  if (!STATUS_LABEL[values.status]) errors.status = "읽기 상태를 선택해 주세요.";

  const rating = Number(values.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "별점은 1~5 사이로 선택해 주세요.";
  }

  if (!review) errors.review = "리뷰(메모)를 입력해 주세요.";
  else if (review.length < 5) errors.review = "리뷰는 5자 이상 입력해 주세요.";
  else if (review.length > 1000) errors.review = "리뷰는 1000자 이내로 입력해 주세요.";

  return errors;
}

// 서버로 보낼 값 정리
export function normalizeBook(values) {
  return {
    title: values.title.trim(),
    author: values.author.trim(),
    status: values.status,
    rating: Number(values.rating),
    review: values.review.trim(),
  };
}
