import { STATUS_OPTIONS, SORT_OPTIONS } from "../lib/validators.js";

const STATUS_TABS = [{ value: "all", label: "전체" }, ...STATUS_OPTIONS];

// 필터/정렬/검색 UI. 상태는 부모(목록 페이지)가 소유하고, 이 컴포넌트는 값과 변경 핸들러만 받는다.
export default function FilterBar({
  status,
  sort,
  search,
  onStatusChange,
  onSortChange,
  onSearchChange,
}) {
  return (
    <div className="filter">
      <div className="filter__tabs" role="tablist" aria-label="읽기 상태 필터">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={status === tab.value}
            className={status === tab.value ? "tab tab--active" : "tab"}
            onClick={() => onStatusChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="filter__row">
        <input
          type="search"
          className="field__control"
          placeholder="제목 또는 저자 검색"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="검색"
        />
        <select
          className="field__control filter__sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="정렬"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
