import { useState } from "react";
import Button from "./Button.jsx";

// 위험한 동작(삭제)을 한 번 더 확인받는 버튼. "확인 중" 여부는 이 컴포넌트 내부 state 로만 관리한다.
export default function ConfirmButton({
  label,
  message = "정말 삭제할까요?",
  confirmLabel = "삭제",
  onConfirm,
  pending = false,
}) {
  const [asking, setAsking] = useState(false);

  if (!asking) {
    return (
      <Button variant="danger" onClick={() => setAsking(true)}>
        {label}
      </Button>
    );
  }

  return (
    <span className="confirm">
      <span className="confirm__msg">{message}</span>
      <Button variant="danger" onClick={onConfirm} loading={pending}>
        {pending ? "삭제 중..." : confirmLabel}
      </Button>
      <Button variant="ghost" onClick={() => setAsking(false)} disabled={pending}>
        취소
      </Button>
    </span>
  );
}
