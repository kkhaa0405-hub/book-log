import Button from "./Button.jsx";

export default function ErrorState({
  message = "요청에 실패했습니다. 다시 시도하세요.",
  detail,
  onRetry,
}) {
  return (
    <div className="state state--error" role="alert">
      <p className="state__title">{message}</p>
      {detail && <p className="state__detail">{detail}</p>}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}
