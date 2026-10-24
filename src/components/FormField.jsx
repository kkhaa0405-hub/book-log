// 라벨 + 입력 + 에러 메시지를 묶은 제어 컴포넌트용 필드.
// as: input | textarea | select
export default function FormField({
  as = "input",
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  options = [],
  required = false,
  ...rest
}) {
  const errorId = `${name}-error`;
  const common = {
    id: name,
    name,
    value,
    onChange,
    onBlur,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: error ? "field__control field__control--error" : "field__control",
    ...rest,
  };

  let control;
  if (as === "textarea") {
    control = <textarea rows={6} {...common} />;
  } else if (as === "select") {
    control = (
      <select {...common}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  } else {
    control = <input type="text" {...common} />;
  }

  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {label}
        {required && <span className="field__required"> *</span>}
      </label>
      {control}
      {hint && !error && <p className="field__hint">{hint}</p>}
      {error && (
        <p id={errorId} className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
