// 클릭으로 별점을 고르는 입력 컴포넌트 (값은 부모가 소유하는 controlled 방식)
export default function RatingInput({ value, onChange, error, max = 5 }) {
  return (
    <div className="field">
      <span className="field__label" id="rating-label">
        별점<span className="field__required"> *</span>
      </span>
      <div className="rating-input" role="group" aria-labelledby="rating-label">
        {Array.from({ length: max }, (_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              type="button"
              className={n <= value ? "rating-input__btn rating-input__btn--on" : "rating-input__btn"}
              onClick={() => onChange(n)}
              aria-pressed={n === value}
              aria-label={`${n}점`}
            >
              ★
            </button>
          );
        })}
        <span className="rating-input__text">{value}점</span>
      </div>
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
