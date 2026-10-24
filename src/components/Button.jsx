import { Link } from "react-router-dom";

// variant: primary | secondary | danger | ghost
// loading: true 이면 스피너 표시 + 비활성화 (제출 중 상태)
// to: 있으면 <Link> 로 렌더링
export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  to,
  type = "button",
  children,
  ...rest
}) {
  const className = `btn btn--${variant}`;

  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <span className="spinner spinner--sm" aria-hidden="true" />}
      {children}
    </button>
  );
}
