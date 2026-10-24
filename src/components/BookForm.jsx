import { useMemo, useState } from "react";
import Button from "./Button.jsx";
import FormField from "./FormField.jsx";
import RatingInput from "./RatingInput.jsx";
import BookCard from "./BookCard.jsx";
import {
  EMPTY_BOOK,
  STATUS_OPTIONS,
  normalizeBook,
  validateBook,
} from "../lib/validators.js";

// 등록/수정 공용 폼.
//  - values:   controlled input 상태 (이 컴포넌트가 소유)
//  - touched:  사용자가 건드린 필드 (blur 이후부터 에러 표시)
//  - errors:   values 로부터 파생(useMemo) — 별도 state 로 두지 않는다
//  - submitting / submitError: 요청 상태는 부모(페이지)가 내려준다 (props)
export default function BookForm({
  initialValues = EMPTY_BOOK,
  submitLabel = "저장",
  submitting = false,
  submitError = null,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState({ ...EMPTY_BOOK, ...initialValues });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validateBook(values), [values]);
  const showError = (name) => (touched[name] || submitted ? errors[name] : undefined);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };
  const handleRating = (rating) => setValues((prev) => ({ ...prev, rating }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return; // 검증 실패 시 제출 중단
    onSubmit(normalizeBook(values));
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="form-layout">
      <form className="form" onSubmit={handleSubmit} noValidate>
        {submitError && (
          <div className="banner banner--error" role="alert">
            저장에 실패했습니다. 다시 시도하세요. ({submitError.message})
          </div>
        )}
        {submitted && errorCount > 0 && (
          <div className="banner banner--warn" role="alert">
            입력 내용을 확인해 주세요. ({errorCount}개 항목)
          </div>
        )}

        <FormField
          label="제목"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("title")}
          required
          placeholder="책 제목"
          maxLength={120}
        />
        <FormField
          label="저자"
          name="author"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("author")}
          required
          placeholder="저자 이름"
        />
        <FormField
          as="select"
          label="읽기 상태"
          name="status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("status")}
          options={STATUS_OPTIONS}
          required
        />
        <RatingInput value={Number(values.rating)} onChange={handleRating} error={showError("rating")} />
        <FormField
          as="textarea"
          label="리뷰 / 메모"
          name="review"
          value={values.review}
          onChange={handleChange}
          onBlur={handleBlur}
          error={showError("review")}
          hint={`${values.review.trim().length} / 1000자 (5자 이상)`}
          required
          placeholder="읽은 소감이나 메모를 남겨 보세요."
        />

        <div className="form__actions">
          <Button type="submit" loading={submitting}>
            {submitting ? "저장 중..." : submitLabel}
          </Button>
          {onCancel && (
            <Button variant="ghost" onClick={onCancel} disabled={submitting}>
              취소
            </Button>
          )}
        </div>
      </form>

      <aside className="form-preview" aria-label="미리보기">
        <h2 className="form-preview__title">미리보기</h2>
        <BookCard book={values} preview />
      </aside>
    </div>
  );
}
