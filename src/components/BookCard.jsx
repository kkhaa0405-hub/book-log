import { memo } from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars.jsx";
import StatusBadge from "./StatusBadge.jsx";
import { formatDate } from "../lib/format.js";

// preview=true 이면 링크 없이 보여주는 미리보기 카드 (등록/수정 폼에서 사용)
// React.memo: props 가 그대로면 목록이 다시 그려질 때도 이 카드는 리렌더링하지 않는다.
function BookCard({ book, preview = false }) {
  const content = (
    <>
      <div className="card__top">
        <StatusBadge status={book.status} />
        <RatingStars value={Number(book.rating)} />
      </div>
      <h3 className="card__title">{book.title || "제목을 입력해 주세요"}</h3>
      <p className="card__author">{book.author || "저자"}</p>
      <p className="card__review">{book.review || "리뷰가 여기에 표시됩니다."}</p>
      {!preview && book.created_at && (
        <p className="card__date">{formatDate(book.created_at)}</p>
      )}
    </>
  );

  if (preview) return <article className="card card--preview">{content}</article>;

  return (
    <Link to={`/books/${book.id}`} className="card card--link">
      {content}
    </Link>
  );
}

export default memo(BookCard);
