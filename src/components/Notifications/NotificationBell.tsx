"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "@/config/axios";
import "./notification-bell.scss";

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  propertyId?: string | null;
  actorName?: string | null;
  actorEmail?: string | null;
  actorPhone?: string | null;
  metadata?: {
    propertyUrl?: string | null;
    propertyTitle?: string | null;
  } | null;
};

const formatTime = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("en-MY", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStoredUserType = () => {
  if (typeof window === "undefined") return "";
  return (localStorage.getItem("loginUserType") || "").trim().toLowerCase();
};

const shouldShowBell = () => {
  const userType = getStoredUserType();
  if (!userType) return true;
  return ["agent", "owner", "agency", "ren"].includes(userType);
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const bellRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    if (!token || !shouldShowBell()) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setLoading(true);
    try {
      const res = await apiClient.get("/notifications", {
        params: { limit: 10 },
      });
      setUnreadCount(res.data?.unreadCount ?? 0);
      setNotifications(res.data?.data ?? []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = window.setInterval(fetchNotifications, 30000);
    const sync = () => fetchNotifications();

    window.addEventListener("storage", sync);
    window.addEventListener("propertyla-auth-changed", sync);
    window.addEventListener("propertyla-notifications-changed", sync);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", sync);
      window.removeEventListener("propertyla-auth-changed", sync);
      window.removeEventListener("propertyla-notifications-changed", sync);
    };
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!bellRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const markAllRead = async () => {
    try {
      await apiClient.patch("/notifications/read-all");
      setNotifications((items) =>
        items.map((item) => ({ ...item, isRead: true })),
      );
      setUnreadCount(0);
    } catch {}
  };

  const markRead = async (item: NotificationItem) => {
    if (!item.isRead) {
      try {
        await apiClient.patch(`/notifications/${item.id}/read`);
        setNotifications((items) =>
          items.map((current) =>
            current.id === item.id ? { ...current, isRead: true } : current,
          ),
        );
        setUnreadCount((count) => Math.max(count - 1, 0));
      } catch {}
    }

    const url =
      item.metadata?.propertyUrl ||
      (item.propertyId ? `/property-details/${item.propertyId}` : "");
    if (url) window.location.href = url;
  };

  if (!visible) return null;

  return (
    <div ref={bellRef} className="notification-bell">
      <button
        type="button"
        className="notification-bell__button"
        aria-label="Notifications"
        title="Notifications"
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prev) => !prev);
        }}
      >
        <i className="fa-regular fa-bell" />
        {unreadCount > 0 && (
          <span className="notification-bell__badge">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-bell__panel">
          <div className="notification-bell__head">
            <strong>Notifications</strong>
            {unreadCount > 0 && (
              <button
                type="button"
                className="notification-bell__mark-all"
                onClick={markAllRead}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="notification-bell__list">
            {loading ? (
              <div className="notification-bell__empty">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="notification-bell__empty">No notifications yet.</div>
            ) : (
              notifications.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`notification-bell__item ${
                    item.isRead ? "" : "is-unread"
                  }`}
                  onClick={() => markRead(item)}
                >
                  <span className="notification-bell__message">
                    {item.message || item.title}
                  </span>
                  {(item.actorEmail || item.actorPhone) && (
                    <span className="notification-bell__meta">
                      {[item.actorEmail, item.actorPhone]
                        .filter(Boolean)
                        .join(" | ")}
                    </span>
                  )}
                  <span className="notification-bell__time">
                    {formatTime(item.createdAt)}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
