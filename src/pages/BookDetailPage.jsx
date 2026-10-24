import { useNavigate, useParams } from "react-router-dom";
import { useBookDetail } from "../hooks/useBookDetail.js";
import { useBookMutations } from "../hooks/useBookMutations.js";
import { useToast } from "../context/ToastContext.jsx";
import AsyncBoundary from "../components/AsyncBoundary.jsx";
import Button from "../components/Button.jsx";
import ConfirmButton from "../components/ConfirmButton.jsx";
import RatingStars from "../components/RatingStars.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { formatDate } from "../lib/format.js";

export default function BookDetailPage() {
  const { id } = useParams(); // 라우트 파라미터 => 상세 조회 키
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { book, loading, error, reload } = useBookDetail(id);
  const { remove, pending, error: deleteError } = useBookMutations();

  const handleDelete = async () => {
    try {
      await remove(id);
      showToast("삭제했습니다.");
      navigate("/books"); // 삭제 성공 시에만 목록으로 이동
    } catch {
      // 실패 메시지는 deleteError 로 화면에 표시된다
    }
  };

  return (
    <AsyncBoundary
      loading={loading}
      error={error}
      isEmpty={!book}
      onRetry={reload}
      emptyTitle="존재하지 않는 책입니다."
      emptyDescription="삭제되었거나 잘못된 주소입니다."
      emptyAction={<Button to="/books" variant="secondary">목록으로</Button>}
    >
      {book && (
        <article className="detail">
          <p className="detail__back">
            <Button to="/books" variant="ghost">← 목록으로</Button>
          </p>

          {deleteError && (
            <div className="banner banner--error" role="alert">
              삭제에 실패했습니다. 다시 시도하세요. ({deleteError.message})
            </div>
          )}

          <div className="detail__meta">
            <StatusBadge status={book.status} />
            <RatingStars value={Number(book.rating)} />
          </div>
          <h1 className="detail__title">{book.title}</h1>
          <p className="detail__author">{book.author}</p>
          <p className="detail__review">{book.review}</p>
          <p className="detail__date">
            등록 {formatDate(book.created_at)}
            {book.updated_at !== book.created_at && ` · 수정 ${formatDate(book.updated_at)}`}
          </p>

          <div className="detail__actions">
            <Button to={`/books/${book.id}/edit`} variant="secondary">수정</Button>
            <ConfirmButton label="삭제" onConfirm={handleDelete} pending={pending} />
          </div>
        </article>
      )}
    </AsyncBoundary>
  );
}
