"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import "./pagination-controls.css";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function scrollPageToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  const focusTarget =
    document.querySelector<HTMLElement>(".tp-property-heading h4") ||
    document.querySelector<HTMLElement>(".tp-dashboard-main") ||
    document.querySelector<HTMLElement>("main") ||
    document.body;
  if (focusTarget) {
    const previousTabIndex = focusTarget.getAttribute("tabindex");
    if (previousTabIndex == null) focusTarget.setAttribute("tabindex", "-1");
    focusTarget.focus({ preventScroll: true });
    if (previousTabIndex == null) {
      focusTarget.addEventListener(
        "blur",
        () => focusTarget.removeAttribute("tabindex"),
        { once: true },
      );
    }
  }
}

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const goTo = (nextPage: number) => {
    const clamped = Math.min(totalPages, Math.max(1, nextPage));
    if (clamped === page) return;
    onPageChange(clamped);
    scrollPageToTop();
  };

  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav className="app-pagination" aria-label="Pagination">
      <button
        type="button"
        className="app-pagination__btn"
        disabled={isFirst}
        aria-label="Go to previous page"
        onClick={() => goTo(page - 1)}
      >
        <ChevronLeft size={16} strokeWidth={2.25} aria-hidden="true" />
        <span>Prev</span>
      </button>

      <p className="app-pagination__status" aria-live="polite">
        <span className="app-pagination__current">{page}</span>
        <span className="app-pagination__of">of</span>
        <span>{totalPages}</span>
      </p>

      <button
        type="button"
        className="app-pagination__btn"
        disabled={isLast}
        aria-label="Go to next page"
        onClick={() => goTo(page + 1)}
      >
        <span>Next</span>
        <ChevronRight size={16} strokeWidth={2.25} aria-hidden="true" />
      </button>
    </nav>
  );
}
