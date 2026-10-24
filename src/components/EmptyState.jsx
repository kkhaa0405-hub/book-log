export default function EmptyState({
  title = "표시할 데이터가 없습니다.",
  description,
  action,
}) {
  return (
    <div className="state">
      <p className="state__title">{title}</p>
      {description && <p className="state__text">{description}</p>}
      {action}
    </div>
  );
}
