import EmptyState from "../components/EmptyState.jsx";
import Button from "../components/Button.jsx";

export default function NotFoundPage() {
  return (
    <EmptyState
      title="404 - 페이지를 찾을 수 없습니다."
      description="주소를 다시 확인해 주세요."
      action={<Button to="/">홈으로</Button>}
    />
  );
}
