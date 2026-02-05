import React from "react";

export default React.memo(function Pagination({ pagination, onPageChange }) {
  // const { pages = 0, page = 1 } = pagination || {};
  const pages = parseInt(pagination?.pages) || 0;
  const page = parseInt(pagination?.page) || 1;
  const maxVisible = 3;

  if (pages <= 1) return null;

  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > pages) {
    end = pages;
    start = Math.max(1, end - maxVisible + 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination pagination-rounded">
        {/* Prev */}
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => page > 1 && onPageChange(page - 1)}
          >
            «
          </button>
        </li>

        {/* First + ... */}
        {start > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => onPageChange(1)}>
                1
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          </>
        )}

        {/* Middle Pages */}
        {pageNumbers.map((p) => (
          <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
            {/* {console.log(p, " == ", page)} */}
            <button className="page-link" onClick={() => onPageChange(p)}>
              {p}
            </button>
          </li>
        ))}

        {/* ... + Last */}
        {end < pages && (
          <>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => onPageChange(pages)}>
                {pages}
              </button>
            </li>
          </>
        )}

        {/* Next */}
        <li className={`page-item ${page === pages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => page < pages && onPageChange(page + 1)}
          >
            »
          </button>
        </li>
      </ul>
    </nav>
  );
});
