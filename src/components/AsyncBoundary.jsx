import Loading from "./Loading.jsx";
import ErrorState from "./ErrorState.jsx";
import EmptyState from "./EmptyState.jsx";

// 로딩 → 에러 → 빈 상태 → 성공 순서로 분기하는 공통 컴포넌트.
// 모든 핵심 화면이 이 컴포넌트를 거치므로 상태 처리 방식이 한 곳에서 통일된다.
export default function AsyncBoundary({
  loading,
  error,
  isEmpty = false,
  onRetry,
  loadingLabel,
  emptyTitle,
  emptyDescription,
  emptyAction,
  children,
}) {
  if (loading) return <Loading label={loadingLabel} />;
  if (error) return <ErrorState detail={error.message} onRetry={onRetry} />;
  if (isEmpty) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
    );
  }
  return children;
}
