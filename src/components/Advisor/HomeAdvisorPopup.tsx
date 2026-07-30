"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Sparkles, X } from "lucide-react";
import GuidedPropertyAdvisor from "./GuidedPropertyAdvisor";
import useGlobalContext from "@/hooks/useContext";

const POPUP_SEEN_KEY = "propertyla-home-advisor-seen";

export default function HomeAdvisorPopup() {
  const { openOffcanvas } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(POPUP_SEEN_KEY);
    const timer = window.setTimeout(() => {
      if (!seen) {
        setOpen(true);
        window.sessionStorage.setItem(POPUP_SEEN_KEY, "true");
      } else {
        setShowResume(true);
      }
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  const closeForLater = () => {
    setOpen(false);
    setShowResume(true);
  };

  return (
    <>
      {open && (
        <div
          className="home-advisor-popup"
          role="dialog"
          aria-modal="true"
          aria-label="Guided Property Advisor"
        >
          <div
            className="home-advisor-popup__backdrop"
            onClick={closeForLater}
          />
          <div className="home-advisor-popup__panel">
            <button
              type="button"
              className="home-advisor-popup__close"
              onClick={closeForLater}
              aria-label="Close advisor"
            >
              <X size={20} />
            </button>
            <GuidedPropertyAdvisor popupMode onCancel={closeForLater} />
          </div>
        </div>
      )}

      {!open && showResume && !openOffcanvas && (
        <button
          type="button"
          className="home-advisor-popup__resume"
          onClick={() => {
            setOpen(true);
            setShowResume(false);
          }}
        >
          <Sparkles size={18} />
          AI advisor
          <span>
            <MessageCircle size={14} />
          </span>
        </button>
      )}
    </>
  );
}
