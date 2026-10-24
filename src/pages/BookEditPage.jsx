import { useNavigate, useParams } from "react-router-dom";
import { useBookDetail } from "../hooks/useBookDetail.js";
import { useBookMutations } from "../hooks/useBookMutations.js";
import { useToast } from "../context/ToastContext.jsx";
import AsyncBoundary from "../components/AsyncBoundary.jsx";
import BookForm from "../components/BookForm.jsx";
import Button from "../components/Button.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";

export default function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { book, loading, error, reload } = useBookDetail(id);
  const { update, pending, error: submitError } = useBookMutations();

  const handleSubmit = async (values) => {
    try {
      await update(id, values);
      showToast("수정했습니다.");
      navigate(`/books/${id}`);
    } catch {
      // submitError 로 표시
    }
  };

  return (
    <>
      <PageHeader title="책 수정" />
      <AsyncBoundary
        loading={loading}
        error={error}
        isEmpty={!book}
        onRetry={reload}
        emptyTitle="존재하지 않는 책입니다."
        emptyAction={<Button to="/books" variant="secondary">목록으로</Button>}
      >
        {/* 데이터가 로드된 뒤에 마운트되므로 initialValues 가 폼 state 의 초기값이 된다 */}
        {book && (
          <BookForm
            initialValues={{
              title: book.title,
              author: book.author,
              status: book.status,
              rating: book.rating,
              review: book.review,
            }}
            submitLabel="수정 저장"
            submitting={pending}
            submitError={submitError}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/books/${id}`)}
          />
        )}
      </AsyncBoundary>
    </>
  );
}
