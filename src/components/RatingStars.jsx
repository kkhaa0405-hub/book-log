// 읽기 전용 별점 표시
export default function RatingStars({ value = 0, max = 5 }) {
  return (
    <span className="stars" aria-label={`별점 ${value}점 / ${max}점`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={i < value ? "star star--on" : "star"} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}
