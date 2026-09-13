"use client";

import { useEffect, useId, useState, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import {
  CircleHelp,
  FileText,
  MapPin,
  Route,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import {
  getDekhoLandScoreColor,
  getDekhoLandScoreTone,
  resolveDekhoLandScoreDetails,
  type DekhoLandScoreBreakdownKey,
} from "@/utils/dekhoLandScore";

type DekhoLandScoreProps = {
  score?: unknown;
  details?: { lastUpdated?: string | null; breakdown?: unknown } | null;
  className?: string;
};

const BREAKDOWN_ICONS: Record<
  DekhoLandScoreBreakdownKey,
  typeof FileText
> = {
  documents: FileText,
  location: MapPin,
  growth: TrendingUp,
  price: Wallet,
  road: Route,
};

function isolateEvent(event: SyntheticEvent) {
  event.preventDefault();
  event.stopPropagation();
}

export default function DekhoLandScore({
  score,
  details,
  className,
}: DekhoLandScoreProps) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const resolved = resolveDekhoLandScoreDetails(score, details);
  const color = getDekhoLandScoreColor(resolved.score);
  const tone = getDekhoLandScoreTone(resolved.score);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      className={`dekholand-score dekholand-score--${tone}${className ? ` ${className}` : ""}`}
    >
      <span className="dekholand-score__label">DekhoLand Score</span>
      <span
        className="dekholand-score__dot"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="dekholand-score__value" style={{ color }}>
        {resolved.score}/100
      </span>
      <button
        type="button"
        className="dekholand-score__info"
        aria-label="How DekhoLand Score is calculated"
        title="How DekhoLand Score is calculated"
        onClick={(event) => {
          isolateEvent(event);
          setOpen(true);
        }}
        onPointerDown={isolateEvent}
        onMouseDown={isolateEvent}
        onTouchStart={isolateEvent}
      >
        <CircleHelp size={14} strokeWidth={2} />
      </button>

      {open
        ? createPortal(
            <div
              className="dekholand-score-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <button
                type="button"
                className="dekholand-score-modal__backdrop"
                aria-label="Close DekhoLand Score details"
                onClick={() => setOpen(false)}
              />
              <div className="dekholand-score-modal__panel">
                <div className="dekholand-score-modal__header">
                  <h3 id={titleId}>DekhoLand Score</h3>
                  <button
                    type="button"
                    className="dekholand-score-modal__close"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                  >
                    <X size={16} strokeWidth={2} />
                  </button>
                </div>
                <p className="dekholand-score-modal__summary">
                  <strong style={{ color }}>{resolved.score}/100</strong>
                  <span> — {resolved.ratingLabel}</span>
                </p>
                <p className="dekholand-score-modal__question">
                  How is this score calculated?
                </p>
                <ul className="dekholand-score-modal__list">
                  {resolved.breakdown.map((item) => {
                    const Icon = BREAKDOWN_ICONS[item.key];
                    return (
                      <li key={item.key}>
                        <span>
                          <Icon size={14} strokeWidth={2} aria-hidden="true" />
                          {item.label}
                        </span>
                        <strong style={{ color: getDekhoLandScoreColor(item.score) }}>
                          {item.score}
                        </strong>
                      </li>
                    );
                  })}
                </ul>
                <p className="dekholand-score-modal__updated">
                  Last updated: {resolved.lastUpdated}
                </p>
                <p className="dekholand-score-modal__disclaimer">
                  This score helps buyers compare properties.
                  It is not a guarantee of legal validity or
                  future price appreciation.
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
